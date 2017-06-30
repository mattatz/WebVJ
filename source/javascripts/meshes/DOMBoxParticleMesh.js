
const build = (pages, nodes, sideCount = 128) => {
    var geometry = new THREE.BufferGeometry();

    var indices = [];
    var vertices = [];
    var voxels = [];

    var uv = [];
    var uv2 = [];
    var unit = [];

    var inv = 1 / sideCount;
    var hs = 0.5;

    var index = 0;
    var nodeLength = nodes.length;

    for(var y = 0; y < sideCount; y++) {
        for(var x = 0; x < sideCount; x++) {
            var element = nodes[(index++) % nodeLength];

            var node = element.node;
            var scale = node.uvScale;
            var offset = node.uvOffset;

            var hw = node.width * 0.5;
            var hh = node.height * 0.5;
            var hd = Math.min(hw, hh);

            // top
            vertices.push(-hw, -hh, hd); // lt
            vertices.push(hw, -hh, hd); // rt
            vertices.push(hw, hh, hd); // rb
            vertices.push(-hw, hh, hd); // lb

            voxels.push(-hs, -hs, hs); // lt
            voxels.push(hs, -hs, hs); // rt
            voxels.push(hs, hs, hs); // rb
            voxels.push(-hs, hs, hs); // lb

            // bottom
            vertices.push(-hw, -hh, -hd); // lt
            vertices.push(hw, -hh, -hd); // rt
            vertices.push(hw, hh, -hd); // rb
            vertices.push(-hw, hh, -hd); // lb

            voxels.push(-hs, -hs, -hs); // lt
            voxels.push(hs, -hs, -hs); // rt
            voxels.push(hs, hs, -hs); // rb
            voxels.push(-hs, hs, -hs); // lb

            // top
            uv.push(offset.x + scale.x, 1.0 - offset.y);
            uv.push(offset.x, 1.0 - offset.y);
            uv.push(offset.x, 1.0 - (offset.y + scale.y));
            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));

            // bottom
            uv.push(offset.x, 1.0 - offset.y);
            uv.push(offset.x + scale.x, 1.0 - offset.y);
            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
            uv.push(offset.x, 1.0 - (offset.y + scale.y));

            var u = x * inv;
            var v = y * inv;
            for(var i = 0; i < 8; i++) {
                uv2.push(u, v);
            }

            for(var i = 0; i < 8; i++) {
                unit.push(element.page);
            }

        }
    }

    var len = vertices.length / 3;
    for(var i = 0; i < len; i += 8) {
        var a = i, b = i + 1, c = i + 2, d = i + 3;
        var e = i + 4, f = i + 5, g = i + 6, h = i + 7;

        // up down
        indices.push(a, b, c);
        indices.push(d, a, c);

        indices.push(e, g, f);
        indices.push(h, g, e);

        // front back
        indices.push(a, e, b);
        indices.push(e, f, b);

        indices.push(c, g, d);
        indices.push(g, h, d);

        // left right
        indices.push(c, b, g);
        indices.push(f, g, b);

        indices.push(e, a, d);
        indices.push(h, e, d);
    }

	// build geometry
	geometry.setIndex(indices);
	geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute("voxel", new THREE.Float32BufferAttribute(voxels, 3));
	geometry.addAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute("uv2", new THREE.Float32BufferAttribute(uv2, 2));
	geometry.addAttribute("unit", new THREE.Float32BufferAttribute(unit, 1));

    return geometry;
};

export default class DOMBoxParticleMesh extends THREE.Mesh {

    constructor(pages, nodes, sideCount) {
        super(
            build(pages, nodes, sideCount),
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/particles/domBoxParticle.vert"),
                fragmentShader : require("../../shaders/particles/domBoxParticle.frag"),
                uniforms : {
                    captures: { type: "tv", value: pages.map((page) => { return page.texture; })},
                    lightDirection: { type: "v3", value : new THREE.Vector3(0.35, 0.15, 1.0) },
                    texturePosition: { type : "t", value : null },
                    textureRotation: { type : "t", value : null },
                    textureVelocity: { type : "t", value : null },
                    scale: { type : "f", value : 0.4 },
                }
            })
        );
    }

}
