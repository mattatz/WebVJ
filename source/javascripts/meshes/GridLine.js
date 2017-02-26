
const build = (w = 10, h = 10) => {
    var geometry = new THREE.BufferGeometry();

	var vertices = [];
    var uv = [];

    var invH = 1 / h;
    var invW = 1 / w;
    var py, py2;
    var px, px2;

    for(var y = 0, n = h - 1; y < n; y++) {
        py = y * invH - 0.5;
        py2 = (y + 1) * invH - 0.5;

        for(var x = 0, m = w - 1; x < m; x++) {
            px = x * invW - 0.5;
            px2 = (x + 1) * invW - 0.5;

            // vertical
            vertices.push(px, py, 0);
            vertices.push(px, py2, 0);

            // horizontal
            vertices.push(px, py, 0);
            vertices.push(px2, py, 0);
        }

        // last column
        vertices.push(px2, py, 0);
        vertices.push(px2, py2, 0);
    }

    // last row
    for(var x = 0, m = w - 1; x < m; x++) {
        px = x * invW - 0.5;
        px2 = (x + 1) * invW - 0.5;

        vertices.push(px, py2, 0);
        vertices.push(px2, py2, 0);
    }

	// build geometry
	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
};

export default class GridLine extends THREE.LineSegments {

    constructor(w, h) {
        super(
            build(w, h),
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/dom/grid.vert"),
                fragmentShader : require("../../shaders/dom/grid.frag"),
                uniforms : {
                    texturePressure: { type : "t", value : null },
                    textureVelocity: { type : "t", value : null },
                },
                linewidth: 1.0,
                transparent: true,
            })
        );

    }

    noise(n) {
    }

    dispose() {
        this.mesh.material.dispose();
        this.mesh.geometry.dispose();
    }

}


