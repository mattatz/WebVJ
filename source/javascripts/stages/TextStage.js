
import Stage from "./Stage.js";

import DOM from "../objects/DOM";

import FluidSimulation from "../effects/FluidSimulation"
import LifetimeSystem from "../effects/LifetimeSystem"
import Noise from "../effects/Noise"
import CombinePass from "../effects/CombinePass"
import TransitionPass from "../effects/TransitionPass"

import DOMMesh from "../meshes/DOMMesh";
import BoundingBoxLine from "../meshes/BoundingBoxLine";

import TextParticle from "../objects/TextParticle";

import MathUtil from "../utils/MathUtil"

export default class TextStage extends Stage {

    constructor(vj, resolution) {
        super(vj, resolution);

        this.modes = {
        };
        this.addModes(this.modes);

        this.simulation = new FluidSimulation(this.renderer, 256);

        this.lifetime = new LifetimeSystem(this.renderer, Math.pow(512, 2));

        var fluidFolder = this.gui.addFolder("Fluid");
        fluidFolder.add(this.simulation.advect.uniforms.point.value, "x", 0.0, 1.0);
        fluidFolder.add(this.simulation.advect.uniforms.point.value, "y", 0.0, 1.0);
        fluidFolder.add(this.simulation.advect.uniforms.force, "value", 0.0, 300.0).name("force");

        this.noise = new Noise(new THREE.Vector2(0.004, 0.004), 0.0, 1.0);
        var noiseFolder = this.gui.addFolder("Noise");
        noiseFolder.add(this.noise, "speed", 0.0, 10.0);
        noiseFolder.add(this.noise, "intensity", 0.0, 5.0);
        noiseFolder.add(this.noise.scale, "x", 0.0, 0.1).name("scale.x");
        noiseFolder.add(this.noise.scale, "y", 0.0, 0.1).name("scale.y");

        this.container = new THREE.Object3D();
        var s = window.innerWidth / resolution.width;
        this.container.scale.set(s, s, s);
        this.scene.add(this.container);

        this.initComposer();

        this.rectangles = [];
        this.pages = [];
        this.page = null;

        const pathes = [
            "../dist/captures/wikipedia-en",
            "../dist/captures/amazon",
            "../dist/captures/ヤフオク",
            "../dist/captures/走れメロス", // 文字だけのページ　短めのやつ
            "../dist/captures/foursquare",
        ];

        Promise.all(pathes.map((path) => {
            return this.load(path);
        })).then((pages) => {
            this.pages = pages;
            this.gui.add({
                page: function() {
                }
            }, "page", this.pages.map((page, i) => {
                return i;
            })).onChange((index) => {
                var page = this.pages[index];
                this.init(page);
            });
            this.init(this.pages[0]);
        });

    }

    initComposer() {
        var w = window.innerWidth, h = window.innerHeight;
        this.camera = new THREE.OrthographicCamera(0, w, 0, h, 1, 2200);
        this.camera.position.z = 1000;

        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.setSize(w, h);

        var kernel = require("../../shaders/posteffects/kernel.vert");

        this.combine = new CombinePass(this.renderer, this.scene, this.camera);

        var grayscale = new THREE.ShaderPass({
            uniforms: {
                "tDiffuse": { type: "t", value: null },
                "t": { type: "f", value: 0.0 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/grayscale.frag")
        });

        var negative = new THREE.ShaderPass({
            uniforms: {
                "tDiffuse": { type: "t", value: null },
                "t": { type: "f", value: 0.0 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/negative.frag")
        });

        this.bloom = new THREE.BloomBlendPass(3.0, 0.0);
        this.transition = new TransitionPass(this.renderer);

        this.composer.addPass(this.combine);
        this.composer.addPass(grayscale);
        this.composer.addPass(negative);
        this.composer.addPass(this.bloom);
        this.composer.addPass(this.transition);

        // render last pass to screen
        var passes = this.composer.passes;
        passes[passes.length - 1].renderToScreen = true;

        this.addPostEffect("grayscale", grayscale);
        this.addPostEffect("negative", negative);

        var bloomFolder = this.gui.addFolder("bloom");
        bloomFolder.add(this.bloom, "amount", 0.0, 5.0)
        bloomFolder.add(this.bloom, "opacity", 0.0, 1.0)

        var cameraFolder = this.gui.addFolder("Camera");
        cameraFolder.add(this.combine, "speed", 1.0, 10.0);
        cameraFolder.add(this.combine.material.uniforms.zoom.value, "x", 1.0, 2.0);
        cameraFolder.add(this.combine.material.uniforms.zoom.value, "y", -1.0, 1.0);
        cameraFolder.add(this.combine.material.uniforms.zoom.value, "z", -1.0, 1.0);
    }

    init(page) {
        if(this.page != null) {
            this.transition.snapshot();
            this.composer.render();
        }

        this.page = page;

        page.buildHierarchy();

        var nodes = [];
        page.root.traverse((node) => {
            if(!node.hasTranform) return;
            nodes.push(node);
        });

        var unitSize = Math.ceil(page.size.width / 32);

        if(!this.line) {
            this.line = new BoundingBoxLine(nodes, page.size.width, page.size.height, unitSize, this.lifetime.sideCount);
            this.line.material.uniforms.alpha.value = 0;
            this.line.material.uniforms.textureLifetime.value = this.lifetime.texture;
            this.line.position.z = 100;
            this.container.add(this.line);

            var lineFolder = this.gui.addFolder("Line");
            lineFolder.add(this.line, "show");
            lineFolder.add(this.line, "hide");
            lineFolder.add(this.line, "move");
        } else {
            this.line.init(nodes, page.size.width, page.size.height, unitSize, this.lifetime.sideCount);
        }

        if(!this.dom) {
            this.dom = new DOMMesh(nodes, page.size.width, page.size.height, unitSize, 1);
            this.dom.material.uniforms.texturePressure.value = this.simulation.pressure;
            this.dom.material.uniforms.textureVelocity.value = this.simulation.velocity;
            this.container.add(this.dom);

            var domFolder = this.gui.addFolder("DOM");
            domFolder.add(this.dom, "mode", this.dom.modes);
            domFolder.add(this.dom, "html");
            domFolder.add(this.dom, "light");

            this.dom.onNextT = (mode) => {
                this.line.next = mode;
                this.line.nextT(this.dom.durationT);
            };
            domFolder.add(this.dom, "durationT", 200, 1000).name("duration t");

        } else {
            this.dom.init(nodes, page.size.width, page.size.height, unitSize, 1);
        }

        this.dom.material.uniforms.capture.value = page.texture;

        if(!this.particle) {
            this.particle = new TextParticle(this.renderer, page);
            this.particle.position.z = 200;
            this.container.add(this.particle);

            this.gui.add(this.particle, "throttle", 0.0, 1.0);
        } else {
            this.particle.init(page);
        }

        this.transition.transit();
    }

    zoom(scale) {
        this.combine.scroll(MathUtil.randomRange(0, 200), this.page.size.height);

        this.combine.material.uniforms.zoom.value.x = scale;
        this.combine.material.uniforms.zoom.value.y = MathUtil.randomRange(-1, 1);
        this.combine.material.uniforms.zoom.value.z = MathUtil.randomRange(-1, 1);
    }

    update(dt, t) {

        if(this.simulation) {
            this.simulation.update(dt, t);
        }

        if(this.particle) {
            this.particle.update(dt, t);
        }

        if(this.line && this.line.visible && this.lifetime) {
            this.lifetime.update(dt, t);
        }

        if(this.noise) {
            this.noise.update(dt, t);

            if(this.dom) {
                this.dom.noise(this.noise);
            }

            if(this.text) {
                this.text.noise(this.noise);
            }

            if(this.rectangles) {
                this.rectangles.forEach((rectangle) => {
                    rectangle.noise(this.noise);
                });
            }

            if(this.line) {
                this.line.noise(this.noise);
            }
        }

        if(this.combine && this.page) {
            this.combine.scroll(dt * 5, this.page.size.height);
        }

    }

    osc(address, data) {
        super.osc(address, data);

        switch(address) {

            case "/posteffect":
                switch(data[0]) {
                    case "bloom":
                        this.updateProp(this.bloom, data[1], data[2], 3000);
                        break;
                }
                break;

            case "/scene/text/page":
                var page = this.pages[data[0]];
                if(page && this.page != page) {
                    this.init(page);
                }
                break;

            case "/scene/text/camera":

                if(data[0] == "zoom") {
                    this.zoom(data[1]);
                } else if(data[0] == "speed") {
                    this.combine.speed = data[1];
                }

                break;

            case "/scene/text/dom":
                if(this.dom) {
                    this.dom.osc(data);
                }
                break;

            case "/scene/text/line":
                if(this.line) {
                    this.line.osc(data);
                }
                break;

            case "/scene/text/noise":
                if(this.noise) {
                    this.noise.osc(data);
                }
                break;

            case "/scene/text/fluid":
                if(this.simulation) {
                    this.simulation.osc(data);
                }
                break;

            case "/scene/text/particle/throttle":
                if(this.particle) {
                    this.particle.throttle = data[0];
                }
                break;

            case "/audio/fft/8":
                if(data[1] > 0.2) {
                    var x = Math.random();
                    var y = Math.random();
                    this.simulation.bang(x, y, 0.1, data[1] * 500);
                }

                break;
        }
    }

    destroy() {
        super.destroy();

        this.lifetime.dispose();

        this.simulation.dispose();

        this.composer.renderTarget1.dispose();
        this.composer.renderTarget2.dispose();

        this.combine.dispose();
        this.transition.dispose();
    }

    bang(duration, beat) {

        if(this.simulation && this.simulation.sync) {
            var x = Math.random();
            var y = Math.random();
            this.simulation.bang(x, y, 0.1, Math.random() * 200 + 200);
        }

        if(this.noise && this.noise.sync && (beat % 2 == 0)) {
            this.noise.bang(duration * 1000 * 0.75);
        }

    }

    render(renderer) {
        if(this.composer) {
            this.composer.render();
        }
    }

    resize(w, h) {
        super.resize(w, h)

        if(this.camera) {
            this.camera.right = w;
            this.camera.bottom = h;
            this.camera.updateProjectionMatrix();
        }

        if(this.container) {
            var s = w / this.resolution.width;
            this.container.scale.set(s, s, s);
        }

        if(this.composer) {
            this.composer.setSize(w, h);
        }
    }

}
