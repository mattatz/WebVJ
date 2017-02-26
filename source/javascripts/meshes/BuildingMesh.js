
import BuildingLine from "../meshes/BuildingLine";

const build = (w = 2, h = 2) => {
    var geometry = new THREE.BufferGeometry();

	var width_half = 0.5;
	var height_half = 0.5;
	var gridX = w;
	var gridY = h;
	var gridX1 = gridX + 1;
	var gridY1 = gridY + 1;

	var segment_width = 1 / gridX;
	var segment_height = 1 / gridY;

	var ix, iy;

	// buffers

	var indices = [];
	var vertices = [];
	var uvs = [];
	var flags = [];

	// generate vertices and uvs
	for (iy = 0; iy < gridY1; iy++) {
		var y = iy * segment_height - height_half;
		for (ix = 0; ix < gridX1; ix++) {
			var x = ix * segment_width - width_half;
			vertices.push(x, -y, 0);
			uvs.push(ix / gridX);
			uvs.push(1 - (iy / gridY));
			flags.push(1);
		}
	}

    vertices.push(-width_half, height_half, 0);
    uvs.push(0, 1);
    flags.push(0);

    vertices.push(width_half, height_half, 0);
    uvs.push(1, 1);
    flags.push(0);

    vertices.push(width_half, -height_half, 0);
    uvs.push(1, 0);
    flags.push(0);

    vertices.push(-width_half, -height_half, 0);
    uvs.push(0, 0);
    flags.push(0);

	// indices
	for (iy = 0; iy < gridY; iy++) {
		for (ix = 0; ix < gridX; ix++) {
			var a = ix + gridX1 * iy;
			var b = ix + gridX1 * ( iy + 1 );
			var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
			var d = ( ix + 1 ) + gridX1 * iy;

			// faces
			indices.push(a, d, b);
			indices.push(b, d, c);
		}
	}

    var lb = 0;
    var rb = gridX;
    var rt = gridX1 * gridY + gridX;
    var lt = gridX1 * gridY;

    var len = vertices.length / 3;
    var lb2 = len - 4;
    var rb2 = len - 3;
    var rt2 = len - 2;
    var lt2 = len - 1;

    /*
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
    */

    indices.push(lt2, lb2, lt);
    indices.push(lt, lb2, lb);

    indices.push(rt2, lt2, rt);
    indices.push(rt, lt2, lt);

    indices.push(rb2, rt2, rb);
    indices.push(rb, rt2, rt);

    indices.push(lb2, rb2, lb);
    indices.push(lb, rb2, rb);

    indices.push(lb2, rt2, rb2);
    indices.push(lt2, rt2, lb2);

	// build geometry
	geometry.setIndex(indices);
	geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	geometry.addAttribute('flag', new THREE.Float32BufferAttribute(flags, 1));
    return geometry;
};

const _geometry = build(1, 1);

export default class BuildingMesh extends THREE.Mesh {

    constructor(node, alpha = 1.0) {
        super(
            _geometry,
            new THREE.RawShaderMaterial({
                vertexShader : require("../../shaders/dom/building.vert"),
                fragmentShader : require("../../shaders/dom/building.frag"),
                uniforms: {
                    alpha: { type: "f", value : alpha },
                    time: { type: "f", value : 0.0 },
                    height: { type: "f", value : 0.0 },
                    offset: { type: "f", value : 0.0 },
                    capture: { type: "t", value : null },
                    uvScale: { type: "v2", value : node.uvScale },
                    uvOffset: { type: "v2", value : node.uvOffset },
                    lightDirection: { type: "v3", value : new THREE.Vector3(0.35, 0.15, 1.0) },
                },
                // side: THREE.DoubleSide,
                transparent: true
            })
        );

        this.line = new BuildingLine();
        this.add(this.line);

        this.frustumCulled = this.line.frustumCulled = false; // Avoid getting clipped
    }

    uplift(height) {
        this.material.uniforms.height.value = height;
        this.line.uplift(height);
    }

    offset(dh) {
        var cur = this.material.uniforms.offset.value;;
        var h = Math.min(cur + dh, -this.height * 0.5);
        this.material.uniforms.offset.value = h;
        this.line.offset(h);
    }

    get alpha() {
        return this.material.uniforms.alpha.value;
    }

    set alpha(alpha) {
        this.material.uniforms.alpha.value = alpha;
    }

    get height() {
        return this.material.uniforms.height.value;
    }

}
