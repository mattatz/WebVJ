
import TextStage from "./stages/TextStage.js";
import TownStage from "./stages/TownStage.js";

const resolution = {
    width: 1024,
    height: 768
};

let bpm = 75;

export default class VJ {

    constructor(index) {
        this.clock = new THREE.Clock()

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        var container = this.createContainer();
        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        document.addEventListener("keydown", (e) => {
            this.input(e.keyCode);
        });

        window.addEventListener("resize", (e) => {
            this.resize();
        });

        this.stages = [
            TextStage,
            TownStage,
        ];
        this.stage = new this.stages[index](this, resolution);

        var loop = (time) => {
            this.loop(time);
            requestAnimationFrame(loop);
        };

        this.resize();
        requestAnimationFrame(loop);

        this.tempo(bpm);
    }

    next(index) {
        if(this.stage) {
            this.stage.destroy();
        }

        index = Math.max(index % this.stages.length, 0);
        this.stage = new this.stages[index](this, resolution);
        this.resize();
    }

    tempo(bpm) {
        if(this.bangInterval) {
            clearInterval(this.bangInterval);
        }

        var duration = 60 / bpm;
        var beat = 0;
        this.bangInterval = setInterval(() => {
            this.bang(duration, beat);
            beat = (beat + 1) % 4;
        }, duration * 1000);
    }

    bang(duration, beat = 0) {
        if(this.stage) {
            this.stage.bang(duration, beat);
        }
    }

    input(keyCode) {
        if(this.stage) {
            this.stage.input(keyCode);
        }
    }

    setBackground(color, transparent) {
        this.renderer.setClearColor(color, transparent ? 0 : 1);
    }

    createContainer() {
        var container = document.createElement("div");
        container.id = "webvj--container";
        document.body.appendChild(container);
        return container;
    }

    loop(time) {
        var dt = this.clock.getDelta();
        if(this.stage) {
            this.stage.update(dt, this.clock.elapsedTime);
            this.stage.render(this.renderer);
        }
        TWEEN.update(time);
    }

    resize () {
        var w = window.innerWidth, h = window.innerHeight;
        this.stage.resize(w, h);
        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
        this.renderer.setSize(w, h);
    }

}

new VJ(1);

