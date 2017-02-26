
export default class TransitionPass extends THREE.ShaderPass {

    constructor(renderer) {
        super({
            uniforms: {
                tDiffuse: { type:"t", value: null },
                tPrev: { type:"t", value: null },
                t: { type:"f", value: 0.0 },
            },
			vertexShader: require("../../shaders/posteffects/kernel.vert"),
			fragmentShader: require("../../shaders/posteffects/transition.frag"),
        });

        this.throughMaterial = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { type:"t", value: null }
            },
			vertexShader: require("../../shaders/posteffects/kernel.vert"),
			fragmentShader: require("../../shaders/posteffects/through.frag"),
        });

		var size = renderer.getSize();
		this.prevBuffer = new THREE.WebGLRenderTarget(size.width, size.height, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
        });
        this.uniforms.tPrev.value = this.prevBuffer.texture;

        this.snap = false;
    }

    snapshot() {
        this.uniforms.t.value = 1.0;
        this.snap = true;
    }

    transit(duration = 800) {
        var uniforms = this.uniforms;
        new TWEEN.Tween({
            t: 1.0
        })
        .to({
            t: 0.0
        }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            uniforms.t.value = this.t;
        })
        .onComplete(() => {
            uniforms.t.value = 0.0;
        })
        .start();
    }

    render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        super.render(renderer, writeBuffer, readBuffer, delta, maskActive);

        if(this.snap) {
            this.throughMaterial.uniforms.tDiffuse.value = readBuffer.texture;
            this.quad.material = this.throughMaterial;
            renderer.render(this.scene, this.camera, this.prevBuffer);

            this.snap = false;
        }
    }

    setSize(width, height) {
        this.prevBuffer.setSize(width, height);
    }

    dispose() {
        this.material.dispose();
        this.throughMaterial.dispose();
        this.prevBuffer.dispose();
    }

}
