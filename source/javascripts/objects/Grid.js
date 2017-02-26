
import GridSystem from "../effects/GridSystem"
import GridMesh from "../meshes/GridMesh"

class Wave {

    constructor(times, x, y, vx, vy, r = 0.01, h = 0.8) {
        this.times = times;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.height = h;
        this.decay = 0.9;
    }

    update(dt, t) {
        this.times--;
        this.x += this.vx;
        this.y += this.vy;
        this.height = this.height * this.decay;
    }

}

export default class Grid extends THREE.Object3D {

    constructor(renderer, count = 256, size = 32) {
        super();

        this.system = new GridSystem(renderer, count * count);
        this.mesh = new GridMesh(count, size);
        this.mesh.material.uniforms.textureHeight.value = this.system.texture;
        this.add(this.mesh);

        this.waves = [];
        this.sync = false;
        this.speed = 1.0;
    }

    update(dt, t) {
        this.system.update(dt * this.speed, t);

        var n = this.waves.length;
        for(var i = n - 1; i >= 0; i--) {
            var wave = this.waves[i];
            wave.update(dt, t);
            this.line(wave.x, wave.y, wave.r, wave.height);
            if(wave.times < 0) {
                this.waves.splice(i, 1);
            }
        }
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

    wave(times, x, y, vx, vy, r = 0.01) {
        this.waves.push(new Wave(times, x, y, vx, vy, r));
    }

    line(x, y, thickness, h) {
        this.system.line(x, y, thickness, h);
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

