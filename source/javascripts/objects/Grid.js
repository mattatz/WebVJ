
import GridSystem from "../effects/GridSystem"
import GridMesh from "../meshes/GridMesh"

export default class Grid extends THREE.Object3D {

    constructor(renderer, count = 256, size = 32) {
        super();

        this.system = new GridSystem(renderer, count * count);
        this.mesh = new GridMesh(count, size);
        this.mesh.material.uniforms.textureHeight.value = this.system.texture;
        this.add(this.mesh);

        this.sync = true;
        this.speed = 1.0;
    }

    update(dt, t) {
        this.system.update(dt * this.speed, t);
    }

    osc(page, data) {
        switch(data[0]) {
            case "speed":
                this.speed = Number(data[1]);
                break;

            case "height":
                this.height = Number(data[1]);
                break;

            case "sync":
                this.sync = (data[1] == 1);
                break;

            case "noise":
                this.page = page;
                this.noise(1.5, 1.5, 1.0);
                break;

            case "circle":
                this.page = page;
                this.circle(1.0);
                break;

            case "wave":
                break;
        }
    }

    set page(page) {
        this.mesh.material.uniforms.capture.value = page.texture;
        this.mesh.material.uniforms.uvScale.value = page.size.height / page.size.width;
    }

    force(x, y, r = 0.025, h = 1.0) {
        this.system.force(x, y, r, h);
    }

    circle(h = 1.0) {
        this.system.circle(h);
    }

    noise(sx = 1.5, sy = 1.5, h = 1.0) {
        this.system.noise(sx, sy, h);
    }

    set height(h) {
        this.mesh.height = h;
    }

}

