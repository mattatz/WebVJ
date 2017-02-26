
import DOM from "../objects/DOM";

export default class Page {

    constructor(texture, size, root) {
        this.texture = texture;
        this.size = size;

        // set whole size to root 
        root.rect.width = size.width;
        root.rect.height = size.height;
        this.root = new DOM({ width : size.width, height : size.height }, root);

        this.hierarchy = [];
    }

    buildHierarchy() {
        if(this.hierarchy.length > 0) {
            // already built.
            return this.hierarchy;
        }
        this.root.getNodesWithDepth(this.hierarchy);
        return this.hierarchy;
    }

}

