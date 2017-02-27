
import { DOMBoxParticleMode, DOMBoxParticleSystem } from "../effects/DOMBoxParticleSystem";
import DOMBoxParticleMesh from "../meshes/DOMBoxParticleMesh";

export default class DOMBoxParticle extends THREE.Object3D {

    // constructor(renderer, pages, count = 16384) {
    constructor(renderer, pages, count = 4096) { // 64 * 64
        super();

        this.system = new DOMBoxParticleSystem(renderer, count);

        const size = 128;

        var nodes = [];

        for(var i = 0, n = pages.length; i < n; i++) {
            var page = pages[i];
            page.root.traverse((node) => {
                if(node.hasTranform && !node.text && node.width < size && node.height < size) {
                    nodes.push({
                        node: node,
                        page: i
                    });
                }
            });
        }

        this.mesh = new DOMBoxParticleMesh(pages, nodes, this.system.sideCount);
        this.mesh.frustumCulled = false;
        this.mesh.material.uniforms.texturePosition.value = this.system.position;
        this.mesh.material.uniforms.textureVelocity.value = this.system.velocity;
        this.mesh.material.uniforms.textureRotation.value = this.system.rotation;

        this.add(this.mesh);
        this.models = [];
        this.loadModels([
            "../dist/textures/Head.png",
            "../dist/textures/Stickman.png",
            "../dist/textures/Hand.png",
            "../dist/textures/Heart.png",
            "../dist/textures/Chimp.png",
        ]);
    }

    loadModels(pathes) {
        Promise.all(pathes.map((path) => {
            return this.load(path);
        })).then((models) => {
            this.models = models;
            this.model = 0;
        });
    }

    load(path) {
        return new Promise((resolve, reject) => {
            var loader = new THREE.TextureLoader();
            loader.load(path, (texture) => {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                resolve(texture);
            });
        });
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

    get mode() {
        return this.system.mode;
    }

    set mode(mode) {
        this.system.mode = mode;
    }

    get model() {
        if(!this.models) return 0;
        return this.models.indexOf(this.system.model);
    }

    set model(index) {
        this.system.model = this.models[index];
    }

    randomize() {
        this.mode = DOMBoxParticleMode.Model;
        this.model = this.another(this.models.map(function(tex, i) { return i; }), this.model);
    }

    another(candidates, v) {
        candidates.splice(candidates.indexOf(v), 1);
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    osc(page, data) {
        switch(data[0]) {
            case "mode":
                this.mode = parseInt(data[1]);
                break;

            case "throttle":
                this.throttle = Number(data[1]);
                break;

            case "sphere":
                if(data[1] == "height") {
                } else if(data[1] == "size") {
                } else if(data[1] == "noise") {
                    this.system.velVar.material.uniforms.sphere.value.z = data[2];
                } else if(data[1] == "intensity") {
                    this.system.velVar.material.uniforms.sphere.value.w = data[2];
                }
                break;

            case "scale":
                this.tweenScale(data[1]);
                break;

            case "speed":
                this.system.speed = data[1];
                break;

            case "model":
                if(data[1] == "type") {
                    var index = parseInt(data[2]);
                    if(index < 0) {
                        this.randomize();
                    } else {
                        this.model = index % this.models.length;
                    }
                } else if(data[1] == "size") {
                    this.system.size = data[2];
                } else if(data[1] == "height") {
                    this.system.height = data[2];
                } else if(data[1] == "step") {
                    this.system.step();
                }
                break;

        }
    }

    tweenScale(to) {
        var mesh = this.mesh;
        var from = mesh.material.uniforms.scale.value;
        TWEEN.remove(this.tw);
        this.tw = new TWEEN.Tween({
            v: from
        })
        .to({
            v: to
        }, 500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            mesh.material.uniforms.scale.value = this.v;
        })
        .onComplete(function() {
            mesh.material.uniforms.scale.value = to;
        })
        .start();
    }

}
