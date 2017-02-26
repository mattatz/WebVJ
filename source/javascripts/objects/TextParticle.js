
import TextParticleSystem from "../effects/TextParticleSystem";
import TextParticleMesh from "../meshes/TextParticleMesh";

export default class TextParticle extends THREE.Object3D {

    constructor(renderer, page, count = 16384) {
        super();

        this.system = new TextParticleSystem(renderer, page, count);

        var nodes = page.root.getTextNodes();
        this.mesh = new TextParticleMesh(nodes, this.system.sideCount);
        this.mesh.frustumCulled = false;
        this.mesh.material.uniforms.capture.value = page.texture;
        this.mesh.material.uniforms.texturePosition.value = this.system.position;
        this.mesh.material.uniforms.textureVelocity.value = this.system.velocity;
        this.mesh.material.uniforms.textureRotation.value = this.system.rotation;
        this.add(this.mesh);

        this.init(page);
    }

    init(page) {
        this.system.init(page);

        var nodes = page.root.getTextNodes();
        this.mesh.init(nodes);
        this.mesh.material.uniforms.capture.value = page.texture;
    }

    update(dt, t) {
        this.system.update(dt, t);
    }

    get throttle() {
        return this.system.throttle;
    }

    // t: 0.0 ~ 1.0
    set throttle(t) {
        this.system.throttle = t;
    }

}


