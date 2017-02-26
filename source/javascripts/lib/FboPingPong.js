
export default class FboPingPong {

    constructor(width, height, options) {
        this.readBufferIndex = 0;
        this.writeBufferIndex = 1;
        this.buffers = [
            this.createBuffer(width, height, options),
            this.createBuffer(width, height, options)
        ];
    }

    getReadBuffer () {
        return this.buffers[this.readBufferIndex];
    }

    getWriteBuffer () {
        return this.buffers[this.writeBufferIndex];
    }

    swap () {
        var tmp = this.buffers[this.writeBufferIndex];
        this.buffers[this.writeBufferIndex] = this.buffers[this.readBufferIndex];
        this.buffers[this.readBufferIndex] = tmp;
    }

    createBuffer (width, height, options) {
        options = options || {};

        return new THREE.WebGLRenderTarget(width, height, {
            wrapS: options.wrapS || THREE.ClampToEdgeWrapping,
            wrapT: options.wrapT || THREE.ClampToEdgeWrapping,
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat,
            type: options.type || THREE.FloatType,
            anisotropy : false,
            generateMipmaps : false,
            depthBuffer: false,
            stencilBuffer: false
        });
    }

    dispose() {
        this.buffers[this.readBufferIndex].dispose();
        this.buffers[this.writeBufferIndex].dispose();
    }

}


