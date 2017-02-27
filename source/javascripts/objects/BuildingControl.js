
import Building from "../objects/Building"
import MathUtil from "../utils/MathUtil"

export default class BuildingControl extends THREE.Object3D {

    constructor() {
        super();
        this.buildings = [];
        this.alpha = 1.0;
        this.sync = true;
        this.duration = 1000;
    }

    update(dt, t) {
        if(this.buildings) {
            this.buildings.forEach((building) => {
                if(building.vanishing) {
                    building.noise(dt, t);
                }
            });
            var len = this.buildings.length;
            for(var i = len - 1; i >= 0; i--) {
                var building = this.buildings[i];
                building.update(dt, t);
                if(building.lifetime <= 0) {
                    building.dispose();
                    this.remove(building);
                    this.buildings.splice(i, 1);
                }
            }
        }
    }

    osc(page, data) {

        switch(data[0]) {
            case "append":
                if(!parseInt(data[1])) {
                    this.append(page, 1);
                } else {
                    this.append(page, parseInt(data[1]));
                }
                break;

            case "grow":
                this.grow();
                break;

            case "destroy":
                this.destroy();
                break;

            case "explode":
                this.explode();
                break;

            case "surface":
                this.surface((data[1] == 1));
                break;

            case "duration":
                if(data[1]) {
                    this.duration = parseInt(data[1]);
                }
                break;

        }

    }

    append(page, count = 1) {
        for(var i = 0; i < count; i++) {
            var len = page.hierarchy.length;
            var index = Math.floor(Math.random() * len * 0.4 + len * 0.1);
            var nodes = page.hierarchy[index].filter((node) => { 
                return node.hasTranform && Math.max(node.width, node.height) < 1024; 
            });
            if(nodes.length <= 0) return;

            var node = nodes[Math.floor(Math.random() * nodes.length)];
            var building = this.create(page.texture, node, page.size.width, page.size.height);
            this.packing(building);
            this.buildings.push(building);

            var h = building.calculateCircleHeight(400, 650, 1400, 200);
            building.uplift(-h, this.duration * MathUtil.randomRange(0.9, 1.1)).then((node) => {});
        }
    }

    grow() {
        var buildings = this.buildings.filter((building) => {
            return building.uplifted && !building.vanishing && !building.mature;
        });
        if(buildings.length <= 0) return;

        var building = buildings[Math.floor(Math.random() * buildings.length)];
        building.mature = true;
        building.upliftSeq(-50, this.duration);
    }

    surface(flag, duration = 800, easing = TWEEN.Easing.Quadratic.Out) {
        var from = this.alpha;
        var to = flag ? 1 : 0;
        var stage = this;
        
        TWEEN.remove(this.tween);
        this.tween = new TWEEN.Tween({
            alpha: from
        })
        .to({
            alpha: to 
        }, duration)
        .easing(easing)
        .onUpdate(function() {
            stage.alpha = this.alpha;
            stage.buildings.forEach((building) => {
                building.alpha = this.alpha;
            });
        })
        .onComplete(() => {
            stage.alpha = to;
            this.buildings.forEach((building) => {
                building.alpha = to;
            });
        })
        .start();
    }

    packing(building) {
        var rect = building.rect;

        var px = rect.x;
        var py = rect.y;

        var pi2 = Math.PI * 2;
        var rectangles = this.buildings.map((building) => { return building.rect; });
        var n = this.buildings.length;

        var size = Math.max(rect.w, rect.h) * 0.5;
        var radius = size;

        var counter = 0;
        var done = false;

        var offset = Math.random() * pi2;
        var limit = offset + pi2;
        var step = Math.random() * 0.2 + 0.3;

        while(!done) {
            var cx, cy;
		    for(var rad = offset; rad < limit; rad += step) {
                cx = px + radius * Math.cos(rad);
                cy = py + radius * Math.sin(rad);

                rect.x = cx;
                rect.y = cy;

                var intersection = false;

                for(var i = 0; i < n; i++) {
                    var other = rectangles[i];
                    // if(rect.intersects(other) || rect.contains(other) || other.contains(rect)) {
                    if(rect.intersects(other)) {
                        intersection = true;
                        break;
                    }
                }

                if(!intersection) {
                    done = true;
                    break;
                }
            }

		    radius += size;

            if(counter++ > 1000) {
                done = true;
            }
        }

        building.moveToRect();
    }

    destroy() {
        const easings = [
            TWEEN.Easing.Quadratic.Out,
            TWEEN.Easing.Exponential.Out,
            TWEEN.Easing.Linear.None,
        ];
        var length = easings.length;
        this.buildings.forEach((building) => {
            if(!building.vanishing) {
                var duration = this.duration * MathUtil.randomRange(0.75, 1.0);
                var easing = easings[Math.floor(Math.random() * length)];
                building.downliftAll(duration, easing).then(() => {
                    building.dispose();
                    this.remove(building);

                    var idx = this.buildings.indexOf(building);
                    this.buildings.splice(idx, 1);
                });
            }
        });
    }

    explode() {
        this.buildings.forEach((building) => {
            building.noise(0, 0);
        });
    }

    dispose() {
        this.buildings.forEach((building) => {
            this.remove(building);
            building.dispose();
        });
    }

    create(texture, node, width, height) {
        var building = new Building(this.alpha, texture, node, width, height);
        var rotate = Math.random() < 0.5;
        var rotate2 = Math.random() < 0.5;
        if(!rotate) {
            // building.rotation.set(Math.PI, 0, 0);
            building.rotation.set(Math.PI, 0, rotate2 ? Math.PI : 0);
        } else {
            // building.rotation.set(Math.PI, 0, Math.PI * 0.5);
            building.rotation.set(Math.PI, 0, rotate2 ? Math.PI * 0.5 : Math.PI * 1.5);
            building.rect.rotate90();
        }

        this.add(building);

        return building;
    }



}
