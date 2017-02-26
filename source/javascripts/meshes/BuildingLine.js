
const build = (w = 1, h = 1) => {
    var geometry = new THREE.BufferGeometry();

	var width_half = 0.5;
	var height_half = 0.5;

	var vertices = [];
	var flags = [];

    // top

    vertices.push(-width_half, height_half, 0); flags.push(1);
    vertices.push(width_half, height_half, 0); flags.push(1);

    vertices.push(width_half, height_half, 0); flags.push(1);
    vertices.push(width_half, -height_half, 0); flags.push(1);

    vertices.push(width_half, -height_half, 0); flags.push(1);
    vertices.push(-width_half, -height_half, 0); flags.push(1);

    vertices.push(-width_half, -height_half, 0); flags.push(1);
    vertices.push(-width_half, height_half, 0); flags.push(1);

    // side

    vertices.push(-width_half, height_half, 0); flags.push(1);
    vertices.push(-width_half, height_half, 0); flags.push(0);

    vertices.push(width_half, height_half, 0); flags.push(1);
    vertices.push(width_half, height_half, 0); flags.push(0);

    vertices.push(width_half, -height_half, 0); flags.push(1);
    vertices.push(width_half, -height_half, 0); flags.push(0);

    vertices.push(-width_half, -height_half, 0); flags.push(1);
    vertices.push(-width_half, -height_half, 0); flags.push(0);

    // bottom 

    vertices.push(-width_half, height_half, 0); flags.push(0);
    vertices.push(width_half, height_half, 0); flags.push(0);

    vertices.push(width_half, height_half, 0); flags.push(0);
    vertices.push(width_half, -height_half, 0); flags.push(0);

    vertices.push(width_half, -height_half, 0); flags.push(0);
    vertices.push(-width_half, -height_half, 0); flags.push(0);

    vertices.push(-width_half, -height_half, 0); flags.push(0);
    vertices.push(-width_half, height_half, 0); flags.push(0);

	// build geometry
	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute('flag', new THREE.Float32BufferAttribute(flags, 1));
    return geometry;
};

const _geometry = build(2, 2);

export default class BuildingLine extends THREE.LineSegments {

    constructor(node) {
        super(
            _geometry,
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/dom/building.vert"),
                fragmentShader : require("../../shaders/dom/buildingWire.frag"),
                uniforms : {
                    height: { type : "f", value : 0.0 },
                    offset: { type: "f", value : 0.0 },
                },
                linewidth: 1.0
            })
        );
    }

    uplift(height) {
        this.material.uniforms.height.value = height;
    }

    offset(h) {
        this.material.uniforms.offset.value = h;
    }

    get height() {
        return this.material.uniforms.height.value;
    }

}

