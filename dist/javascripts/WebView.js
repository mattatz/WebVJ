
function TextDOM(text, rect, depth) {
    this.text = text;
    this.rect = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
    };
    this.depth = depth;
    this.hasTranform = true;
}

TextDOM.prototype = {
    getSize: function(size) {
        size.width = Math.max(size.width, this.rect.left + this.rect.width);
        size.height = Math.max(size.height, this.rect.top + this.rect.height);
    }
};

function rgb2hex(color) {
    var ret = /rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),?\s*([.\d]+)?\)/.exec(color);
    var rgbHex = ""; 
    for(var i=1; i<=3; i++){
        var hex = Number(ret[i]).toString(16);
        rgbHex += (hex.length === 1)? "0" + hex : hex; 
    }
    return parseInt("0x" + rgbHex);
}

function DOM(node, depth) {
    this.depth = depth;

    if(node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        this.setTransform(rect);
        var rgb = window.getComputedStyle(node, null).getPropertyValue("background-color");
        this.backgroundColor = rgb2hex(rgb);
    }

    this.nodeType = node.nodeType;
    this.tagName = node.tagName;
    var text = (this.nodeType == node.TEXT_NODE);
    this.children = [];

    if(text) {
        var text = node.textContent.trim();
        if(text.length > 0) {
            var range = node.ownerDocument.createRange();
            range.selectNodeContents(node);
            for(var current = 0, end = range.endOffset; current < end; current++) {
                range.setStart(node, current);
                range.setEnd(node, current + 1);
                var rect = range.getBoundingClientRect();
                if(rect.width > 0 && rect.height > 0) {
                    var child = new TextDOM(range.toString(), rect, depth + 1);
                    this.children.push(child);
                }
            }
            range.detach();
        }
    } else {
        var nodes = node.childNodes;
        for(var i = 0, n = nodes.length; i < n; i++) {
            this.children.push(new DOM(nodes[i], depth + 1));
        }
    }

}

DOM.prototype = {
    hasTranform: false,
    setTransform: function(rect) {
        if(rect.width <= 0 || rect.height <= 0) {
            return false;
        }
        this.rect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        };
        return this.hasTranform = true;
    },
    getSize: function(size) {
        if(this.hasTranform) {
            size.width = Math.max(size.width, this.rect.left + this.rect.width);
            size.height = Math.max(size.height, this.rect.top + this.rect.height);
        }
        this.children.forEach(function(child) {
            child.getSize(size);
        });
    }
};

// document.addEventListener("DOMContentLoaded", function(evt) {
window.addEventListener("load", function(evt) {
    var root = new DOM(document.body, 0);
    var body = document.body, html = document.documentElement;
    var width = Math.max(
        body.scrollWidth, 
        body.offsetWidth, 
        body.clientWidth, 

        html.scrollWidth, 
        html.clientWidth, 
        html.offsetWidth
    );

    var height = Math.max(
        body.scrollHeight, 
        body.clientHeight, 
        body.offsetHeight, 

        html.scrollHeight, 
        html.clientHeight, 
        html.offsetHeight
    );

    var size = {
        width: width,
        height: height
    };
    // root.getSize(size);

    var ipc = require("electron").ipcRenderer;
    ipc.sendToHost("analyse", {
        root: root,
        size: size
    });
});

