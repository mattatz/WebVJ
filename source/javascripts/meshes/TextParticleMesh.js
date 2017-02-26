
const build = (nodes, sideCount = 128) => {
    var geometry = new THREE.BufferGeometry();

    var indices = [];
    var vertices = [];
    var uv = []; 
    var uv2 = []; 
    var uv3 = []; 
    var colors = [];

    var inv = 1 / sideCount;
    var hinv = inv * 0.5;
    var nodeLength = nodes.length;
    var index = 0;

    for(var y = 0; y < sideCount; y++) {
        for(var x = 0; x < sideCount; x++) {
            var node = nodes[(index++) % nodeLength];
            var scale = node.uvScale;
            var offset = node.uvOffset;

            var u = x * inv + hinv;
            var v = y * inv + hinv;

            var hw = node.width * 0.5;
            var hh = node.height * 0.5;

            vertices.push(-hw, -hh, 0); // lt
            uv.push(offset.x, 1.0 - offset.y);
            uv2.push(0, 0);

            vertices.push(hw, -hh, 0); // rt
            uv.push(offset.x + scale.x, 1.0 - offset.y);
            uv2.push(1, 0);

            vertices.push(hw, hh, 0); // rb
            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
            uv2.push(1, 1);

            vertices.push(-hw, hh, 0); // lb
            uv.push(offset.x, 1.0 - (offset.y + scale.y));
            uv2.push(0, 1);

            for(var i = 0; i < 4; i++) {
                uv3.push(u, v);
            }

            var color = new THREE.Color(node.backgroundColor);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
            colors.push(color.r, color.g, color.b);
        }
    }

    var len = vertices.length / 3;
    for(var i = 0; i < len; i += 4) {
        var a = i, b = i + 1, c = i + 2, d = i + 3;
        indices.push(a, c, b);
        indices.push(d, c, a);
    }

	// build geometry
	geometry.setIndex(indices);
	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));
	geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;

};

export default class TextParticleMesh extends THREE.Mesh {

    constructor(nodes, sideCount) {
        super(
            new THREE.Geometry(),
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/particles/textParticle.vert"),
                fragmentShader : require("../../shaders/particles/textParticle.frag"),
                uniforms : {
                    time: { type : "f", value : 0.0 },
                    capture: { type : "t", value : null },
                    texturePosition: { type : "t", value : null },
                    textureRotation: { type : "t", value : null },
                    textureVelocity: { type : "t", value : null },
                },
                depthWrite: false,
                transparent: true,
                side: THREE.DoubleSide
            })
            // new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000), wireframe: true, side: THREE.DoubleSide })
        );
        this.init(nodes, sideCount);
    }

    init(nodes, sideCount) {
        this.geometry.dispose();
        this.geometry = build(nodes, sideCount);
    }


}

