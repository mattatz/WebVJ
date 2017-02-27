
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

const velocity = "textureVelocity";
const rotation = "textureRotation";
const position = "texturePosition";

const DOMBoxParticleMode = {
    Init: 0,
    Field: 1,
    Sphere: 2,
    Model: 3,
};

class DOMBoxParticleSystem {

    constructor(renderer, count) {
        var size = Math.ceil(Math.sqrt(count));
        this._sideCount = size;
        this._count = this._sideCount * this._sideCount;

        this.gpuCompute = new GPUComputationRenderer(size, size, renderer);

        this.velVar = this.gpuCompute.addVariable(velocity, require("../../shaders/compute/domBox/velocity.frag"), null);
        this.rotVar = this.gpuCompute.addVariable(rotation, require("../../shaders/compute/domBox/rotation.frag"), null);
        this.posVar = this.gpuCompute.addVariable(position, require("../../shaders/compute/domBox/position.frag"), null);

        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

        var error = this.gpuCompute.init();
        this.setup();

        this.velVar.material.uniforms.mode.value = DOMBoxParticleMode.Init;
        this.gpuCompute.compute();

        this.velVar.material.uniforms.mode.value = DOMBoxParticleMode.Field;
    }

    setup() {
        this.posVar.material.uniforms.throttle = { type: "f", value: 0.5 };
        this.posVar.material.uniforms.emitter = { type: "v2", value: new THREE.Vector3(3000, 1000) };
        this.posVar.material.uniforms.step = { type: "f", value: 0.0 };

        this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type:"f", value: 0.15 };
        this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type:"f", value: 0.0 };
        this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type:"i", value: DOMBoxParticleMode.Init };

        this.velVar.material.uniforms.noiseScale = { type: "v3", value: new THREE.Vector3(0.1, 0.1, 0.1) };
        this.velVar.material.uniforms.noiseSpeed = { type:"f", value: 0.5 };
        this.velVar.material.uniforms.noiseIntensity = { type:"v3", value: new THREE.Vector3(220.8, 220.8, 250.8) };
        this.velVar.material.uniforms.sphere = this.posVar.material.uniforms.sphere = { type:"v4", value: new THREE.Vector4(750, 500.0, 22.5, 150.0) };
        this.velVar.material.uniforms.textureModel = this.posVar.material.uniforms.textureModel = { type:"t", value: null };

        // v2: (size, height)
        this.velVar.material.uniforms.model = this.posVar.material.uniforms.model = { type:"v2", value: new THREE.Vector2(1200, 800) };
        this.velVar.material.uniforms.decay = { type:"f", value: 0.98 };
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

    get mode() {
        return this.velVar.material.uniforms.mode.value;
    }

    set mode(mode) {
        this.velVar.material.uniforms.mode.value = mode;
    }

    get model() {
        return this.velVar.material.uniforms.textureModel.value;
    }

    set model(texture) {
        this.velVar.material.uniforms.textureModel.value = texture;
    }

    get size() {
        return this.velVar.material.uniforms.model.value.x;
    }

    set size(v) {
        this.velVar.material.uniforms.model.value.x = v;
    }

    set height(v) {
        this.velVar.material.uniforms.model.value.y = v;
    }

    get sphere() {
        return this.velVar.material.uniforms.sphere.value;
    }

    set sphere(v) {
        this.velVar.material.uniforms.sphere.value = v;
    }

    get speed() {
        return this.velVar.material.uniforms.speed.value;
    }

    set speed(v) {
        return this.velVar.material.uniforms.speed.value = v;
    }

    step() {
        this.posVar.material.uniforms.step.value += 1.0;
    }

    update(dt, t) {
        this.velVar.material.uniforms.dt.value = dt;
        this.velVar.material.uniforms.time.value = t;

        this.gpuCompute.compute();
    }

}

export { DOMBoxParticleMode, DOMBoxParticleSystem }

