
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

const velocity = "textureVelocity";
const rotation = "textureRotation";
const position = "texturePosition";

export default class TextParticleSystem {

    constructor(renderer, page, count) {
        var size = Math.ceil(Math.sqrt(count));
        this._sideCount = size;
        this._count = this._sideCount * this._sideCount;

        this.gpuCompute = new GPUComputationRenderer(size, size, renderer);

        this.velVar = this.gpuCompute.addVariable(velocity, require("../../shaders/compute/text/velocity.frag"), null);
        this.rotVar = this.gpuCompute.addVariable(rotation, require("../../shaders/compute/text/rotation.frag"), null);
        this.posVar = this.gpuCompute.addVariable(position, require("../../shaders/compute/text/position.frag"), null);

        // Add variable dependencies
        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

        var error = this.gpuCompute.init();
        this.setup(page);
        this.init(page);

        this.velVar.material.uniforms.mode.value = 0;
        this.gpuCompute.compute();
    }

    setup(page) {
        this.posVar.material.uniforms.throttle = { type: "f", value: 0.0 };
        this.posVar.material.uniforms.boundsMin = { type: "v3", value: new THREE.Vector3(0, 0, -10) };
        this.posVar.material.uniforms.boundsMax = { type: "v3", value: new THREE.Vector3(page.size.width, page.size.height, 10) };

        this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type:"f", value: 0.15 };
        this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type:"i", value: 0 };

        this.velVar.material.uniforms.noiseScale = { type: "v3", value: new THREE.Vector3(0.01, 0.01, 0.01) };
        this.velVar.material.uniforms.noiseSpeed = { type:"f", value: 0.5 };
        this.velVar.material.uniforms.noiseIntensity = { type:"v3", value: new THREE.Vector3(20.8, 150.2, 0.1) };
        this.velVar.material.uniforms.decay = { type:"f", value: 0.95 };
    }

    init(page) {
        this.posVar.material.uniforms.boundsMin.value.set(0, 0, -10);
        this.posVar.material.uniforms.boundsMax.value.set(page.size.width, page.size.height, 10);
    }

    get sideCount() {
        return this._sideCount;
    }

    get count() {
        return this._count;
    }

    get position() {
        return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
    }

    get velocity() {
        return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
    }

    get rotation() {
        return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
    }

    get throttle() {
        return this.posVar.material.uniforms.throttle.value;
    }

    set throttle(t) {
        this.posVar.material.uniforms.throttle.value = t;
    }

    update(dt, t) {
        this.velVar.material.uniforms.mode.value = 1;
        this.velVar.material.uniforms.dt.value = dt;
        this.velVar.material.uniforms.time.value = t;

        this.gpuCompute.compute();
    }

}

