
import FboPingPong from "../lib/FboPingPong"

const velocity = "textureVelocity";
const pressure = "texturePressure";
const divergence = "textureDivergence";

export default class FluidSimulation {

    constructor(renderer, size = 128) {
        this.sync = false;

        this.renderer = renderer;

        this.size = size;
        this.iterations = 6;

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
        this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
        this.scene.add(this.mesh);

        var options = {
            type: THREE.FloatType,
            // wrapS: THREE.ClampToEdgeWrapping,
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
        };

        this.fboVelocityPP = new FboPingPong(this.size, this.size, options);
        this.fboPressurePP = new FboPingPong(this.size, this.size, options);
        this.fboDivergence = this.fboVelocityPP.createBuffer(this.size, this.size, options);

        var px = { type : "v2", value : new THREE.Vector2(1 / this.size, 1 / this.size) };

        var kernel = require("../../shaders/compute/fluid/kernel.vert");

        this.advect = new THREE.RawShaderMaterial({
            uniforms: {
                textureVelocity : { type: "t", value: this.fboVelocityPP.getReadBuffer().texture },
                px       : px,
                point    : { type : "v2", value : new THREE.Vector2(0.5, 0.5) },
                force    : { type : "f", value : 0.0 },
                radius   : { type : "f",  value  : 0.025 },
                decay   : { type : "f",  value  : 0.92 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/compute/fluid/advect.frag")
        });

        this.divergence = new THREE.RawShaderMaterial({
            uniforms: {
                textureVelocity : { type: "t", value: this.fboVelocityPP.getWriteBuffer().texture },
                px: px
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/compute/fluid/divergence.frag")
        });

        this.jacobi = new THREE.RawShaderMaterial({
            uniforms : {
                texturePressure: { type: "t", value: this.fboPressurePP.getReadBuffer().texture },
                textureDivergence: { type: "t", value: this.fboDivergence.texture },
                px: px,
                alpha: { type : "f", value : -1.0 },
                beta: { type : "f", value : 0.25 }
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/compute/fluid/jacobi.frag")
        });

        this.spg = new THREE.RawShaderMaterial({
            uniforms : {
                texturePressure: { type : "t", value : this.fboPressurePP.getReadBuffer().texture },
                textureVelocity: { type : "t", value : this.fboVelocityPP.getWriteBuffer().texture },
                px: px
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/compute/fluid/subtractPressureGradient.frag")
        });
    }

    update(dt, time) {
        // advection
        this.compute(this.advect, this.fboVelocityPP.getWriteBuffer());

        // divergence
        this.compute(this.divergence, this.fboDivergence);

        // jacobi
        for(var i = 0; i < this.iterations; i++) {
            this.compute(this.jacobi, this.fboPressurePP.getWriteBuffer());
            this.fboPressurePP.swap();
            this.jacobi.uniforms.texturePressure.value = this.fboPressurePP.getReadBuffer().texture;
        }

        // 一瞬だけ力を加えて徐々にforceの値を0に近づけると良い波が得られる
        var cur = this.advect.uniforms.force.value;
        this.advect.uniforms.force.value = Math.max(cur * 0.85, 0.0);

        // subtract pressure gradient 
        this.compute(this.spg, this.fboVelocityPP.getReadBuffer());
    }

    bang(x, y, r, f) {
        this.advect.uniforms.point.value.x = x;
        this.advect.uniforms.point.value.y = y;
        this.advect.uniforms.radius.value = r;
        this.advect.uniforms.force.value = f;
    }

    compute(material, buffer) {
        this.mesh.material = material;
        this.renderer.render(this.scene, this.camera, buffer, false);
    }

    dispose() {
        this.mesh.geometry.dispose();
        this.advect.dispose();
        this.divergence.dispose();
        this.jacobi.dispose();
        this.spg.dispose();

        this.fboVelocityPP.dispose();
        this.fboPressurePP.dispose();
        this.fboDivergence.dispose();
    }

    get velocity() {
        return this.fboVelocityPP.getReadBuffer().texture;
    }

    get pressure() {
        return this.fboPressurePP.getReadBuffer().texture;
    }

    osc(data) {
        switch(data[0]) {
            case "bang":
                var x = Math.random();
                var y = Math.random();
                this.bang(x, y, 0.15, Math.random() * 300 + 300);
                break;

            case "sync":
                this.sync = (data[1] == 1);
                break;
        }

    }
   
}

