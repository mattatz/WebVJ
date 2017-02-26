
import GPUComputationRenderer from "../lib/GPUComputationRenderer"

const modes = {
    Init: 0,
    Force: 1,
    Line: 2,
    Noise: 3,
    Circle: 4,
    Update: 5,
};

export default class GridSystem {

    constructor(renderer, count) {
        var size = Math.ceil(Math.sqrt(count));
        this._sideCount = size;

        this._count = this._sideCount * this._sideCount;

        this.gpuCompute = new GPUComputationRenderer(size, size, renderer);

        this.heightVar = this.gpuCompute.addVariable("textureHeight", require("../../shaders/compute/grid.frag"), null);
        this.heightVar.material.uniforms.mode = { type: "i", value: 0 };
        this.heightVar.material.uniforms.time = { type: "f", value: 0.0 };
        this.heightVar.material.uniforms.dt = { type: "f", value: 0.0 };
        this.heightVar.material.uniforms.force = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
        this.heightVar.material.uniforms.line = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
        this.heightVar.material.uniforms.lineThickness = { type: "f", value: 0.1 };
        this.heightVar.material.uniforms.noise = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
        this.heightVar.material.uniforms.circle = { type: "f", value: 1.0 };
        this.heightVar.material.uniforms.speedRange = { type: "v2", value: new THREE.Vector2(0.3, 1.0) };

        this.gpuCompute.setVariableDependencies(this.heightVar, [this.heightVar]);

        var error = this.gpuCompute.init();
        this.init();
    }

    init() {
        this.heightVar.material.uniforms.mode.value = modes.Init;
        this.gpuCompute.compute();
    }

    get sideCount() {
        return this._sideCount;
    }

    get count() {
        return this._count;
    }

    get texture() {
        return this.gpuCompute.getCurrentRenderTarget(this.heightVar).texture;
    }

    update(dt, t) {
        this.heightVar.material.uniforms.mode.value = modes.Update;
        this.heightVar.material.uniforms.dt.value = dt;
        this.heightVar.material.uniforms.time.value = t;
        this.gpuCompute.compute();
    }

    force(x, y, r = 0.025, h = 1.0) {
        this.heightVar.material.uniforms.mode.value = modes.Force;

        this.heightVar.material.uniforms.force.value.x = x;
        this.heightVar.material.uniforms.force.value.y = y;
        this.heightVar.material.uniforms.force.value.z = r;
        this.heightVar.material.uniforms.force.value.w = h;

        this.gpuCompute.compute();
    }

    line(x, y, thickness = 0.1, h = 1.0) {
        this.heightVar.material.uniforms.mode.value = modes.Line;

        this.heightVar.material.uniforms.line.value.x = x;
        this.heightVar.material.uniforms.line.value.y = y;

        this.gpuCompute.compute();
    }

    noise(sx, sy, h = 1.0) {
        this.heightVar.material.uniforms.mode.value = modes.Noise;

        this.heightVar.material.uniforms.noise.value.x = sx;
        this.heightVar.material.uniforms.noise.value.y = sy;
        this.heightVar.material.uniforms.noise.value.z = h;

        this.gpuCompute.compute();
    }

    circle(h = 1.0) {
        this.heightVar.material.uniforms.mode.value = modes.Circle;
        this.gpuCompute.compute();
    }

    dispose() {
        this.heightVar.renderTargets[0].dispose();
        this.heightVar.renderTargets[1].dispose();
        this.heightVar.material.dispose();
    }

}


