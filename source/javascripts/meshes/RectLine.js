
const build = (rect) => {
    var geometry = new THREE.Geometry();
    var left = rect.left;
    var right = rect.right;
    var top = rect.top;
    var bottom = rect.bottom;
    geometry.vertices.push(new THREE.Vector3(left, top, 0));
    geometry.vertices.push(new THREE.Vector3(right, top, 0));
    geometry.vertices.push(new THREE.Vector3(right, bottom, 0));
    geometry.vertices.push(new THREE.Vector3(left, bottom, 0));
    geometry.vertices.push(new THREE.Vector3(left, top, 0));
    return geometry;
};

export default class RectLine extends THREE.Line {

    constructor(rect) {
        super(
            build(rect),
            new THREE.LineBasicMaterial({
                color: new THREE.Color(0xff0000)
            })
        );
    }

}


