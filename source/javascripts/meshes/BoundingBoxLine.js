
const build = (nodes, width, height, size, sideCount) => {
    var geometry = new THREE.BufferGeometry();

    var vertices = [];
    var tips = [];
    var easings = [];
    var uv = [];
    var uv2 = [];
    var uv3 = []; // text only position

    var inv = 1 / sideCount;
    var counter = 0, counter2 = 0;

    var wc = Math.floor(width / size);

    var textOffset = {
        x: 0,
        y: 0,
        h: 0
    };

    var sx, sy;

    var l, r, t, b;
    var l2, r2, t2, b2;
    var w, h;

    nodes.forEach((node) => {
        l = node.x;
        r = node.x + node.width;
        t = node.y;
        b = node.y + node.height;

        vertices.push(l, t, 0);
        vertices.push(r, t, 0);
        tips.push(0, 1);

        vertices.push(r, t, 0);
        vertices.push(r, b, 0);
        tips.push(0, 1);

        vertices.push(r, b, 0);
        vertices.push(l, b, 0);
        tips.push(0, 1);

        vertices.push(l, b, 0);
        vertices.push(l, t, 0);
        tips.push(0, 1);

        for(var j = 0; j < 4; j++) {
            var easing = Math.floor(Math.random() * 4);
            easings.push(easing, easing);

            var u = (counter % sideCount) * inv;
            var div = (counter * inv);
            var v = div - ((counter * inv) % 1.0);
            uv.push(u, v, u, v);
            counter++;
        }

        sx = (counter2 % wc) * size;
        sy = Math.floor(counter2 / wc) * size;

        l2 = sx, r2 = sx + size;
        t2 = sy, b2 = sy + size;
        uv2.push(l2, t2, r2, t2);
        uv2.push(r2, t2, r2, b2);
        uv2.push(r2, b2, l2, b2);
        uv2.push(l2, b2, l2, t2);

        if(node.text) {
            if(node.width > node.height) {
                w = size;
                h = (node.height / node.width) * w;
            } else {
                h = size;
                w = (node.width / node.height) * h;
            }

            var tx = textOffset.x;
            var ty = textOffset.y;
            uv3.push(tx, ty); uv3.push(tx + w, ty);
            uv3.push(tx + w, ty); uv3.push(tx + w, ty + h);
            uv3.push(tx + w, ty + h); uv3.push(tx, ty + h);
            uv3.push(tx, ty + h); uv3.push(tx, ty);

            textOffset.h = Math.max(h, textOffset.h);

            textOffset.x = tx + w; 
            if(textOffset.x > width) {
                textOffset.x = 0;
                textOffset.y += textOffset.h;
                textOffset.h = 0;
            }
        } else {
            for(var j = 0; j < 8; j++) {
                uv3.push(0, 0);
            }
        }

        counter2++;
    });

	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute('tip', new THREE.Float32BufferAttribute(tips, 1));
	geometry.addAttribute('easing', new THREE.Float32BufferAttribute(easings, 1));
	geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));

    return geometry;
};

export default class BoundingBoxLine extends THREE.LineSegments {

    constructor(nodes, width, height, size, sideCount) {
        super(
            new THREE.Geometry(),
            new THREE.RawShaderMaterial({
                uniforms: {
                    textureLifetime: { type: "t", value: null },

                    t: { type: "f", value: 0.0 },
                    alpha: { type: "f", value: 1.0 },
                    beta: { type: "f", value: 0.0 },
                    time: { type: "f", value : 0.0 },
                    scale: { type: "v2", value : new THREE.Vector2(0.05, 0.1) },
                    intensity: { type: "f", value : 2.0 },
                    from: { type: "i", value: 0 },
                    to: { type: "i", value: 1 },
                },
                vertexShader: require("../../shaders/dom/boundingBox.vert"),
                fragmentShader: require("../../shaders/dom/boundingBox.frag"),
                linewidth: 1,
                transparent: true
            })
        );

        this.init(nodes, width, height, size, sideCount);
    }

    init(nodes, width, height, size, sideCount) {
        this.geometry = build(nodes, width, height, size, sideCount);
    }

    noise(n) {
        this.material.uniforms.time.value = n.time;
        this.material.uniforms.scale.value = n.scale;
        this.material.uniforms.intensity.value = n.intensity;
    }

    nextT(duration = 800, easing = TWEEN.Easing.Quadratic.Out) {
        var from = this.material.uniforms.t.value < 0.5 ? 0.0 : 1.0;
        var to = 1 - from;
        this.tweenT(from, to, duration, easing);
    }

    tweenT(from, to, duration, easing = TWEEN.Easing.Quadratic.Out) {
        var uniforms = this.material.uniforms;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                t: from
            })
            .to({ t: to }, duration)
            .easing(easing)
            .onUpdate(function() {
                uniforms.t.value = this.t;
            })
            .onComplete(function() {
                uniforms.t.value = to;
            })
            .start();
        });
    }

    show(duration = 1000, easing = TWEEN.Easing.Quadratic.Out) {
        this.tweenAlpha(this.material.uniforms.alpha.value, 1.0, duration, easing);
    }

    hide(duration = 1000, easing = TWEEN.Easing.Quadratic.Out) {
        this.tweenAlpha(this.material.uniforms.alpha.value, 0, duration, easing);
    }

    tweenAlpha(from, to, duration, easing = TWEEN.Easing.Quadratic.Out) {
        var uniforms = this.material.uniforms;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                alpha: from
            })
            .to({ alpha: to }, duration)
            .easing(easing)
            .onUpdate(function() {
                uniforms.alpha.value = this.alpha;
            })
            .onComplete(function() {
                uniforms.alpha.value = to;
            })
            .start();
        });
    }

    move(duration = 800, easing = TWEEN.Easing.Quadratic.Out) {
        var line = this;
        var from = line.beta;
        var to = (from < 0.5) ? 1 : 0;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                beta: from
            })
            .to({ beta: to }, duration)
            .easing(easing)
            .onUpdate(function() {
                line.beta = this.beta;
            })
            .onComplete(function() {
                line.beta = to;
                resolve();
            })
            .start();
        });
    }

    get from() {
        return this.material.uniforms.from.value;
    }

    set from(mode) {
        this.material.uniforms.from.value = mode;
    }

    get to() {
        return this.material.uniforms.to.value;
    }

    set to(mode) {
        this.material.uniforms.to.value = mode;
    }

    set next(mode) {
        if(this.material.uniforms.t.value < 0.5) {
            this.to = mode;
        } else {
            this.from = mode;
        }
    }

    get beta() {
        return this.material.uniforms.beta.value;
    }

    set beta(v) {
        this.material.uniforms.beta.value = v;
    }

    osc(data) {
        switch(data[0]) {
            case "show":
                this.show();
                break;

            case "hide":
                this.hide();
                break;

            case "move":
                this.move();
                break;
        }
    }

}


