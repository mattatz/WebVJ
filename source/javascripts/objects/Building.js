
import Rect from "./Rect";
import BuildingMesh from "../meshes/BuildingMesh";

const one = new THREE.Vector3(1, 1, 1);
const zero = new THREE.Vector3(0, 0, 0);

export default class Building extends THREE.Object3D {

    constructor(alpha = 1.0, texture, node, width, height, downstair = null) {
        super();

        this.texture = texture;
        this.node = node;
        this.width = width;
        this.height = height;
        this.downstair = downstair;
        this.upstair = null;
        this.rect = new Rect(0, 0, node.width, node.height);

        this.tween = null;
        this._alpha = alpha;

        this.velocity = new THREE.Vector3();
        this.decay = Math.random() * 0.02 + 0.995;

        // 親オブジェクトよりも寿命を短く
        if(this.downstair) {
            this.startLifetime = this.lifetime = this.downstair.lifetime * 0.9;
            this.mass = this.downstair.mass * 1.05;
        } else {
            this.startLifetime = this.lifetime = 7.5 + Math.random() * 2.5;
            this.mass = Math.random() * 0.5 + 0.5;
        }

        this.uplifted = false;
        this.vanishing = false;
        this.mature = false;

        this.axis = (new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        )).normalize();
    }

    get top() {
        if(this.upstair !== null) {
            return this.upstair.top;
        }
        return this;
    }

    get bottom() {
        if(this.downstair !== null) {
            return this.downstair.bottom;
        }
        return this;
    }

    uplift(h = -100, duration = 800, easing = TWEEN.Easing.Quadratic.Out) {

        var mesh = this.mesh;
        if(!mesh) {
            mesh = this.build(this.node);
            this.mesh = mesh;
        }

        return new Promise(
            (resolve, reject) => {
                this.tween = new TWEEN.Tween({ h: 0 })
                    .easing(easing)
                    .to({ h: h }, duration)
                    .onUpdate(function() {
                        var h = this.h;
                        mesh.uplift(h);
                    })
                    .onComplete(() => {
                        this.uplifted = true;
                        mesh.uplift(h);
                        resolve(this.node);
                    })
                    .start();
            }
        );
    }

    upliftNext(h = -30, duration = 500) {
        if(this.upstair) {
            return this.upstair.upliftNext(h, duration);
        }

        return new Promise(
            (resolve, reject) => {
                if(this.mesh && !this.vanishing) {
                    var children = this.node.getNodesAt(this.node.depth + 1, true);
                    var node = this.next(children);
                    if(node) {
                        this.upstair = this.spawn(node);
                        this.add(this.upstair);
                        return this.upstair.uplift(h, duration).then(resolve);
                    } else {
                        return reject(this);
                    }
                }
                return resolve();
            }
        );
    }

    upliftSeq(h = -10, duration = 500, easing = TWEEN.Easing.Quadratic.Out) {
        TWEEN.remove(this.tween);

        if(this.upstair) {
            return this.upstair.upliftSeq(h, duration, easing);
        }
        
        return new Promise(
            (resolve, reject) => {
                var children = this.node.getNodesAt(this.node.depth + 1, true);
                var node = this.next(children);
                if(node) {
                    this.upstair = this.spawn(node);
                    this.add(this.upstair);
                    this.upstair.uplift(h, duration, easing).then(() => {
                        this.upstair.upliftSeq(h, duration, easing).then(resolve);
                    });
                } else {
                    resolve(this);
                }
            }
        );

    }

    downlift(duration) {
        TWEEN.remove(this.tween);

        return new Promise(
            (resolve, reject) => {
                var mesh = this.mesh;
                if(!mesh) {
                    return resolve(this);
                }

                var h = mesh.height;
                this.tween = new TWEEN.Tween({ h: h })
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .to({ h: 0 }, duration)
                    .onUpdate(function() {
                        var h = this.h;
                        mesh.uplift(h);
                    })
                    .onComplete(() => {
                        mesh.uplift(0);

                        if(this.downstair) {
                            this.downstair.downlift(duration).then(resolve);
                            this.downstair.remove(this);
                        } else {
                            resolve(this);
                        }
                    })
                    .start();
            }
        );
    }

    downliftAll(duration = 500, easing = TWEEN.Easing.Quadratic.Out) {
        TWEEN.remove(this.tween);

        var self = this;
        var depth = self.position.z;
        var mesh = self.mesh;

        if(!mesh) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this);
                }, duration);
            });
        }

        var h = mesh.height;
        return new Promise((resolve, reject) => {
            var hasUpstair = this.upstair !== null;
            if(hasUpstair) {
                this.upstair.downliftAll(duration, easing).then(resolve);
            }

            this.tween = new TWEEN.Tween({ depth: depth, h: h })
                .easing(easing)
                .to({ depth: 0, h: 0}, duration)
                .onUpdate(function() {
                    var h = this.h;
                    mesh.uplift(h);
                    self.position.z = this.depth;
                })
                .onComplete(() => {
                    if(!hasUpstair) { // top
                        resolve(this);
                    }
                })
                .start();
        });
    }

    dispose() {
        if(this.upstair) {
            this.upstair.dispose();
        }
        TWEEN.remove(this.tween);
        this.remove(this.upstair);

        if(this.mesh) {
            this.mesh.material.dispose();
            this.mesh.geometry.dispose();
            this.remove(this.mesh);
        }
    }

    next(nodes) {

        var l = this.node.x;
        var r = l + this.node.width;
        var t = this.node.y;
        var b = t + this.node.height;

        var candidates = nodes.filter((node) => {
            var children = node.getNodesAt(node.depth + 1, true);
            return children.length > 0;
        }).filter((node) => {
            // 親nodeからはみ出ていないか
            return (
                l <= node.x && node.x + node.width <= r &&
                t <= node.y && node.y + node.height <= b
            );
        });

        if(candidates.length > 0) {
            return candidates[Math.floor(Math.random() * candidates.length)];
        }

        return null;
    }

    build(node) {
        var mesh = new BuildingMesh(node, this._alpha);
        mesh.material.uniforms.capture.value = this.texture;
        mesh.position.set(0, 0, 0);
        mesh.scale.set(node.width, node.height, 1);
        this.add(mesh);

        return mesh;
    }

    spawn(node) {
        var child = new Building(this.alpha, this.texture, node, this.width, this.height, this);

        var centerX = this.node.x + this.node.width * 0.5;
        var centerY = this.node.y + this.node.height * 0.5;

        var centerX2 = node.x + node.width * 0.5;
        var centerY2 = node.y + node.height * 0.5;

        var dx = centerX2 - centerX;
        var dy = centerY2 - centerY;

        child.position.x += dx;
        child.position.y += dy;
        child.position.z = this.mesh.height;

        return child;
    }

    noise(dt, t) {
        this.vanishing = true;
        TWEEN.remove(this.tween);

        var p = this.position;
        var px = p.x * 0.5 + t;
        var py = p.y * 0.5 + t;
        var pz = p.z * 0.2 + t;

        var vx = noise.simplex3(px, py, pz);
        var vy = noise.simplex3(py, pz, px);
        var vz = noise.simplex3(pz, px, py);

        this.velocity.x += vx * this.mass * 10;
        this.velocity.y += vy * this.mass * 10;
        this.velocity.z += Math.abs(vz * this.mass * 50);
        this.velocity.clampLength(0, 100);

        if(this.upstair) {
            this.upstair.noise(dt, t);
            this.upstair.world();
        }
    }

    world() {
        this.downstair.updateMatrixWorld();

        var m = this.matrixWorld;
        var p = this.getWorldPosition();
        var rot = this.getWorldRotation();

        this.downstair.remove(this);

        // this.bottom.parent is TownStage.container
        // TownStage.container only translation without rotation and scale
        this.bottom.parent.add(this);
        p = this.bottom.parent.worldToLocal(p);

        this.position.set(p.x, p.y, p.z);
        this.rotation.set(rot.x, rot.y, rot.z);
    }

    update(dt, t) {
        if(!this.vanishing) return;

        this.velocity.multiplyScalar(this.decay);

        var vel = this.velocity.clone();
        vel.multiplyScalar(dt);
        this.position.add(vel);

        var rot = new THREE.Quaternion();
        rot.setFromAxisAngle(this.axis, vel.length() * 0.002);
        this.quaternion.multiply(rot);

        if(this.mesh) {
            this.mesh.offset(dt * 10.0);
        }

        this.lifetime -= dt * this.mass;

        // 0.001 is for matrix calculation error
        var alpha = Math.max(0.001, this.lifetime / this.startLifetime);
        this.scale.lerpVectors(zero, one, alpha);

        if(this.upstair) {
            this.upstair.update(dt, t);
        }
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(alpha) {
        this._alpha = this.mesh.alpha = alpha;
        if(this.upstair) {
            this.upstair.alpha = alpha;
        }
    }

    moveToRect() {
        this.position.x = this.rect.x + this.rect.w * 0.5;
        this.position.y = this.rect.y + this.rect.h * 0.5;
    }

    // 中心ほど高くなるように高さを計算する
    calculateCircleHeight(min, max, distance = 1400, random = 200) {
        var x = this.position.x;
        var y = this.position.y;
        var ratio = 1.0 - (Math.min(Math.sqrt(x * x + y * y), distance) / distance);
        return (max - min) * ratio + min + Math.random() * random;
    }

}
