
// 全てのDOMMeshで共通のGeometryが使える
// uvScaleとuvOffsetをuniformで渡せば良い
const build = (nodes, width, height, size, zoffset) => {
    var geometry = new THREE.BufferGeometry();

    var vertices = [];
    var centers = [];
    var uv = [];
    var uv2 = [];
    var uv3 = [];
    var uv4 = []; // square packing
    var nuv4 = []; // normalized uv4
    var uv5 = [];
    var nuv5 = [];

    var counter = 0;

    var ratio = height / width;
    var nw = size / width;
    var nh = size / height;

    var wc = Math.floor(width / size);

    var textOffset = {
        x: 0,
        y: 0,
        h: 0
    };

    var scale, offset;
    var x, y, z;
    var centerX, centerY;
    var sx, sy;
    var nsx, nsy;
    var w, h;

    nodes.forEach((node) => {
        scale = node.uvScale;
        offset = node.uvOffset;

        x = node.x;
        y = node.y;
        z = node.depth * zoffset;
        centerX = x + node.width * 0.5;
        centerY = y + node.height * 0.5;

        sx = (counter % wc) * size;
        sy = Math.floor(counter / wc) * size;

        nsx = sx / width;
        nsy = sy / height;

        if(node.width > node.height) {
            w = size;
            h = (node.height / node.width) * w;
        } else {
            h = size;
            w = (node.width / node.height) * h;
        }

        vertices.push(x, y, z);
        centers.push(centerX, centerY, z);
        uv.push(offset.x, 1.0 - offset.y);
        uv2.push(0, 0);
        uv3.push(sx, sy);
        uv4.push(sx, sy);
        nuv4.push(nsx, nsy * ratio);

        vertices.push(x + node.width, y, z);
        centers.push(centerX, centerY, z);
        uv.push(offset.x + scale.x, 1.0 - offset.y);
        uv2.push(1, 0);
        uv3.push(sx + w, sy);
        uv4.push(sx + size, sy);
        nuv4.push(nsx + nw, nsy * ratio);

        vertices.push(x + node.width, y + node.height, z);
        centers.push(centerX, centerY, z);
        uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
        uv2.push(1, 1);
        uv3.push(sx + w, sy + h);
        uv4.push(sx + size, sy + size);
        nuv4.push(nsx + nw, (nsy + nh) * ratio);

        vertices.push(x, y + node.height, z);
        centers.push(centerX, centerY, z);
        uv.push(offset.x, 1.0 - (offset.y + scale.y));
        uv2.push(0, 1);
        uv3.push(sx, sy + h);
        uv4.push(sx, sy + size);
        nuv4.push(nsx, (nsy + nh) * ratio);

        if(node.text) {
            var tx = textOffset.x;
            var ty = textOffset.y;

            var ntx = tx / width;
            var nty = ty / height;
            var ntw = w / width;
            var nth = h / height;

            uv5.push(tx, ty);
            uv5.push(tx + w, ty);
            uv5.push(tx + w, ty + h);
            uv5.push(tx, ty + h);

            nuv5.push(ntx, nty * ratio);
            nuv5.push(ntx + ntw, nty * ratio);
            nuv5.push(ntx + ntw, (nty + nth) * ratio);
            nuv5.push(ntx, (nty + nth) * ratio);

            textOffset.h = Math.max(h, textOffset.h);

            textOffset.x = tx + w;
            if(textOffset.x > width) {
                textOffset.x = 0;
                textOffset.y += textOffset.h;
                textOffset.h = 0;
            }
        } else {
            for(var j = 0; j < 4; j++) {
                uv5.push(0, 0);
                nuv5.push(0, 0);
            }
        }

        counter++;
    });

    var len = vertices.length / 3;
    var indices = [];

    for(var i = 0; i < len; i += 4) {
        var a = i, b = i + 1, c = i + 2, d = i + 3;
        indices.push(a, c, b);
        indices.push(d, c, a);
    }

    // build geometry
	geometry.setIndex(indices);
    geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.addAttribute("center", new THREE.Float32BufferAttribute(centers, 3));
	geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));
	geometry.addAttribute('uv4', new THREE.Float32BufferAttribute(uv4, 2));
	geometry.addAttribute('uv5', new THREE.Float32BufferAttribute(uv5, 2));
	geometry.addAttribute('nuv4', new THREE.Float32BufferAttribute(nuv4, 2));
	geometry.addAttribute('nuv5', new THREE.Float32BufferAttribute(nuv5, 2));

    return geometry;
}

// http://erkaman.github.io/glsl-cos-palette/
const palletes = [
    [
        new THREE.Vector3(0.5, 0.6, 0.8), new THREE.Vector3(0.43, 0.44, 0.57), new THREE.Vector3(0.84, 0.81, 0.46), new THREE.Vector3(1.0, 0.61, 0.48)
    ],
    [
        new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(2.0, 1.0, 0.0), new THREE.Vector3(0.5, 0.2, 0.25)
    ],
    [
        new THREE.Vector3(0.79, 0.86, 0.73), new THREE.Vector3(0.41, 0.67, 0.46), new THREE.Vector3(0.4, 0.91, 0.07), new THREE.Vector3(0.48, 0.09, 0.99)
    ],
    [
        new THREE.Vector3(0.5, 0.4, 0.5), new THREE.Vector3(0.3, 0.3, 0.1), new THREE.Vector3(2.6, 2.4, 1.6), new THREE.Vector3(1.0, 0.3, 0.8)
    ],
    [
        new THREE.Vector3(0.4, 0.2, 0.5), new THREE.Vector3(0.3, 0.4, 0.3), new THREE.Vector3(1.8, 0.7, 1.0), new THREE.Vector3(0.0, 0.7, 0.6)
    ],
    [
        new THREE.Vector3(0.3, 0.5, 0.7), new THREE.Vector3(0.2, 0.4, 0.1), new THREE.Vector3(2.7, 1.2, 1.3), new THREE.Vector3(1.0, 0.3, 0.4)
    ],
    [
        new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(1.0, 0.7, 0.4), new THREE.Vector3(0.0, 0.2, 0.2)
    ]
];

export default class DOMMesh extends THREE.Mesh {

    constructor(nodes, width, height, size, offset) {
        let pallete = 0;
        super(
            new THREE.Geometry(),
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/dom/dom.vert"),
                fragmentShader : require("../../shaders/dom/dom.frag"),
                uniforms : {
                    capture: { type : "t", value : null },
                    from: { type : "i", value : 0 },
                    to: { type : "i", value : 1 },

                    t: { type : "f", value : 0.0 },
                    c: { type : "f", value : 0.0 },
                    lighting: { type : "f", value : 0.0 },
                    lightDirection: { type : "v3", value : new THREE.Vector3(0.1, -0.5, -0.5) },
                    // threshold: { type : "f", value : 0.0 },

                    time: { type : "f", value : 0.0 },
                    scale: { type : "v2", value : new THREE.Vector2(0.05, 0.1) },
                    intensity: { type : "f", value : 0.0 },

                    pa: { type : "v3", value : palletes[pallete][0] },
                    pb: { type : "v3", value : palletes[pallete][1] },
                    pc: { type : "v3", value : palletes[pallete][2] },
                    pd: { type : "v3", value : palletes[pallete][3] },

                    texturePressure: { type : "t", value : null },
                    textureVelocity: { type : "t", value : null },
                },
                side: THREE.DoubleSide
            })
        );
        this.init(nodes, width, height, size, offset);

        this.durationT = 750;
        this.durationL = 800;

        this.modes = {
            "default": 0,
            "grid": 1,
            "square grid": 2,
            "text only": 3,
        };

        this.onNextT = () => {};
        this.pallete = pallete;
    }

    init(nodes, width, height, size, offset) {
        this.geometry = build(nodes, width, height, size, offset);
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

    get mode() {
        if(this.material.uniforms.t.value < 0.5) {
            return this.from;
        } else {
            return this.to;
        }
    }

    set mode(mode) {
        if(this.material.uniforms.t.value < 0.5) {
            this.to = mode;
        } else {
            this.from = mode;
        }
        this.nextT();
    }

    noise(n) {
        this.material.uniforms.time.value = n.time;
        this.material.uniforms.scale.value = n.scale;
        this.material.uniforms.intensity.value = n.intensity;
    }

    color(pa, pb, pc, pd) {
        this.material.uniforms.pa.value = pa;
        this.material.uniforms.pb.value = pb;
        this.material.uniforms.pc.value = pc;
        this.material.uniforms.pd.value = pd;
    }

    nextC(next, duration = 700, easing = TWEEN.Easing.Quadratic.Out) {
        var mesh = this;
        var from = palletes[mesh.pallete];
        var to = palletes[next % palletes.length];
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                t: 0
            })
            .to({ t: 1 }, duration)
            .easing(easing)
            .onUpdate(function() {
                var pa = from[0].clone().lerp(to[0], this.t);
                var pb = from[1].clone().lerp(to[1], this.t);
                var pc = from[2].clone().lerp(to[2], this.t);
                var pd = from[3].clone().lerp(to[3], this.t);
                mesh.color(pa, pb, pc, pd);
            })
            .onComplete(function() {
                mesh.color(to[0], to[1], to[2], to[3]);
                mesh.pallete = next;
            })
            .start();
        });
    }

    nextT(easing = TWEEN.Easing.Quadratic.Out) {
        var from = this.material.uniforms.t.value < 0.5 ? 0.0 : 1.0;
        var to = 1 - from;
        if(this.onNextT) {
            this.onNextT(to > 0.5 ? this.to : this.from);
        }
        this.tweenT(from, to, this.durationT, easing);
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

    html(flag, easing = TWEEN.Easing.Quadratic.Out) {
        var from = this.material.uniforms.c.value;
        if(flag === undefined) {
            flag = (from > 0.5);
        }
        var to = flag ? 0 : 1;
        this.tweenC(from, to, 800, easing);
    }

    light(flag, easing = TWEEN.Easing.Quadratic.Out) {
        var from = this.material.uniforms.lighting.value;
        if(flag === undefined) {
            flag = (from < 0.5);
        }
        var to = flag ? 1 : 0;
        this.tweenL(from, to, this.durationL, easing);
    }

    tweenC(from, to, duration, easing = TWEEN.Easing.Quadratic.Out) {
        var uniforms = this.material.uniforms;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                c: from
            })
            .to({ c: to }, duration)
            .easing(easing)
            .onUpdate(function() {
                uniforms.c.value = this.c;
            })
            .onComplete(function() {
                uniforms.c.value = to;
            })
            .start();
        });
    }

    tweenL(from, to, duration, easing = TWEEN.Easing.Quadratic.Out) {
        var uniforms = this.material.uniforms;
        return new Promise((resolve, reject) => {
            new TWEEN.Tween({
                lighting: from
            })
            .to({ lighting: to }, duration)
            .easing(easing)
            .onUpdate(function() {
                uniforms.lighting.value = this.lighting;
            })
            .onComplete(function() {
                uniforms.lighting.value = to;
            })
            .start();
        });
    }

    another(candidates, v) {
        candidates.splice(candidates.indexOf(v), 1);
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    osc(data) {
        switch(data[0]) {
            case "mode": // set next mode
                var mode = parseInt(data[1]);
                if(mode < 0) {
                    // randomize
                    this.mode = this.another([0, 1, 2, 3], this.mode);
                } else {
                    this.mode = mode;
                }
                break;

            case "html":
                this.html(data[1] == 1);
                break;

            case "light":
                this.light(data[1] == 1);
                break;

            case "color": // change to next color
                var next = parseInt(data[1]);
                if(next < 0) {
                    var candidates = palletes.map(function(p, i) { return i; });
                    this.nextC(this.another(candidates, this.palette));
                } else {
                    this.nextC(next);
                }
                break;

        }
    }

}
