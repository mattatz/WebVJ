
Array.prototype.flatten = function() {
    return Array.prototype.concat.apply([], this);
};

export default class DOM {

    constructor(screen, node, depth = 0, color = false) {
        this.depth = depth;

        if(node.hasTranform) {
            this.setTransform(screen, node);
        }

        this.text = node.text;
        this.nodeType = node.nodeType;
        this.tagName = node.tagName;

        if(node.backgroundColor) {
            this.backgroundColor = node.backgroundColor;
        } else if(color) {
            this.backgroundColor = color;
        }

        this.children = [];
        var nodes = node.children;
        if(nodes) {
            for(var i = 0, n = nodes.length; i < n; i++) {
                var child = new DOM(screen, nodes[i], depth + 1, this.backgroundColor);
                this.children.push(child);
            }
        }
        this.mesh = null;
    }

    traverse(callback) {
        callback(this);
        this.children.forEach(function(child) {
            child.traverse(callback);
        });
    }

    build(MeshConstructor) {
        this.mesh = new MeshConstructor(this);
        this.mesh.rotation.set(0, 0, 0);
        this.mesh.position.set(this.x + this.width * 0.5, this.y + this.height * 0.5, 0);
        this.mesh.scale.set(this.width, this.height, 1);
        return this.mesh;
    }

    getNodesWithSize (size) {
        if(!this.hasTranform) {
            return [];
        }

        if(this.width < size || this.height < size) {
            return [this];
        } else {
            var nodes = this.children.map(function(child) {
                return child.getNodesWithSize(size);
            }).flatten();
            return nodes;
        }
    }

    getNodesWithDepth (result) {
        if(!result[this.depth]) {
            result[this.depth] = [];
        }
        if(this.hasTranform) {
            result[this.depth].push(this);
        }
        this.children.forEach(function(child) {
            return child.getNodesWithDepth(result);
        });
    }

    getTextNodes () {
        var nodes = this.children.map(function(child) {
            return child.getTextNodes();
        }).flatten();
        if(this.text) {
            nodes.push(this);
        }
        return nodes;
    }

    getNodesAt (depth, hasTranformOnly = false) {
        if(this.depth == depth) {
            if(hasTranformOnly) {
                if(this.hasTranform) {
                    return [this];
                } else {
                    return [];
                }
            }
            return [this];
        } else if (this.depth > depth) {
            return [];
        } else {
            var nodes = this.children.map(function(child) {
                return child.getNodesAt(depth, hasTranformOnly);
            });
            return nodes.flatten();
        }
    }

    getLargestChild() {
        var max = 0;
        var index = 0;
        for(var i = 0, n = this.children.length; i < n; i++) {
            var child = this.children[i];
            var size = Math.max(child.width, child.height);
            if(child.hasTranform && size > max) {
                index = i;
                max = size;
            }
        }
        return this.children[index];
    }

    setTransform(screen, node) {
        var rect = node.rect;

        if(rect.width <= 0 || rect.height <= 0) {
            return false;
        }

        this.x = rect.left;
        this.y = rect.top;
        this.width = rect.width;
        this.height = rect.height;

        var x = rect.left / screen.width;
        var y = rect.top / screen.height;
        var w = rect.width / screen.width;
        var h = rect.height / screen.height;
        this.ratio = rect.width / rect.height;
        this.bounds = {
            min : { x : x, y : y },
            max : { x : x + w, y : y + h }
        };
        this.uvScale = new THREE.Vector2(w, h);
        this.uvOffset = new THREE.Vector2(x, y);

        return this.hasTranform = true;
    }

}

