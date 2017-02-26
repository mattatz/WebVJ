
export default class GridMap {

    constructor(width = 50, height = 50) {
        this.width = width;
        this.height = height;

        this.center = {
            x: Math.floor(this.width * 0.5),
            y: Math.floor(this.height * 0.5),
        };

        this.grid = [];
        for(var y = 0; y < height; y++) {
            var row = [];
            for(var x = 0; x < width; x++) {
                row.push(false);
            }
            this.grid.push(row);
        }

    }

    circle() {
        var cx = this.center.x;
        var cy = this.center.y;
        var length = 0;

        var x, y;
        while(length < this.height && length < this.width) {
            for(var dy = - length; dy <= length; dy++) {
                for(var dx = - length; dx <= length; dx++) {
                    y = cy + dy;
                    x = cx + dx;
                    if(y < this.height && x < this.width) {
                        if(!this.grid[y][x]) {
                            this.grid[y][x] = true;
                            return {
                                x: x, y: y
                            };
                        }
                    }
                }
            }
            length++;
        }
        return false;
    }

}

