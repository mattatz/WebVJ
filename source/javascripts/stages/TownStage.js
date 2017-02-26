
import Stage from "./Stage.js";

import DOM from "../objects/DOM";
import Building from "../objects/Building"
import BuildingControl from "../objects/BuildingControl"
import PolarCoordinate from "../objects/PolarCoordinate";
import Grid from "../objects/Grid";
import DOMBoxParticle from "../objects/DOMBoxParticle";

import GridLine from "../meshes/GridLine";
import FluidSimulation from "../effects/FluidSimulation"

import MathUtil from "../utils/MathUtil"

export default class TownStage extends Stage {

    constructor(vj, resolution) {
        super(vj, resolution);

        this.towns = [];

        var t0 = MathUtil.randomRange(0, Math.PI * 0.5);
        var t1 = MathUtil.randomRange(0, Math.PI * 2.0);
        this.polar = new PolarCoordinate(t0, t1, 2500);

        var folder = this.gui.addFolder("camera");
        folder.add(this, "randomize");
        folder.add(this, "overlook");
        folder.add(this.polar, "radius", 100, 8000).name("distance");
        folder.add(this.polar, "theta0", 0, Math.PI * 0.5).name("θ");
        folder.add(this.polar, "theta1", 0, Math.PI * 2).name("θ'");

        const pathes = [
            "../dist/captures/wikipedia-jp",
            "../dist/captures/github",
            "../dist/captures/amazon",
            "../dist/captures/ヤフオク",
            "../dist/captures/yoppa",
            "../dist/captures/foursquare",
        ];

        Promise.all(pathes.map((path) => {
            return this.load(path);
        })).then((pages) => {
            this.createScene(window.innerWidth, window.innerHeight);
            this.init(pages);
        });

    }

    init(pages) {
        this.selected = 0;
        this.pages = pages;
        this.pages.forEach((page) => {
            page.buildHierarchy();
        });

        this.container = new THREE.Object3D();
        this.container.position.z -= 500;
        this.scene.add(this.container);

        this.gridLine = new GridLine(80, 80);
        this.gridLine.scale.set(8000, 8000, 5);
        this.gridLine.renderOrder = -1; // must be rendered at first
        this.container.add(this.gridLine);

        this.grid = new Grid(this.renderer);
        this.grid.page = this.page;
        this.container.add(this.grid);

        var gridFolder = this.gui.addFolder("grid");
        gridFolder.add(this.grid, "noise");
        gridFolder.add(this.grid, "circle");

        this.simulation = new FluidSimulation(this.renderer, 256);
        this.simulation.active = false;

        this.gridLine.material.uniforms.texturePressure.value = this.simulation.pressure;
        this.gridLine.material.uniforms.textureVelocity.value = this.simulation.velocity;

        this.control = new BuildingControl();
        this.container.add(this.control);

        var buildingFolder = this.gui.addFolder("building");
        buildingFolder .add({
            append: () => {
                this.control.append(this.page, Math.floor(MathUtil.randomRange(1, 4)));
            }
        }, "append");
        buildingFolder.add(this.control, "grow");
        buildingFolder.add(this.control, "destroy");
        buildingFolder.add(this.control, "noise");
        buildingFolder.add(this.control, "duration", 500, 4000);

        this.particle = new DOMBoxParticle(this.renderer, this.pages);
        this.container.add(this.particle);

        var particleFolder = this.gui.addFolder("particle");
        particleFolder.add(this.particle, "mode", [0, 1, 2, 3])
        particleFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "x", 0.0, 1000.0).name("sphere height");
        particleFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "y", 0.0, 1000.0).name("sphere size");
        particleFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "z", 0.0, 1500.0).name("sphere noise");
        particleFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "w", 0.0, 400.0).name("sphere intensity");
        particleFolder.add(this.particle, "randomize")
        particleFolder.add(this.particle, "throttle", 0.0, 1.0)
        particleFolder.add(this.particle.mesh.material.uniforms.scale, "value", 0.1, 1.0).name("scale");
    }

    activate(mode) {
        super.activate(mode);
    }

    deactivate(mode) {
        super.deactivate(mode);
    }

    create(texture, node, width, height) {
        var building = new Building(this.alpha, texture, node, width, height);
        var rotate = Math.random() < 0.5;
        var rotate2 = Math.random() < 0.5;
        if(!rotate) {
            // building.rotation.set(Math.PI, 0, 0);
            building.rotation.set(Math.PI, 0, rotate2 ? Math.PI : 0);
        } else {
            // building.rotation.set(Math.PI, 0, Math.PI * 0.5);
            building.rotation.set(Math.PI, 0, rotate2 ? Math.PI * 0.5 : Math.PI * 1.5);
            building.rect.rotate90();
        }

        this.container.add(building);

        return building;
    }

    update(dt, t) {

        if(this.controls) {
            this.controls.update(dt);
        } else if(this.camera) {
            this.turn(dt);
        }

        if(this.simulation) {
            this.simulation.update(dt, t);
        }

        if(this.system) {
            this.system.update(dt, t);
        }

        if(this.particle) {
            this.particle.update(dt, t);
        }

        if(this.control) {
            this.control.update(dt, t);
        }

        if(this.grid) {
            this.grid.update(dt, t);
        }

        if(this.composer) {
            this.rgbShift.uniforms.time.value = this.wave.uniforms.time.value = t;
        }

    }

    osc(address, data) {
        super.osc(address, data);

        switch(address) {

            case "/scene/town/page":
                var page = parseInt(data[0]);
                if(page >= 0) {
                    this.grid.page = this.pages[page];
                }
                this.selected = page;

                break;

            case "/scene/town/camera/randomize":
                this.randomize(data[0] == 1);
                break;

            case "/scene/town/camera/near":
                this.randomize(data[0] == 1, true, data[1] == 1);
                break;

            case "/scene/town/camera/overlook":
                this.overlook(data[0] == 1);
                break;

            case "/scene/town/building":
                this.control.osc(this.page, data);
                break;

            case "/scene/town/fluid":
                if(this.simulation) {
                    this.simulation.osc(data);
                }
                break;

            case "/scene/town/grid":
                if(this.grid) {
                    this.grid.osc(this.page, data);
                }
                break;

            case "/scene/town/particle":
                if(this.particle) {
                    this.particle.osc(this.page, data);
                }
                break;



        }
    }

    destroy() {
        super.destroy();

        if(this.container) {
            if(this.gridLine) {
                this.container.remove(this.gridLine);
            }
            if(this.control) {
                this.control.dispose();
                this.container.remove(this.control);
            }
            this.scene.remove(this.container);
        }

        if(this.simulation) {
            this.simulation.dispose();
        }

        if(this.composer) {
            this.composer.renderTarget1.dispose();
            this.composer.renderTarget2.dispose();
        }
    }

    bang(duration, beat = 0) {

        if(this.control) {
            if(this.control.syncAppend) this.control.append(this.page, Math.floor(MathUtil.randomRange(1, 4)));
            if(this.control.syncGrow) this.control.grow();
        }

        if(this.simulation && this.simulation.sync) {
            var circle = MathUtil.randomCircle(0.2, 0.4);
            this.simulation.bang(circle.x + 0.5, circle.y + 0.5, 0.1, Math.random() * 200 + 200);

            /*
            if(this.grid) {
                var r = Math.random();
                if(r > 0.5) {
                    this.grid.circle(circle.x + 0.5, circle.y + 0.5, 0.05);
                } else {
                    this.grid.wave(10, circle.x + 0.5, circle.y + 0.5, MathUtil.randomRange(-0.05, 0.05), MathUtil.randomRange(-0.05, 0.05), 0.025);
                }
            }
            */

        }

        if(this.grid && this.grid.sync) {
            this.grid.page = this.page;
            this.grid.noise(1.5, 1.5, 1.0);
            // this.grid.circle(1.0);
        }

    }

    randomize(tween = false, near = false, up = false) {
        var dt1 = (Math.random() - 0.5) * Math.PI * 2;

        if(
            (dt1 * this.polar.speed < 0)
        ) {
            this.polar.speed = - (this.polar.speed > 0 ? 1 : -1) * MathUtil.randomRange(0.1, 0.35);
        } else {
            this.polar.speed = (this.polar.speed > 0 ? 1 : -1) * MathUtil.randomRange(0.1, 0.35);
        }

        var t0 = up ? MathUtil.randomRange(MathUtil.HALF_PI * 0.75, MathUtil.HALF_PI) : MathUtil.randomRange(0, MathUtil.HALF_PI);
        var t1 = this.polar.theta1 + dt1;
        var radius = near ? MathUtil.randomRange(500, 800) : MathUtil.randomRange(550, 4500);

        if(tween) {
            this.polar.tween(t0, t1, radius, Math.random() * 500 + 500);
        } else {
            this.polar.theta0 = t0;
            this.polar.theta1 = t1;
            this.polar.radius = radius;
        }
    }

    overlook(tween = false) {
        var dt1 = (Math.random() - 0.5) * MathUtil.TWO_PI;

        if(
            (dt1 * this.polar.speed < 0)
        ) {
            this.polar.speed *= -1;
        }

        var t0 = MathUtil.HALF_PI;
        var t1 = this.polar.theta1 + dt1;
        var radius = 8000;

        if(tween) {
            this.polar.tween(t0, t1, radius, 800);
        } else {
            this.polar.theta0 = t0;
            this.polar.theta1 = t1;
            this.polar.radius = radius;
        }
    }

    turn(dt) {
        this.polar.forward(dt);

        var v = this.polar.cartesian;
        this.camera.position.set(v.x, v.z, v.y);
        this.camera.up.set(0, 0, 1);
        this.camera.lookAt(new THREE.Vector3());
    }

    render(renderer) {
        if(this.composer) {
            this.composer.render();
        }
    }

    createScene(w, h) {
        this.renderer.setClearColor(new THREE.Color("rgb(232, 232, 232)"));

        this.camera = new THREE.PerspectiveCamera(45, w / h, 1.0, 20000);
        this.camera.position.z = 1500;

        // this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);

        this.composer = new THREE.EffectComposer(this.renderer);

        var rpass = new THREE.RenderPass(this.scene, this.camera);
        var smaa = new THREE.SMAAPass(w, h);

        var kernel = require("../../shaders/posteffects/kernel.vert");

        var vignette = new THREE.ShaderPass({
            uniforms: {
                tDiffuse: { type: "t", value: null },
                offset:   { type: "f", value: 0.75 },
                darkness: { type: "f", value: 1.0 }
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/vignette.frag")
        });

        var negative = new THREE.ShaderPass({
            uniforms: {
                "tDiffuse": { type: "t", value: null },
                "t": { type: "f", value: 0.0 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/negative.frag")
        });

        var loader = new THREE.TextureLoader();

        this.rgbShift = new THREE.ShaderPass({
            uniforms: {
                tDiffuse: { type: "t", value: null },
                tNoise: { type: "t", value: null },
                t: { type: "f", value: 0.0 },
                amplitude: { type: "f", value: 0.2 },
                time: { type: "f", value: 0.0 },
                speed: { type: "f", value: 0.02 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/rgbshift.frag")
        });

        loader.load("../dist/textures/random.png", (texture) => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            this.rgbShift.uniforms.tNoise.value = texture;
        });

        var tiltshift = new THREE.ShaderPass({
            uniforms: {
                tDiffuse: { type: "t", value: null },
                blurAmount: { type: "f", value: 1.0 },
                center: { type: "f", value: 1.0 },
                stepSize: { type: "f", value: 0.005 },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/tiltshift.frag")
        });

        this.wave = new THREE.ShaderPass({
            uniforms: {
                tDiffuse: { type: "t", value: null },
                time: { type: "f", value: 0.0 },
                t: { type: "f", value: 0.0 },
                intensity: { type: "f", value: 0.01 },
                border: { type: "f", value: 0.1 },
                scale: { type: "v2", value: new THREE.Vector2(1.5, 1.5) },
            },
            vertexShader: kernel,
            fragmentShader: require("../../shaders/posteffects/wave.frag")
        });

        this.composer.addPass(rpass);
        this.composer.addPass(smaa);
        this.composer.addPass(vignette);
        this.composer.addPass(negative);
        this.composer.addPass(this.rgbShift);
        this.composer.addPass(tiltshift);
        this.composer.addPass(this.wave);

        var passes = this.composer.passes;
        passes[passes.length - 1].renderToScreen = true;

        this.composer.setSize(w, h);

        this.addPostEffect("vignette", vignette);
        this.addPostEffect("negative", negative);
        this.addPostEffect("tiltshift", tiltshift);
        this.addPostEffect("rgbshift", this.rgbShift);
        this.addPostEffect("wave", this.wave);
    }

    get page() {
        if(this.selected < 0) {
            return this.pages[Math.floor(Math.random() * this.pages.length)];
        }
        return this.pages[this.selected];
    }

    resize(w, h) {
        super.resize(w, h)

        if(this.camera) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        }

        if(this.composer) {
            this.composer.setSize(w, h);
        }
    }

}
