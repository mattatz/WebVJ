
import Page from "../objects/Page";

export default class Stage {

    constructor(vj, resolution) {
        this.scene = new THREE.Scene();
        this.renderer = vj.renderer;
        this.resolution = resolution;

        this.effects = {};

        this.indicator = document.getElementById("webvj--indicator");
        this.gui = new dat.GUI();

        /*
        this.gui.add({
            stage: -1
        }, "stage", {
            "text": 0,
            "town": 1,
        }).onChange((index) => {
            vj.next(index);
        });
        */
    }

    init() {
    }

    update(dt, t) {
    }

    destroy() {
        if(this.gui) {
            this.gui.destroy();
        }
    }

    bang(duration, beat) {
    }

    input(keyCode) {
        switch (keyCode) {
        }
    }

    updateUniform(uniforms, prop, v, duration = 800) {
        if(!uniforms[prop]) return;

        var from = uniforms[prop].value;
        var to = v;
        new TWEEN.Tween({
            t: from
        })
        .to({
            t: to
        }, 800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            uniforms[prop].value = this.t;
        })
        .onComplete(() => {
            uniforms[prop].value = to;
        })
        .start();
    }

    updateProp(obj, prop, v, duration = 800) {
        var from = obj[prop];
        var to = v;

        new TWEEN.Tween({
            t: from
        })
        .to({
            t: to
        }, 800)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            obj[prop] = this.t;
        })
        .onComplete(() => {
            obj[prop] = to;
        })
        .start();
    }

    addPostEffect(name, pass) {
        this.effects[name] = pass;

        var folder = this.gui.addFolder(name);
        var uniforms = pass.material.uniforms;
        for(var key in uniforms) {
            var uniform = uniforms[key];
            if(uniform.type == "f") {
                folder.add(uniform, "value", 0.0, 1.0).name(key).onChange(() => {
                });
            }
        }
    }

    render(renderer) {
    }

    resize(w, h) {
    }

    load(path) {
        return new Promise((resolve, reject) => {
            this.loadJSON(path + ".json").then((json) => {
                var loader = new THREE.TextureLoader();
                loader.load(path + ".png", (texture) => {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    resolve(new Page(texture, json.size, json.root));
                });
            });
        });
    }

    loadJSON(path) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", path, true);
            xhr.onreadystatechange = function() {
                var status;
                var data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } else {
                        reject(status);
                    }
                }
            };
            xhr.send();
        });
    }

    hideIndicator() {
        this.indicator.style.display = "none";
    }

}
