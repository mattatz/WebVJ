
const build = (count = 512, size = 64) => {
    var geometry = new THREE.BufferGeometry();

    var half = (size * count) * 0.5;

	var vertices = [];
    var uv = [];
    var uv2 = [];
    var flags = [];

    var invC = 1 / count;

    for(var y = 0; y < count; y++) {
        for(var x = 0; x < count; x++) {
            var u = (x + 0.5) * invC;
            var v = (y + 0.5) * invC;

            var l = (x * size) - half;
            var r = l + size;
            var t = (y * size) - half;
            var b = t + size;

            vertices.push(l, t, 0);
            vertices.push(r, t, 0);
            vertices.push(r, b, 0);
            vertices.push(l, b, 0);

            for(var i = 0; i < 4; i++) {
                flags.push(1);
            }

            vertices.push(l, t, 0);
            vertices.push(r, t, 0);
            vertices.push(r, b, 0);
            vertices.push(l, b, 0);

            for(var i = 0; i < 4; i++) {
                flags.push(0);
            }

            for(var i = 0; i < 8; i++) {
                uv.push(u, v);
            }

            uv2.push(
                u, v,
                u + invC, v,
                u + invC, v + invC,
                u, v + invC,

                u, v,
                u + invC, v,
                u + invC, v + invC,
                u, v + invC
            );
        }
    }

    var indices = [];
    for(var i = 0, n = (vertices.length / 3 / 8); i < n; i++) {
        var offset = i * 8;
        var lt = offset;
        var rt = offset + 1;
        var rb = offset + 2;
        var lb = offset + 3;

        var lt2 = offset + 4;
        var rt2 = offset + 5;
        var rb2 = offset + 6;
        var lb2 = offset + 7;

        indices.push(lt, rt, rb);
        indices.push(lt, rb, lb);

        // sides
        indices.push(lt2, lt, lb2);
        indices.push(lt, lb, lb2);

        indices.push(rt2, rt, lt2);
        indices.push(rt, lt, lt2);

        indices.push(rb2, rb, rt2);
        indices.push(rb, rt, rt2);

        indices.push(lb2, lb, rb2);
        indices.push(lb, rb, rb2);

        indices.push(lb2, rb2, rt2);
        indices.push(lt2, lb2, rt2);
    }

	// build geometry
	geometry.setIndex(indices);
	geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute("uv2", new THREE.Float32BufferAttribute(uv2, 2));
	geometry.addAttribute("flag", new THREE.Float32BufferAttribute(flags, 1));

    return geometry;
};

export default class GridMesh extends THREE.Mesh {

    constructor(count = 512, size = 32) {
        super(
            build(count, size),
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/particles/grid.vert"),
                fragmentShader : require("../../shaders/particles/grid.frag"),
                uniforms : {
                    capture: { type : "t", value : null },
                    uvScale: { type : "f", value : 1.0 },
                    textureHeight: { type : "t", value : null },
                    height: { type: "f", value : 400.0 },
                    lightDirection: { type: "v3", value : new THREE.Vector3(0.35, 0.15, 1.0) },
                },
                transparent: true
            })
        );
    }

    set height(h) {
        this.material.uniforms.height.value = h;
    }

}


