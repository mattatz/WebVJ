
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

export default class LifetimeSystem {

    constructor(renderer, count) {
        var size = Math.ceil(Math.sqrt(count));
        this._sideCount = size;

        this._count = this._sideCount * this._sideCount;

        this.gpuCompute = new GPUComputationRenderer(size, size, renderer);

        this.speed = 2.0;

        this.lifetimeVar = this.gpuCompute.addVariable("textureLifetime", require("../../shaders/compute/lifetime.frag"), null);
        this.lifetimeVar.material.uniforms.mode = { type: "i", value: 0 };
        this.lifetimeVar.material.uniforms.time = { type: "f", value: 0.0 };
        this.lifetimeVar.material.uniforms.dt = { type: "f", value: 0.0 };
        this.lifetimeVar.material.uniforms.recovery = { type: "i", value: 1 };
        this.lifetimeVar.material.uniforms.speedRange = { type: "v2", value: new THREE.Vector2(0.2, 1.5) };

        this.gpuCompute.setVariableDependencies(this.lifetimeVar, [this.lifetimeVar]);

        var error = this.gpuCompute.init();
        this.init();
    }

    init() {
        this.lifetimeVar.material.uniforms.mode.value = 0;
        this.gpuCompute.compute();
    }

    get sideCount() {
        return this._sideCount;
    }

    get count() {
        return this._count;
    }

    get texture() {
        return this.gpuCompute.getCurrentRenderTarget(this.lifetimeVar).texture;
    }

    update(dt, t) {
        this.lifetimeVar.material.uniforms.mode.value = 1;
        this.lifetimeVar.material.uniforms.dt.value = dt * this.speed;
        this.lifetimeVar.material.uniforms.time.value = t;
        this.gpuCompute.compute();
    }

    recover(flag) {
        this.lifetimeVar.material.uniforms.recovery.value = flag ? 1 : 0;
    }

    dispose() {
        this.lifetimeVar.renderTargets[0].dispose();
        this.lifetimeVar.renderTargets[1].dispose();
        this.lifetimeVar.material.dispose();
    }

}

