
export default class CombinePass extends THREE.Pass {

    constructor(renderer, scene, camera) {
        super();

        this.scene = scene;
        this.speed = 1;

        this.cCamera = camera;
        this.bCamera = new THREE.OrthographicCamera();
        this.bCamera.copy(this.cCamera);

        this.height = this.cCamera.bottom - this.cCamera.top;
        this.bCamera.top += this.height;
        this.bCamera.bottom += this.height;
        this.bCamera.updateProjectionMatrix();

        this.clear = true;
        this.clearDepth = false;
        this.needsSwap = false;

        this.material = new THREE.ShaderMaterial( {
            uniforms: {
                tCenter: { type: "t", value: null },
                tBottom: { type: "t", value: null },
                zoom: { type: "v3", value: new THREE.Vector3(1.0, 0.0, 0.0) },
                offset: { type: "f", value: 0.0 },
            },
            vertexShader: require("../../shaders/posteffects/combine.vert"),
            fragmentShader: require("../../shaders/posteffects/combine.frag"),
        } );

        this.combineCamera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);
        this.combineScene = new THREE.Scene();

        this.combineQuad = new THREE.Mesh(new THREE.PlaneBufferGeometry( 2, 2 ), null);
        this.combineQuad.frustumCulled = false; // Avoid getting clipped
        this.combineScene.add(this.combineQuad);

		var parameters = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		};

		var size = renderer.getSize();
		this.cBuffer = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
		this.cBuffer.texture.name = "center";

		this.bBuffer = this.cBuffer.clone();
	    this.bBuffer.texture.name = "bottom";
    }

    scroll(dt, size) {
        var dy = dt * this.speed;
        this.update(this.cCamera, dy, size);
        this.update(this.bCamera, dy, size);
        this.material.uniforms.offset.value = 0.0;

        if(this.cCamera.bottom >= size) {
            var diff = (this.cCamera.bottom - size);
            this.move(this.bCamera, diff);

            var offset = diff / this.height;
            this.material.uniforms.offset.value = offset;
        } else if(this.cCamera.top <= 0) {
            this.cCamera.top = this.bCamera.top;
            this.cCamera.bottom = this.bCamera.bottom;
            this.bCamera.top = this.bCamera.top + this.height;
            this.bCamera.bottom = this.bCamera.bottom + this.height;
        }

        this.cCamera.updateProjectionMatrix();
        this.bCamera.updateProjectionMatrix();
    }

    move(camera, y) {
        camera.top = y - this.height;
        camera.bottom = y;
    }

    update(camera, dy, size) {
        camera.top += dy;
        camera.bottom += dy;
        if(camera.top >= size) {
            var h = camera.top - size;
            camera.top = h - this.height;
            camera.bottom = h;
        }
    }

	render(renderer, writeBuffer, readBuffer, delta, maskActive) {
        renderer.clearDepth();
		renderer.render(this.scene, this.cCamera, this.cBuffer, this.clear);

        this.material.uniforms.tCenter.value = this.cBuffer.texture;

        if(this.cCamera.bottom > this.bCamera.bottom) {
            renderer.clearDepth();
            renderer.render(this.scene, this.bCamera, this.bBuffer, this.clear);
            this.material.uniforms.tBottom.value = this.bBuffer.texture;
        }

		this.combineQuad.material = this.material;
        renderer.render(this.combineScene, this.combineCamera, readBuffer, this.clear);
	}

    setSize(width, height) {
        if(this.cBuffer) {
		    this.cBuffer.setSize(width, height);
		    this.bBuffer.setSize(width, height);
        }
    }

    resize(camera) {
    }

    dispose() {
        this.material.dispose();
        this.cBuffer.dispose();
        this.bBuffer.dispose();
    }

}
