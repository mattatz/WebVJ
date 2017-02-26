
export default class Rect {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    intersects(other) {
		return (
            this.left < other.right && 
            this.right > other.left && 
            this.top < other.bottom && 
            this.bottom > other.top
        );
    }

    contains(other) {
        return (
            this.left < other.left && 
            other.right < this.right && 
            this.top < other.top && 
            other.bottom < this.bottom 
        );
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.w;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.h;
    }

    rotate90() {
        var tmp = this.w;
        this.w = this.h;
        this.h = tmp;
    }

}

