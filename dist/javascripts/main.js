/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TextStage = __webpack_require__(1);

	var _TextStage2 = _interopRequireDefault(_TextStage);

	var _TownStage = __webpack_require__(40);

	var _TownStage2 = _interopRequireDefault(_TownStage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var resolution = {
	    width: 1024,
	    height: 768
	};

	var bpm = 75;

	var VJ = function () {
	    function VJ(index) {
	        var _this = this;

	        _classCallCheck(this, VJ);

	        this.clock = new THREE.Clock();

	        this.renderer = new THREE.WebGLRenderer({
	            alpha: true,
	            antialias: true
	        });
	        var container = this.createContainer();
	        this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	        this.renderer.setSize(window.innerWidth, window.innerHeight);
	        container.appendChild(this.renderer.domElement);

	        document.addEventListener("keydown", function (e) {
	            _this.input(e.keyCode);
	        });

	        window.addEventListener("resize", function (e) {
	            _this.resize();
	        });

	        this.stages = [_TextStage2.default, _TownStage2.default];
	        this.stage = new this.stages[index](this, resolution);

	        var loop = function loop(time) {
	            _this.loop(time);
	            requestAnimationFrame(loop);
	        };

	        this.resize();
	        requestAnimationFrame(loop);

	        this.tempo(bpm);
	    }

	    _createClass(VJ, [{
	        key: "next",
	        value: function next(index) {
	            if (this.stage) {
	                this.stage.destroy();
	            }

	            index = Math.max(index % this.stages.length, 0);
	            this.stage = new this.stages[index](this, resolution);
	            this.resize();
	        }
	    }, {
	        key: "tempo",
	        value: function tempo(bpm) {
	            var _this2 = this;

	            if (this.bangInterval) {
	                clearInterval(this.bangInterval);
	            }

	            var duration = 60 / bpm;
	            var beat = 0;
	            this.bangInterval = setInterval(function () {
	                _this2.bang(duration, beat);
	                beat = (beat + 1) % 4;
	            }, duration * 1000);
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration) {
	            var beat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	            if (this.stage) {
	                this.stage.bang(duration, beat);
	            }
	        }
	    }, {
	        key: "input",
	        value: function input(keyCode) {
	            if (this.stage) {
	                this.stage.input(keyCode);
	            }
	        }
	    }, {
	        key: "setBackground",
	        value: function setBackground(color, transparent) {
	            this.renderer.setClearColor(color, transparent ? 0 : 1);
	        }
	    }, {
	        key: "createContainer",
	        value: function createContainer() {
	            var container = document.createElement("div");
	            container.id = "webvj--container";
	            document.body.appendChild(container);
	            return container;
	        }
	    }, {
	        key: "loop",
	        value: function loop(time) {
	            var dt = this.clock.getDelta();
	            if (this.stage) {
	                this.stage.update(dt, this.clock.elapsedTime);
	                this.stage.render(this.renderer);
	            }
	            TWEEN.update(time);
	        }
	    }, {
	        key: "resize",
	        value: function resize() {
	            var w = window.innerWidth,
	                h = window.innerHeight;
	            this.stage.resize(w, h);
	            this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	            this.renderer.setSize(w, h);
	        }
	    }]);

	    return VJ;
	}();

	exports.default = VJ;


	new VJ(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Stage2 = __webpack_require__(2);

	var _Stage3 = _interopRequireDefault(_Stage2);

	var _DOM = __webpack_require__(4);

	var _DOM2 = _interopRequireDefault(_DOM);

	var _FluidSimulation = __webpack_require__(5);

	var _FluidSimulation2 = _interopRequireDefault(_FluidSimulation);

	var _LifetimeSystem = __webpack_require__(12);

	var _LifetimeSystem2 = _interopRequireDefault(_LifetimeSystem);

	var _Noise = __webpack_require__(15);

	var _Noise2 = _interopRequireDefault(_Noise);

	var _CombinePass = __webpack_require__(16);

	var _CombinePass2 = _interopRequireDefault(_CombinePass);

	var _TransitionPass = __webpack_require__(19);

	var _TransitionPass2 = _interopRequireDefault(_TransitionPass);

	var _DOMMesh = __webpack_require__(23);

	var _DOMMesh2 = _interopRequireDefault(_DOMMesh);

	var _BoundingBoxLine = __webpack_require__(26);

	var _BoundingBoxLine2 = _interopRequireDefault(_BoundingBoxLine);

	var _TextParticle = __webpack_require__(29);

	var _TextParticle2 = _interopRequireDefault(_TextParticle);

	var _MathUtil = __webpack_require__(37);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextStage = function (_Stage) {
	    _inherits(TextStage, _Stage);

	    function TextStage(vj, resolution) {
	        _classCallCheck(this, TextStage);

	        var _this = _possibleConstructorReturn(this, (TextStage.__proto__ || Object.getPrototypeOf(TextStage)).call(this, vj, resolution));

	        _this.modes = {};
	        _this.addModes(_this.modes);

	        _this.simulation = new _FluidSimulation2.default(_this.renderer, 256);

	        _this.lifetime = new _LifetimeSystem2.default(_this.renderer, Math.pow(512, 2));

	        var fluidFolder = _this.gui.addFolder("Fluid");
	        fluidFolder.add(_this.simulation.advect.uniforms.point.value, "x", 0.0, 1.0);
	        fluidFolder.add(_this.simulation.advect.uniforms.point.value, "y", 0.0, 1.0);
	        fluidFolder.add(_this.simulation.advect.uniforms.force, "value", 0.0, 300.0).name("force");

	        _this.noise = new _Noise2.default(new THREE.Vector2(0.004, 0.004), 0.0, 1.0);
	        var noiseFolder = _this.gui.addFolder("Noise");
	        noiseFolder.add(_this.noise, "speed", 0.0, 10.0);
	        noiseFolder.add(_this.noise, "intensity", 0.0, 5.0);
	        noiseFolder.add(_this.noise.scale, "x", 0.0, 0.1).name("scale.x");
	        noiseFolder.add(_this.noise.scale, "y", 0.0, 0.1).name("scale.y");

	        _this.container = new THREE.Object3D();
	        var s = window.innerWidth / resolution.width;
	        _this.container.scale.set(s, s, s);
	        _this.scene.add(_this.container);

	        _this.initComposer();

	        _this.rectangles = [];
	        _this.pages = [];
	        _this.page = null;

	        var pathes = ["../dist/captures/wikipedia-en", "../dist/captures/amazon", "../dist/captures/ヤフオク", "../dist/captures/走れメロス", // 文字だけのページ　短めのやつ
	        "../dist/captures/foursquare"];

	        Promise.all(pathes.map(function (path) {
	            return _this.load(path);
	        })).then(function (pages) {
	            _this.pages = pages;
	            _this.gui.add({
	                page: function page() {}
	            }, "page", _this.pages.map(function (page, i) {
	                return i;
	            })).onChange(function (index) {
	                var page = _this.pages[index];
	                _this.init(page);
	            });
	            _this.init(_this.pages[0]);
	        });

	        return _this;
	    }

	    _createClass(TextStage, [{
	        key: "initComposer",
	        value: function initComposer() {
	            var w = window.innerWidth,
	                h = window.innerHeight;
	            this.camera = new THREE.OrthographicCamera(0, w, 0, h, 1, 2200);
	            this.camera.position.z = 1000;

	            this.composer = new THREE.EffectComposer(this.renderer);
	            this.composer.setSize(w, h);

	            var kernel = __webpack_require__(20);

	            this.combine = new _CombinePass2.default(this.renderer, this.scene, this.camera);

	            var grayscale = new THREE.ShaderPass({
	                uniforms: {
	                    "tDiffuse": { type: "t", value: null },
	                    "t": { type: "f", value: 0.0 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(38)
	            });

	            var negative = new THREE.ShaderPass({
	                uniforms: {
	                    "tDiffuse": { type: "t", value: null },
	                    "t": { type: "f", value: 0.0 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(39)
	            });

	            this.bloom = new THREE.BloomBlendPass(3.0, 0.0);
	            this.transition = new _TransitionPass2.default(this.renderer);

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
	            bloomFolder.add(this.bloom, "amount", 0.0, 5.0);
	            bloomFolder.add(this.bloom, "opacity", 0.0, 1.0);

	            var cameraFolder = this.gui.addFolder("Camera");
	            cameraFolder.add(this.combine, "speed", 1.0, 10.0);
	            cameraFolder.add(this.combine.material.uniforms.zoom.value, "x", 1.0, 2.0);
	            cameraFolder.add(this.combine.material.uniforms.zoom.value, "y", -1.0, 1.0);
	            cameraFolder.add(this.combine.material.uniforms.zoom.value, "z", -1.0, 1.0);
	        }
	    }, {
	        key: "init",
	        value: function init(page) {
	            var _this2 = this;

	            if (this.page != null) {
	                this.transition.snapshot();
	                this.composer.render();
	            }

	            this.page = page;

	            page.buildHierarchy();

	            var nodes = [];
	            page.root.traverse(function (node) {
	                if (!node.hasTranform) return;
	                nodes.push(node);
	            });

	            var unitSize = Math.ceil(page.size.width / 32);

	            if (!this.line) {
	                this.line = new _BoundingBoxLine2.default(nodes, page.size.width, page.size.height, unitSize, this.lifetime.sideCount);
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

	            if (!this.dom) {
	                this.dom = new _DOMMesh2.default(nodes, page.size.width, page.size.height, unitSize, 1);
	                this.dom.material.uniforms.texturePressure.value = this.simulation.pressure;
	                this.dom.material.uniforms.textureVelocity.value = this.simulation.velocity;
	                this.container.add(this.dom);

	                var domFolder = this.gui.addFolder("DOM");
	                domFolder.add(this.dom, "mode", this.dom.modes);
	                domFolder.add(this.dom, "html");
	                domFolder.add(this.dom, "light");

	                this.dom.onNextT = function (mode) {
	                    _this2.line.next = mode;
	                    _this2.line.nextT(_this2.dom.durationT);
	                };
	                domFolder.add(this.dom, "durationT", 200, 1000).name("duration t");
	            } else {
	                this.dom.init(nodes, page.size.width, page.size.height, unitSize, 1);
	            }

	            this.dom.material.uniforms.capture.value = page.texture;

	            if (!this.particle) {
	                this.particle = new _TextParticle2.default(this.renderer, page);
	                this.particle.position.z = 200;
	                this.container.add(this.particle);

	                this.gui.add(this.particle, "throttle", 0.0, 1.0);
	            } else {
	                this.particle.init(page);
	            }

	            this.transition.transit();
	        }
	    }, {
	        key: "zoom",
	        value: function zoom(scale) {
	            this.combine.scroll(_MathUtil2.default.randomRange(0, 200), this.page.size.height);

	            this.combine.material.uniforms.zoom.value.x = scale;
	            this.combine.material.uniforms.zoom.value.y = _MathUtil2.default.randomRange(-1, 1);
	            this.combine.material.uniforms.zoom.value.z = _MathUtil2.default.randomRange(-1, 1);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            var _this3 = this;

	            if (this.simulation) {
	                this.simulation.update(dt, t);
	            }

	            if (this.particle) {
	                this.particle.update(dt, t);
	            }

	            if (this.line && this.line.visible && this.lifetime) {
	                this.lifetime.update(dt, t);
	            }

	            if (this.noise) {
	                this.noise.update(dt, t);

	                if (this.dom) {
	                    this.dom.noise(this.noise);
	                }

	                if (this.text) {
	                    this.text.noise(this.noise);
	                }

	                if (this.rectangles) {
	                    this.rectangles.forEach(function (rectangle) {
	                        rectangle.noise(_this3.noise);
	                    });
	                }

	                if (this.line) {
	                    this.line.noise(this.noise);
	                }
	            }

	            if (this.combine && this.page) {
	                this.combine.scroll(dt * 5, this.page.size.height);
	            }
	        }
	    }, {
	        key: "osc",
	        value: function osc(address, data) {
	            _get(TextStage.prototype.__proto__ || Object.getPrototypeOf(TextStage.prototype), "osc", this).call(this, address, data);

	            switch (address) {

	                case "/posteffect":
	                    switch (data[0]) {
	                        case "bloom":
	                            this.updateProp(this.bloom, data[1], data[2], 3000);
	                            break;
	                    }
	                    break;

	                case "/scene/text/page":
	                    var page = this.pages[data[0]];
	                    if (page && this.page != page) {
	                        this.init(page);
	                    }
	                    break;

	                case "/scene/text/camera":

	                    if (data[0] == "zoom") {
	                        this.zoom(data[1]);
	                    } else if (data[0] == "speed") {
	                        this.combine.speed = data[1];
	                    }

	                    break;

	                case "/scene/text/dom":
	                    if (this.dom) {
	                        this.dom.osc(data);
	                    }
	                    break;

	                case "/scene/text/line":
	                    if (this.line) {
	                        this.line.osc(data);
	                    }
	                    break;

	                case "/scene/text/noise":
	                    if (this.noise) {
	                        this.noise.osc(data);
	                    }
	                    break;

	                case "/scene/text/fluid":
	                    if (this.simulation) {
	                        this.simulation.osc(data);
	                    }
	                    break;

	                case "/scene/text/particle/throttle":
	                    if (this.particle) {
	                        this.particle.throttle = data[0];
	                    }
	                    break;

	                case "/audio/fft/8":
	                    if (data[1] > 0.2) {
	                        var x = Math.random();
	                        var y = Math.random();
	                        this.simulation.bang(x, y, 0.1, data[1] * 500);
	                    }

	                    break;
	            }
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            _get(TextStage.prototype.__proto__ || Object.getPrototypeOf(TextStage.prototype), "destroy", this).call(this);

	            this.lifetime.dispose();

	            this.simulation.dispose();

	            this.composer.renderTarget1.dispose();
	            this.composer.renderTarget2.dispose();

	            this.combine.dispose();
	            this.transition.dispose();
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration, beat) {

	            if (this.simulation && this.simulation.sync) {
	                var x = Math.random();
	                var y = Math.random();
	                this.simulation.bang(x, y, 0.1, Math.random() * 200 + 200);
	            }

	            if (this.noise && this.noise.sync && beat % 2 == 0) {
	                this.noise.bang(duration * 1000 * 0.75);
	            }
	        }
	    }, {
	        key: "render",
	        value: function render(renderer) {
	            if (this.composer) {
	                this.composer.render();
	            }
	        }
	    }, {
	        key: "resize",
	        value: function resize(w, h) {
	            _get(TextStage.prototype.__proto__ || Object.getPrototypeOf(TextStage.prototype), "resize", this).call(this, w, h);

	            if (this.camera) {
	                this.camera.right = w;
	                this.camera.bottom = h;
	                this.camera.updateProjectionMatrix();
	            }

	            if (this.container) {
	                var s = w / this.resolution.width;
	                this.container.scale.set(s, s, s);
	            }

	            if (this.composer) {
	                this.composer.setSize(w, h);
	            }
	        }
	    }]);

	    return TextStage;
	}(_Stage3.default);

	exports.default = TextStage;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Page = __webpack_require__(3);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Stage = function () {
	    function Stage(vj, resolution) {
	        _classCallCheck(this, Stage);

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

	    _createClass(Stage, [{
	        key: "init",
	        value: function init() {}
	    }, {
	        key: "update",
	        value: function update(dt, t) {}
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            if (this.gui) {
	                this.gui.destroy();
	            }
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration, beat) {}
	    }, {
	        key: "input",
	        value: function input(keyCode) {
	            switch (keyCode) {}
	        }
	    }, {
	        key: "updateUniform",
	        value: function updateUniform(uniforms, prop, v) {
	            var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 800;

	            if (!uniforms[prop]) return;

	            var from = uniforms[prop].value;
	            var to = v;
	            new TWEEN.Tween({
	                t: from
	            }).to({
	                t: to
	            }, 800).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
	                uniforms[prop].value = this.t;
	            }).onComplete(function () {
	                uniforms[prop].value = to;
	            }).start();
	        }
	    }, {
	        key: "updateProp",
	        value: function updateProp(obj, prop, v) {
	            var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 800;

	            var from = obj[prop];
	            var to = v;

	            new TWEEN.Tween({
	                t: from
	            }).to({
	                t: to
	            }, 800).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
	                obj[prop] = this.t;
	            }).onComplete(function () {
	                obj[prop] = to;
	            }).start();
	        }
	    }, {
	        key: "addPostEffect",
	        value: function addPostEffect(name, pass) {
	            this.effects[name] = pass;

	            var folder = this.gui.addFolder(name);
	            var uniforms = pass.material.uniforms;
	            for (var key in uniforms) {
	                var uniform = uniforms[key];
	                if (uniform.type == "f") {
	                    folder.add(uniform, "value", 0.0, 1.0).name(key).onChange(function () {});
	                }
	            }
	        }
	    }, {
	        key: "render",
	        value: function render(renderer) {}
	    }, {
	        key: "resize",
	        value: function resize(w, h) {}
	    }, {
	        key: "load",
	        value: function load(path) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                _this.loadJSON(path + ".json").then(function (json) {
	                    var loader = new THREE.TextureLoader();
	                    loader.load(path + ".png", function (texture) {
	                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	                        resolve(new _Page2.default(texture, json.size, json.root));
	                    });
	                });
	            });
	        }
	    }, {
	        key: "loadJSON",
	        value: function loadJSON(path) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("GET", path, true);
	                xhr.onreadystatechange = function () {
	                    var status;
	                    var data;
	                    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
	                    if (xhr.readyState == 4) {
	                        // `DONE`
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
	    }, {
	        key: "hideIndicator",
	        value: function hideIndicator() {
	            this.indicator.style.display = "none";
	        }
	    }]);

	    return Stage;
	}();

	exports.default = Stage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DOM = __webpack_require__(4);

	var _DOM2 = _interopRequireDefault(_DOM);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Page = function () {
	    function Page(texture, size, root) {
	        _classCallCheck(this, Page);

	        this.texture = texture;
	        this.size = size;

	        // set whole size to root 
	        root.rect.width = size.width;
	        root.rect.height = size.height;
	        this.root = new _DOM2.default({ width: size.width, height: size.height }, root);

	        this.hierarchy = [];
	    }

	    _createClass(Page, [{
	        key: "buildHierarchy",
	        value: function buildHierarchy() {
	            if (this.hierarchy.length > 0) {
	                // already built.
	                return this.hierarchy;
	            }
	            this.root.getNodesWithDepth(this.hierarchy);
	            return this.hierarchy;
	        }
	    }]);

	    return Page;
	}();

	exports.default = Page;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	Array.prototype.flatten = function () {
	    return Array.prototype.concat.apply([], this);
	};

	var DOM = function () {
	    function DOM(screen, node) {
	        var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	        var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	        _classCallCheck(this, DOM);

	        this.depth = depth;

	        if (node.hasTranform) {
	            this.setTransform(screen, node);
	        }

	        this.text = node.text;
	        this.nodeType = node.nodeType;
	        this.tagName = node.tagName;

	        if (node.backgroundColor) {
	            this.backgroundColor = node.backgroundColor;
	        } else if (color) {
	            this.backgroundColor = color;
	        }

	        this.children = [];
	        var nodes = node.children;
	        if (nodes) {
	            for (var i = 0, n = nodes.length; i < n; i++) {
	                var child = new DOM(screen, nodes[i], depth + 1, this.backgroundColor);
	                this.children.push(child);
	            }
	        }
	        this.mesh = null;
	    }

	    _createClass(DOM, [{
	        key: "traverse",
	        value: function traverse(callback) {
	            callback(this);
	            this.children.forEach(function (child) {
	                child.traverse(callback);
	            });
	        }
	    }, {
	        key: "build",
	        value: function build(MeshConstructor) {
	            this.mesh = new MeshConstructor(this);
	            this.mesh.rotation.set(0, 0, 0);
	            this.mesh.position.set(this.x + this.width * 0.5, this.y + this.height * 0.5, 0);
	            this.mesh.scale.set(this.width, this.height, 1);
	            return this.mesh;
	        }
	    }, {
	        key: "getNodesWithSize",
	        value: function getNodesWithSize(size) {
	            if (!this.hasTranform) {
	                return [];
	            }

	            if (this.width < size || this.height < size) {
	                return [this];
	            } else {
	                var nodes = this.children.map(function (child) {
	                    return child.getNodesWithSize(size);
	                }).flatten();
	                return nodes;
	            }
	        }
	    }, {
	        key: "getNodesWithDepth",
	        value: function getNodesWithDepth(result) {
	            if (!result[this.depth]) {
	                result[this.depth] = [];
	            }
	            if (this.hasTranform) {
	                result[this.depth].push(this);
	            }
	            this.children.forEach(function (child) {
	                return child.getNodesWithDepth(result);
	            });
	        }
	    }, {
	        key: "getTextNodes",
	        value: function getTextNodes() {
	            var nodes = this.children.map(function (child) {
	                return child.getTextNodes();
	            }).flatten();
	            if (this.text) {
	                nodes.push(this);
	            }
	            return nodes;
	        }
	    }, {
	        key: "getNodesAt",
	        value: function getNodesAt(depth) {
	            var hasTranformOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            if (this.depth == depth) {
	                if (hasTranformOnly) {
	                    if (this.hasTranform) {
	                        return [this];
	                    } else {
	                        return [];
	                    }
	                }
	                return [this];
	            } else if (this.depth > depth) {
	                return [];
	            } else {
	                var nodes = this.children.map(function (child) {
	                    return child.getNodesAt(depth, hasTranformOnly);
	                });
	                return nodes.flatten();
	            }
	        }
	    }, {
	        key: "getLargestChild",
	        value: function getLargestChild() {
	            var max = 0;
	            var index = 0;
	            for (var i = 0, n = this.children.length; i < n; i++) {
	                var child = this.children[i];
	                var size = Math.max(child.width, child.height);
	                if (child.hasTranform && size > max) {
	                    index = i;
	                    max = size;
	                }
	            }
	            return this.children[index];
	        }
	    }, {
	        key: "setTransform",
	        value: function setTransform(screen, node) {
	            var rect = node.rect;

	            if (rect.width <= 0 || rect.height <= 0) {
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
	                min: { x: x, y: y },
	                max: { x: x + w, y: y + h }
	            };
	            this.uvScale = new THREE.Vector2(w, h);
	            this.uvOffset = new THREE.Vector2(x, y);

	            return this.hasTranform = true;
	        }
	    }]);

	    return DOM;
	}();

	exports.default = DOM;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _FboPingPong = __webpack_require__(6);

	var _FboPingPong2 = _interopRequireDefault(_FboPingPong);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var velocity = "textureVelocity";
	var pressure = "texturePressure";
	var divergence = "textureDivergence";

	var FluidSimulation = function () {
	    function FluidSimulation(renderer) {
	        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;

	        _classCallCheck(this, FluidSimulation);

	        this.sync = false;

	        this.renderer = renderer;

	        this.size = size;
	        this.iterations = 6;

	        this.scene = new THREE.Scene();
	        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	        this.mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	        this.scene.add(this.mesh);

	        var options = {
	            type: THREE.FloatType,
	            // wrapS: THREE.ClampToEdgeWrapping,
	            wrapS: THREE.RepeatWrapping,
	            wrapT: THREE.RepeatWrapping
	        };

	        this.fboVelocityPP = new _FboPingPong2.default(this.size, this.size, options);
	        this.fboPressurePP = new _FboPingPong2.default(this.size, this.size, options);
	        this.fboDivergence = this.fboVelocityPP.createBuffer(this.size, this.size, options);

	        var px = { type: "v2", value: new THREE.Vector2(1 / this.size, 1 / this.size) };

	        var kernel = __webpack_require__(7);

	        this.advect = new THREE.RawShaderMaterial({
	            uniforms: {
	                textureVelocity: { type: "t", value: this.fboVelocityPP.getReadBuffer().texture },
	                px: px,
	                point: { type: "v2", value: new THREE.Vector2(0.5, 0.5) },
	                force: { type: "f", value: 0.0 },
	                radius: { type: "f", value: 0.025 },
	                decay: { type: "f", value: 0.92 }
	            },
	            vertexShader: kernel,
	            fragmentShader: __webpack_require__(8)
	        });

	        this.divergence = new THREE.RawShaderMaterial({
	            uniforms: {
	                textureVelocity: { type: "t", value: this.fboVelocityPP.getWriteBuffer().texture },
	                px: px
	            },
	            vertexShader: kernel,
	            fragmentShader: __webpack_require__(9)
	        });

	        this.jacobi = new THREE.RawShaderMaterial({
	            uniforms: {
	                texturePressure: { type: "t", value: this.fboPressurePP.getReadBuffer().texture },
	                textureDivergence: { type: "t", value: this.fboDivergence.texture },
	                px: px,
	                alpha: { type: "f", value: -1.0 },
	                beta: { type: "f", value: 0.25 }
	            },
	            vertexShader: kernel,
	            fragmentShader: __webpack_require__(10)
	        });

	        this.spg = new THREE.RawShaderMaterial({
	            uniforms: {
	                texturePressure: { type: "t", value: this.fboPressurePP.getReadBuffer().texture },
	                textureVelocity: { type: "t", value: this.fboVelocityPP.getWriteBuffer().texture },
	                px: px
	            },
	            vertexShader: kernel,
	            fragmentShader: __webpack_require__(11)
	        });
	    }

	    _createClass(FluidSimulation, [{
	        key: "update",
	        value: function update(dt, time) {
	            // advection
	            this.compute(this.advect, this.fboVelocityPP.getWriteBuffer());

	            // divergence
	            this.compute(this.divergence, this.fboDivergence);

	            // jacobi
	            for (var i = 0; i < this.iterations; i++) {
	                this.compute(this.jacobi, this.fboPressurePP.getWriteBuffer());
	                this.fboPressurePP.swap();
	                this.jacobi.uniforms.texturePressure.value = this.fboPressurePP.getReadBuffer().texture;
	            }

	            // 一瞬だけ力を加えて徐々にforceの値を0に近づけると良い波が得られる
	            var cur = this.advect.uniforms.force.value;
	            this.advect.uniforms.force.value = Math.max(cur * 0.85, 0.0);

	            // subtract pressure gradient 
	            this.compute(this.spg, this.fboVelocityPP.getReadBuffer());
	        }
	    }, {
	        key: "bang",
	        value: function bang(x, y, r, f) {
	            this.advect.uniforms.point.value.x = x;
	            this.advect.uniforms.point.value.y = y;
	            this.advect.uniforms.radius.value = r;
	            this.advect.uniforms.force.value = f;
	        }
	    }, {
	        key: "compute",
	        value: function compute(material, buffer) {
	            this.mesh.material = material;
	            this.renderer.render(this.scene, this.camera, buffer, false);
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.mesh.geometry.dispose();
	            this.advect.dispose();
	            this.divergence.dispose();
	            this.jacobi.dispose();
	            this.spg.dispose();

	            this.fboVelocityPP.dispose();
	            this.fboPressurePP.dispose();
	            this.fboDivergence.dispose();
	        }
	    }, {
	        key: "osc",
	        value: function osc(data) {
	            switch (data[0]) {
	                case "bang":
	                    var x = Math.random();
	                    var y = Math.random();
	                    this.bang(x, y, 0.15, Math.random() * 300 + 300);
	                    break;

	                case "sync":
	                    this.sync = data[1] == 1;
	                    break;
	            }
	        }
	    }, {
	        key: "velocity",
	        get: function get() {
	            return this.fboVelocityPP.getReadBuffer().texture;
	        }
	    }, {
	        key: "pressure",
	        get: function get() {
	            return this.fboPressurePP.getReadBuffer().texture;
	        }
	    }]);

	    return FluidSimulation;
	}();

	exports.default = FluidSimulation;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FboPingPong = function () {
	    function FboPingPong(width, height, options) {
	        _classCallCheck(this, FboPingPong);

	        this.readBufferIndex = 0;
	        this.writeBufferIndex = 1;
	        this.buffers = [this.createBuffer(width, height, options), this.createBuffer(width, height, options)];
	    }

	    _createClass(FboPingPong, [{
	        key: "getReadBuffer",
	        value: function getReadBuffer() {
	            return this.buffers[this.readBufferIndex];
	        }
	    }, {
	        key: "getWriteBuffer",
	        value: function getWriteBuffer() {
	            return this.buffers[this.writeBufferIndex];
	        }
	    }, {
	        key: "swap",
	        value: function swap() {
	            var tmp = this.buffers[this.writeBufferIndex];
	            this.buffers[this.writeBufferIndex] = this.buffers[this.readBufferIndex];
	            this.buffers[this.readBufferIndex] = tmp;
	        }
	    }, {
	        key: "createBuffer",
	        value: function createBuffer(width, height, options) {
	            options = options || {};

	            return new THREE.WebGLRenderTarget(width, height, {
	                wrapS: options.wrapS || THREE.ClampToEdgeWrapping,
	                wrapT: options.wrapT || THREE.ClampToEdgeWrapping,
	                minFilter: THREE.NearestFilter,
	                magFilter: THREE.NearestFilter,
	                format: THREE.RGBAFormat,
	                type: options.type || THREE.FloatType,
	                anisotropy: false,
	                generateMipmaps: false,
	                depthBuffer: false,
	                stencilBuffer: false
	            });
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.buffers[this.readBufferIndex].dispose();
	            this.buffers[this.writeBufferIndex].dispose();
	        }
	    }]);

	    return FboPingPong;
	}();

	exports.default = FboPingPong;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main(){\n  vUv = uv;\n  gl_Position = vec4(position, 1.0);\n}\n\n"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D textureVelocity;\n\nuniform vec2 px;\nuniform float force;\nuniform vec2 point;\nuniform float radius;\nuniform float decay;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n    vec4 result = texture2D(textureVelocity, uv - texture2D(textureVelocity, vUv).xy * px);\n\n    vec2 dir = uv - point;\n    float d = length(dir);\n    if(d < radius) {\n        float nd = 1.0 - min(d / radius, 1.0);\n        result = (result + vec4(normalize(dir) * nd * force, 0, 1)) * 0.5; // blend\n    }\n    result.xy *= decay;\n    gl_FragColor = result;\n}\n"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D textureVelocity;\nuniform vec2 px;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n    // gradient\n    float x0 = texture2D(textureVelocity, uv - vec2(px.x, 0.0)).x;\n    float x1 = texture2D(textureVelocity, uv + vec2(px.x, 0.0)).x;\n    float y0 = texture2D(textureVelocity, uv - vec2(0.0, px.y)).y;\n    float y1 = texture2D(textureVelocity, uv + vec2(0.0, px.y)).y;\n\n    float divergence = (x1 - x0 + y1 - y0) * 0.5;\n    gl_FragColor = vec4(divergence);\n}\n\n"

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D texturePressure;\nuniform sampler2D textureDivergence;\n\nuniform float alpha;\nuniform float beta;\nuniform vec2 px;\n\nvarying vec2 vUv;\n\nvoid main(){\n    vec2 uv = vUv;\n    float x0 = texture2D(texturePressure, uv - vec2(px.x, 0.0)).r;\n    float x1 = texture2D(texturePressure, uv + vec2(px.x, 0.0)).r;\n    float y0 = texture2D(texturePressure, uv - vec2(0.0, px.y)).r;\n    float y1 = texture2D(texturePressure, uv + vec2(0.0, px.y)).r;\n    float b = texture2D(textureDivergence, uv).r;\n\n    // program representation for Equation 16\n    float relaxed = (x0 + x1 + y0 + y1 + alpha * b) * beta;\n    gl_FragColor = vec4(relaxed);\n}\n"

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D texturePressure;\nuniform sampler2D textureVelocity;\nuniform vec2 px;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n\n    float x0 = texture2D(texturePressure, uv - vec2(px.x, 0.0)).r;\n    float x1 = texture2D(texturePressure, uv + vec2(px.x, 0.0)).r;\n    float y0 = texture2D(texturePressure, uv - vec2(0.0, px.y)).r;\n    float y1 = texture2D(texturePressure, uv + vec2(0.0, px.y)).r;\n\n    vec2 v = texture2D(textureVelocity, uv).xy;\n\n    // subtract gradient of texturePressure from textureVelocity\n    vec2 nv = (v - vec2(x1 - x0, y1 - y0) * 0.5);\n    gl_FragColor = vec4(nv, 1, 1);\n}\n\n"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(13);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LifetimeSystem = function () {
	    function LifetimeSystem(renderer, count) {
	        _classCallCheck(this, LifetimeSystem);

	        var size = Math.ceil(Math.sqrt(count));
	        this._sideCount = size;

	        this._count = this._sideCount * this._sideCount;

	        this.gpuCompute = new _GPUComputationRenderer2.default(size, size, renderer);

	        this.speed = 2.0;

	        this.lifetimeVar = this.gpuCompute.addVariable("textureLifetime", __webpack_require__(14), null);
	        this.lifetimeVar.material.uniforms.mode = { type: "i", value: 0 };
	        this.lifetimeVar.material.uniforms.time = { type: "f", value: 0.0 };
	        this.lifetimeVar.material.uniforms.dt = { type: "f", value: 0.0 };
	        this.lifetimeVar.material.uniforms.recovery = { type: "i", value: 1 };
	        this.lifetimeVar.material.uniforms.speedRange = { type: "v2", value: new THREE.Vector2(0.2, 1.5) };

	        this.gpuCompute.setVariableDependencies(this.lifetimeVar, [this.lifetimeVar]);

	        var error = this.gpuCompute.init();
	        this.init();
	    }

	    _createClass(LifetimeSystem, [{
	        key: "init",
	        value: function init() {
	            this.lifetimeVar.material.uniforms.mode.value = 0;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.lifetimeVar.material.uniforms.mode.value = 1;
	            this.lifetimeVar.material.uniforms.dt.value = dt * this.speed;
	            this.lifetimeVar.material.uniforms.time.value = t;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "recover",
	        value: function recover(flag) {
	            this.lifetimeVar.material.uniforms.recovery.value = flag ? 1 : 0;
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.lifetimeVar.renderTargets[0].dispose();
	            this.lifetimeVar.renderTargets[1].dispose();
	            this.lifetimeVar.material.dispose();
	        }
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "texture",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.lifetimeVar).texture;
	        }
	    }]);

	    return LifetimeSystem;
	}();

	exports.default = LifetimeSystem;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * @author yomboprime https://github.com/yomboprime
	 *
	 * GPUComputationRenderer, based on SimulationRenderer by zz85
	 *
	 * The GPUComputationRenderer uses the concept of variables. These variables are RGBA float textures that hold 4 floats
	 * for each compute element (texel)
	 *
	 * Each variable has a fragment shader that defines the computation made to obtain the variable in question.
	 * You can use as many variables you need, and make dependencies so you can use textures of other variables in the shader
	 * (the sampler uniforms are added automatically) Most of the variables will need themselves as dependency.
	 *
	 * The renderer has actually two render targets per variable, to make ping-pong. Textures from the current frame are used
	 * as inputs to render the textures of the next frame.
	 *
	 * The render targets of the variables can be used as input textures for your visualization shaders.
	 *
	 * Variable names should be valid identifiers and should not collide with THREE GLSL used identifiers.
	 * a common approach could be to use 'texture' prefixing the variable name; i.e texturePosition, textureVelocity...
	 *
	 * The size of the computation (sizeX * sizeY) is defined as 'resolution' automatically in the shader. For example:
	 * #DEFINE resolution vec2( 1024.0, 1024.0 )
	 *
	 * -------------
	 *
	 * Basic use:
	 *
	 * // Initialization...
	 *
	 * // Create computation renderer
	 * var gpuCompute = new GPUComputationRenderer( 1024, 1024, renderer );
	 *
	 * // Create initial state float textures
	 * var pos0 = gpuCompute.createTexture();
	 * var vel0 = gpuCompute.createTexture();
	 * // and fill in here the texture data...
	 *
	 * // Add texture variables
	 * var velVar = gpuCompute.addVariable( "textureVelocity", fragmentShaderVel, pos0 );
	 * var posVar = gpuCompute.addVariable( "texturePosition", fragmentShaderPos, vel0 );
	 *
	 * // Add variable dependencies
	 * gpuCompute.setVariableDependencies( velVar, [ velVar, posVar ] );
	 * gpuCompute.setVariableDependencies( posVar, [ velVar, posVar ] );
	 *
	 * // Add custom uniforms
	 * velVar.material.uniforms.time = { value: 0.0 };
	 *
	 * // Check for completeness
	 * var error = gpuCompute.init();
	 * if ( error !== null ) {
	 *		console.error( error );
	  * }
	 *
	 *
	 * // In each frame...
	 *
	 * // Compute!
	 * gpuCompute.compute();
	 *
	 * // Update texture uniforms in your visualization materials with the gpu renderer output
	 * myMaterial.uniforms.myTexture.value = gpuCompute.getCurrentRenderTarget( posVar ).texture;
	 *
	 * // Do your rendering
	 * renderer.render( myScene, myCamera );
	 *
	 * -------------
	 *
	 * Also, you can use utility functions to create ShaderMaterial and perform computations (rendering between textures)
	 * Note that the shaders can have multiple input textures.
	 *
	 * var myFilter1 = gpuCompute.createShaderMaterial( myFilterFragmentShader1, { theTexture: { value: null } } );
	 * var myFilter2 = gpuCompute.createShaderMaterial( myFilterFragmentShader2, { theTexture: { value: null } } );
	 *
	 * var inputTexture = gpuCompute.createTexture();
	 *
	 * // Fill in here inputTexture...
	 *
	 * myFilter1.uniforms.theTexture.value = inputTexture;
	 *
	 * var myRenderTarget = gpuCompute.createRenderTarget();
	 * myFilter2.uniforms.theTexture.value = myRenderTarget.texture;
	 *
	 * var outputRenderTarget = gpuCompute.createRenderTarget();
	 *
	 * // Now use the output texture where you want:
	 * myMaterial.uniforms.map.value = outputRenderTarget.texture;
	 *
	 * // And compute each frame, before rendering to screen:
	 * gpuCompute.doRenderTarget( myFilter1, myRenderTarget );
	 * gpuCompute.doRenderTarget( myFilter2, outputRenderTarget );
	 * 
	 *
	 *
	 * @param {int} sizeX Computation problem size is always 2d: sizeX * sizeY elements.
	 * @param {int} sizeY Computation problem size is always 2d: sizeX * sizeY elements.
	 * @param {WebGLRenderer} renderer The renderer
	  */

	function GPUComputationRenderer(sizeX, sizeY, renderer) {

		this.variables = [];

		this.currentTextureIndex = 0;

		var scene = new THREE.Scene();

		var camera = new THREE.Camera();
		camera.position.z = 1;

		var passThruUniforms = {
			texture: { value: null }
		};

		var passThruShader = createShaderMaterial(getPassThroughFragmentShader(), passThruUniforms);

		var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), passThruShader);
		scene.add(mesh);

		this.addVariable = function (variableName, computeFragmentShader, initialValueTexture, options) {

			options = options || {};

			var material = this.createShaderMaterial(computeFragmentShader);

			var variable = {
				name: variableName,
				initialValueTexture: initialValueTexture,
				material: material,
				dependencies: null,
				renderTargets: [],
				wrapS: options.wrapS || null,
				wrapT: options.wrapT || null,
				minFilter: THREE.NearestFilter,
				magFilter: THREE.NearestFilter,
				// type: options.type || THREE.FloatType
				type: options.type || THREE.HalfFloatType
			};

			this.variables.push(variable);

			return variable;
		};

		this.setVariableDependencies = function (variable, dependencies) {

			variable.dependencies = dependencies;
		};

		this.init = function () {

			if (!renderer.extensions.get("OES_texture_float")) {

				return "No OES_texture_float support for float textures.";
			}

			if (renderer.capabilities.maxVertexTextures === 0) {

				return "No support for vertex shader textures.";
			}

			for (var i = 0; i < this.variables.length; i++) {

				var variable = this.variables[i];

				// Creates rendertargets and initialize them with input texture
				variable.renderTargets[0] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter, variable.type);
				variable.renderTargets[1] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter, variable.type);
				this.renderTexture(variable.initialValueTexture, variable.renderTargets[0]);
				this.renderTexture(variable.initialValueTexture, variable.renderTargets[1]);

				// Adds dependencies uniforms to the ShaderMaterial
				var material = variable.material;
				var uniforms = material.uniforms;
				if (variable.dependencies !== null) {

					for (var d = 0; d < variable.dependencies.length; d++) {

						var depVar = variable.dependencies[d];

						if (depVar.name !== variable.name) {

							// Checks if variable exists
							var found = false;
							for (var j = 0; j < this.variables.length; j++) {

								if (depVar.name === this.variables[j].name) {
									found = true;
									break;
								}
							}
							if (!found) {
								return "Variable dependency not found. Variable=" + variable.name + ", dependency=" + depVar.name;
							}
						}

						uniforms[depVar.name] = { value: null };

						material.fragmentShader = "\nuniform sampler2D " + depVar.name + ";\n" + material.fragmentShader;
					}
				}
			}

			this.currentTextureIndex = 0;

			return null;
		};

		this.compute = function () {

			var currentTextureIndex = this.currentTextureIndex;
			var nextTextureIndex = this.currentTextureIndex === 0 ? 1 : 0;

			for (var i = 0, il = this.variables.length; i < il; i++) {

				var variable = this.variables[i];

				// Sets texture dependencies uniforms
				if (variable.dependencies !== null) {

					var uniforms = variable.material.uniforms;
					for (var d = 0, dl = variable.dependencies.length; d < dl; d++) {

						var depVar = variable.dependencies[d];

						uniforms[depVar.name].value = depVar.renderTargets[currentTextureIndex].texture;
					}
				}

				// Performs the computation for this variable
				this.doRenderTarget(variable.material, variable.renderTargets[nextTextureIndex]);
			}

			this.currentTextureIndex = nextTextureIndex;
		};

		this.getCurrentRenderTarget = function (variable) {

			return variable.renderTargets[this.currentTextureIndex];
		};

		this.getAlternateRenderTarget = function (variable) {

			return variable.renderTargets[this.currentTextureIndex === 0 ? 1 : 0];
		};

		function addResolutionDefine(materialShader) {

			materialShader.defines.resolution = 'vec2( ' + sizeX.toFixed(1) + ', ' + sizeY.toFixed(1) + " )";
		};
		this.addResolutionDefine = addResolutionDefine;

		// The following functions can be used to compute things manually

		function createShaderMaterial(computeFragmentShader, uniforms) {

			uniforms = uniforms || {};

			var material = new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader: getPassThroughVertexShader(),
				fragmentShader: computeFragmentShader
			});

			addResolutionDefine(material);

			return material;
		};
		this.createShaderMaterial = createShaderMaterial;

		this.createRenderTarget = function (sizeXTexture, sizeYTexture, wrapS, wrapT, minFilter, magFilter, type) {

			sizeXTexture = sizeXTexture || sizeX;
			sizeYTexture = sizeYTexture || sizeY;

			wrapS = wrapS || THREE.ClampToEdgeWrapping;
			wrapT = wrapT || THREE.ClampToEdgeWrapping;

			minFilter = minFilter || THREE.NearestFilter;
			magFilter = magFilter || THREE.NearestFilter;

			type = type || THREE.FloatType;

			var renderTarget = new THREE.WebGLRenderTarget(sizeXTexture, sizeYTexture, {
				wrapS: wrapS,
				wrapT: wrapT,
				minFilter: minFilter,
				magFilter: magFilter,
				format: THREE.RGBAFormat,
				type: type,
				stencilBuffer: false
			});

			return renderTarget;
		};

		this.createTexture = function (sizeXTexture, sizeYTexture) {

			sizeXTexture = sizeXTexture || sizeX;
			sizeYTexture = sizeYTexture || sizeY;

			var a = new Float32Array(sizeXTexture * sizeYTexture * 4);
			var texture = new THREE.DataTexture(a, sizeX, sizeY, THREE.RGBAFormat, THREE.FloatType);
			texture.needsUpdate = true;

			return texture;
		};

		this.renderTexture = function (input, output) {

			// Takes a texture, and render out in rendertarget
			// input = Texture
			// output = RenderTarget

			passThruUniforms.texture.value = input;

			this.doRenderTarget(passThruShader, output);

			passThruUniforms.texture.value = null;
		};

		this.doRenderTarget = function (material, output) {

			mesh.material = material;
			renderer.render(scene, camera, output);
			mesh.material = passThruShader;
		};

		this.debug = function (variable) {

			mesh.material = variable.material;
			renderer.render(scene, camera);
		};

		// Shaders

		function getPassThroughVertexShader() {

			return "void main()	{\n" + "\n" + "	gl_Position = vec4( position, 1.0 );\n" + "\n" + "}\n";
		}

		function getPassThroughFragmentShader() {

			return "uniform sampler2D texture;\n" + "\n" + "void main() {\n" + "\n" + "	vec2 uv = gl_FragCoord.xy / resolution.xy;\n" + "\n" + "	gl_FragColor = texture2D( texture, uv );\n" + "\n" + "}\n";
		}
	}

	exports.default = GPUComputationRenderer;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform float time;\nuniform float dt;\nuniform int mode;\nuniform bool recovery;\n\nuniform vec2 speedRange;\n\nvoid init(vec2 uv) {\n    float r = random_1_0(uv + vec2(time, dt));\n    float speed = mix(speedRange.x, speedRange.y, r);\n    float len = r;\n    float direction = random_1_0(uv.yx + vec2(dt, time)) > 0.5 ? 1.0 : 0.0;\n    gl_FragColor = vec4(1.0, speed, len, direction);\n}\n\nvoid update(vec2 uv) {\n    vec4 lifetime = texture2D(textureLifetime, uv);\n    if(recovery && lifetime.x < 0.0) {\n        init(uv);\n    } else {\n        lifetime.x = clamp(0.0, 1.0, lifetime.x - lifetime.y * dt);\n        gl_FragColor = lifetime;\n    }\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        update(uv);\n    }\n}\n\n"

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Noise = function () {
	    function Noise() {
	        var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new THREE.Vector2(0.05, 0.1);
	        var intensity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
	        var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	        _classCallCheck(this, Noise);

	        this.scale = scale;
	        this.intensity = intensity;
	        this.speed = speed;

	        this.time = 0;
	        this.sync = false;
	        this.beat = 0;
	    }

	    _createClass(Noise, [{
	        key: "update",
	        value: function update(dt, t) {
	            this.time += dt * this.speed;
	        }
	    }, {
	        key: "speedTo",
	        value: function speedTo(duration, to) {
	            return this.tweenSpeed(duration, this.speed, to);
	        }
	    }, {
	        key: "tweenSpeed",
	        value: function tweenSpeed(duration, from, to) {
	            var _this = this;

	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var n = this;
	            return new Promise(function (resolve, reject) {
	                TWEEN.remove(_this.tw);
	                _this.tw = new TWEEN.Tween({ speed: from }).easing(TWEEN.Easing.Quadratic.Out).to({ speed: to }, duration).onUpdate(function () {
	                    n.speed = this.speed;
	                }).onComplete(function () {
	                    resolve(_this);
	                }).start();
	            });
	        }
	    }, {
	        key: "intensityTo",
	        value: function intensityTo(duration, to) {
	            return this.tweenIntensity(duration, this.intensity, to);
	        }
	    }, {
	        key: "tweenIntensity",
	        value: function tweenIntensity(duration, from, to) {
	            var _this2 = this;

	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var n = this;
	            return new Promise(function (resolve, reject) {
	                TWEEN.remove(_this2.tw);
	                _this2.tw = new TWEEN.Tween({ intensity: from }).easing(TWEEN.Easing.Quadratic.Out).to({ intensity: to }, duration).onUpdate(function () {
	                    n.intensity = this.intensity;
	                }).onComplete(function () {
	                    n.intensity = to;

	                    resolve(_this2);
	                }).start();
	            });
	        }
	    }, {
	        key: "tween",
	        value: function tween(duration, from, to) {
	            var _this3 = this;

	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var n = this;
	            return new Promise(function (resolve, reject) {
	                TWEEN.remove(_this3.tw);
	                _this3.tw = new TWEEN.Tween(from).easing(easing).to(to, duration).onUpdate(function () {
	                    n.speed = this.speed;
	                    n.intensity = this.intensity;
	                }).onComplete(function () {
	                    resolve(_this3);
	                }).start();
	            });
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration) {
	            var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
	            var intensity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

	            var fromSpeed = this.speed;
	            var fromIntensity = this.intensity;
	            var n = this;
	            n.tween(duration * 0.5, {
	                speed: fromSpeed,
	                intensity: fromIntensity
	            }, {
	                speed: speed,
	                intensity: intensity
	            }, TWEEN.Easing.Exponential.Out).then(function () {
	                n.tween(duration * 0.5, {
	                    speed: speed,
	                    intensity: intensity
	                }, {
	                    speed: fromSpeed,
	                    intensity: fromIntensity
	                }, TWEEN.Easing.Linear.None);
	            });
	        }
	    }, {
	        key: "activate",
	        value: function activate(flag) {
	            this.intensityTo(800, flag ? 4.0 : 0.0);
	        }
	    }, {
	        key: "osc",
	        value: function osc(data) {

	            switch (data[0]) {
	                case "bang":
	                    this.bang(400);
	                    break;

	                case "sync":
	                    this.sync = data[1] == 1;
	                    break;

	                case "activate":
	                    this.activate(data[1] == 1);
	                    break;

	            }
	        }
	    }]);

	    return Noise;
	}();

	exports.default = Noise;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CombinePass = function (_THREE$Pass) {
	    _inherits(CombinePass, _THREE$Pass);

	    function CombinePass(renderer, scene, camera) {
	        _classCallCheck(this, CombinePass);

	        var _this = _possibleConstructorReturn(this, (CombinePass.__proto__ || Object.getPrototypeOf(CombinePass)).call(this));

	        _this.scene = scene;
	        _this.speed = 1;

	        _this.cCamera = camera;
	        _this.bCamera = new THREE.OrthographicCamera();
	        _this.bCamera.copy(_this.cCamera);

	        _this.height = _this.cCamera.bottom - _this.cCamera.top;
	        _this.bCamera.top += _this.height;
	        _this.bCamera.bottom += _this.height;
	        _this.bCamera.updateProjectionMatrix();

	        _this.clear = true;
	        _this.clearDepth = false;
	        _this.needsSwap = false;

	        _this.material = new THREE.ShaderMaterial({
	            uniforms: {
	                tCenter: { type: "t", value: null },
	                tBottom: { type: "t", value: null },
	                zoom: { type: "v3", value: new THREE.Vector3(1.0, 0.0, 0.0) },
	                offset: { type: "f", value: 0.0 }
	            },
	            vertexShader: __webpack_require__(17),
	            fragmentShader: __webpack_require__(18)
	        });

	        _this.combineCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	        _this.combineScene = new THREE.Scene();

	        _this.combineQuad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null);
	        _this.combineQuad.frustumCulled = false; // Avoid getting clipped
	        _this.combineScene.add(_this.combineQuad);

	        var parameters = {
	            minFilter: THREE.LinearFilter,
	            magFilter: THREE.LinearFilter,
	            format: THREE.RGBAFormat,
	            stencilBuffer: false
	        };

	        var size = renderer.getSize();
	        _this.cBuffer = new THREE.WebGLRenderTarget(size.width, size.height, parameters);
	        _this.cBuffer.texture.name = "center";

	        _this.bBuffer = _this.cBuffer.clone();
	        _this.bBuffer.texture.name = "bottom";
	        return _this;
	    }

	    _createClass(CombinePass, [{
	        key: "scroll",
	        value: function scroll(dt, size) {
	            var dy = dt * this.speed;
	            this.update(this.cCamera, dy, size);
	            this.update(this.bCamera, dy, size);
	            this.material.uniforms.offset.value = 0.0;

	            if (this.cCamera.bottom >= size) {
	                var diff = this.cCamera.bottom - size;
	                this.move(this.bCamera, diff);

	                var offset = diff / this.height;
	                this.material.uniforms.offset.value = offset;
	            } else if (this.cCamera.top <= 0) {
	                this.cCamera.top = this.bCamera.top;
	                this.cCamera.bottom = this.bCamera.bottom;
	                this.bCamera.top = this.bCamera.top + this.height;
	                this.bCamera.bottom = this.bCamera.bottom + this.height;
	            }

	            this.cCamera.updateProjectionMatrix();
	            this.bCamera.updateProjectionMatrix();
	        }
	    }, {
	        key: "move",
	        value: function move(camera, y) {
	            camera.top = y - this.height;
	            camera.bottom = y;
	        }
	    }, {
	        key: "update",
	        value: function update(camera, dy, size) {
	            camera.top += dy;
	            camera.bottom += dy;
	            if (camera.top >= size) {
	                var h = camera.top - size;
	                camera.top = h - this.height;
	                camera.bottom = h;
	            }
	        }
	    }, {
	        key: "render",
	        value: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
	            renderer.clearDepth();
	            renderer.render(this.scene, this.cCamera, this.cBuffer, this.clear);

	            this.material.uniforms.tCenter.value = this.cBuffer.texture;

	            if (this.cCamera.bottom > this.bCamera.bottom) {
	                renderer.clearDepth();
	                renderer.render(this.scene, this.bCamera, this.bBuffer, this.clear);
	                this.material.uniforms.tBottom.value = this.bBuffer.texture;
	            }

	            this.combineQuad.material = this.material;
	            renderer.render(this.combineScene, this.combineCamera, readBuffer, this.clear);
	        }
	    }, {
	        key: "setSize",
	        value: function setSize(width, height) {
	            if (this.cBuffer) {
	                this.cBuffer.setSize(width, height);
	                this.bBuffer.setSize(width, height);
	            }
	        }
	    }, {
	        key: "resize",
	        value: function resize(camera) {}
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.material.dispose();
	            this.cBuffer.dispose();
	            this.bBuffer.dispose();
	        }
	    }]);

	    return CombinePass;
	}(THREE.Pass);

	exports.default = CombinePass;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform vec3 zoom; // yz : -1.0 ~ 1.0, 0.0 means zoom to center\n\nvarying vec2 vUv;\n\nvoid main() {\n    float dz = (zoom.x - 1.0) / zoom.x;\n    vUv = uv / zoom.x + vec2(dz * 0.5, dz * 0.5) * (zoom.yz + vec2(1.0, 1.0));\n    gl_Position = vec4(position, 1.0);\n}\n\n"

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tCenter;\nuniform sampler2D tBottom;\n\nuniform float offset; // 0.0 ~ 1.0\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n\n    if(uv.y <= offset) {\n        gl_FragColor = texture2D(tBottom, uv);\n    } else {\n        gl_FragColor = texture2D(tCenter, uv);\n    }\n}\n"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TransitionPass = function (_THREE$ShaderPass) {
	    _inherits(TransitionPass, _THREE$ShaderPass);

	    function TransitionPass(renderer) {
	        _classCallCheck(this, TransitionPass);

	        var _this = _possibleConstructorReturn(this, (TransitionPass.__proto__ || Object.getPrototypeOf(TransitionPass)).call(this, {
	            uniforms: {
	                tDiffuse: { type: "t", value: null },
	                tPrev: { type: "t", value: null },
	                t: { type: "f", value: 0.0 }
	            },
	            vertexShader: __webpack_require__(20),
	            fragmentShader: __webpack_require__(21)
	        }));

	        _this.throughMaterial = new THREE.ShaderMaterial({
	            uniforms: {
	                tDiffuse: { type: "t", value: null }
	            },
	            vertexShader: __webpack_require__(20),
	            fragmentShader: __webpack_require__(22)
	        });

	        var size = renderer.getSize();
	        _this.prevBuffer = new THREE.WebGLRenderTarget(size.width, size.height, {
	            minFilter: THREE.LinearFilter,
	            magFilter: THREE.LinearFilter,
	            format: THREE.RGBAFormat,
	            stencilBuffer: false
	        });
	        _this.uniforms.tPrev.value = _this.prevBuffer.texture;

	        _this.snap = false;
	        return _this;
	    }

	    _createClass(TransitionPass, [{
	        key: "snapshot",
	        value: function snapshot() {
	            this.uniforms.t.value = 1.0;
	            this.snap = true;
	        }
	    }, {
	        key: "transit",
	        value: function transit() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;

	            var uniforms = this.uniforms;
	            new TWEEN.Tween({
	                t: 1.0
	            }).to({
	                t: 0.0
	            }, duration).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
	                uniforms.t.value = this.t;
	            }).onComplete(function () {
	                uniforms.t.value = 0.0;
	            }).start();
	        }
	    }, {
	        key: "render",
	        value: function render(renderer, writeBuffer, readBuffer, delta, maskActive) {
	            _get(TransitionPass.prototype.__proto__ || Object.getPrototypeOf(TransitionPass.prototype), "render", this).call(this, renderer, writeBuffer, readBuffer, delta, maskActive);

	            if (this.snap) {
	                this.throughMaterial.uniforms.tDiffuse.value = readBuffer.texture;
	                this.quad.material = this.throughMaterial;
	                renderer.render(this.scene, this.camera, this.prevBuffer);

	                this.snap = false;
	            }
	        }
	    }, {
	        key: "setSize",
	        value: function setSize(width, height) {
	            this.prevBuffer.setSize(width, height);
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.material.dispose();
	            this.throughMaterial.dispose();
	            this.prevBuffer.dispose();
	        }
	    }]);

	    return TransitionPass;
	}(THREE.ShaderPass);

	exports.default = TransitionPass;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 1.0);\n}\n\n"

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform sampler2D tPrev;\nuniform float t;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec4 color = vec4(0, 0, 0, 0);\n    if(vUv.x < t) {\n        color = texture2D(tPrev, vUv);\n    } else {\n        color = texture2D(tDiffuse, vec2(vUv.x - t, vUv.y));\n    }\n    gl_FragColor = color;\n}\n\n"

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    gl_FragColor = texture2D(tDiffuse, vUv);\n}\n\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 全てのDOMMeshで共通のGeometryが使える
	// uvScaleとuvOffsetをuniformで渡せば良い
	var build = function build(nodes, width, height, size, zoffset) {
	    var geometry = new THREE.BufferGeometry();

	    var vertices = [];
	    var centers = [];
	    var uv = [];
	    var uv2 = [];
	    var uv3 = [];
	    var uv4 = []; // square packing
	    var nuv4 = []; // normalized uv4
	    var uv5 = [];
	    var nuv5 = [];

	    var counter = 0;

	    var ratio = height / width;
	    var nw = size / width;
	    var nh = size / height;

	    var wc = Math.floor(width / size);

	    var textOffset = {
	        x: 0,
	        y: 0,
	        h: 0
	    };

	    var scale, offset;
	    var x, y, z;
	    var centerX, centerY;
	    var sx, sy;
	    var nsx, nsy;
	    var w, h;

	    nodes.forEach(function (node) {
	        scale = node.uvScale;
	        offset = node.uvOffset;

	        x = node.x;
	        y = node.y;
	        z = node.depth * zoffset;
	        centerX = x + node.width * 0.5;
	        centerY = y + node.height * 0.5;

	        sx = counter % wc * size;
	        sy = Math.floor(counter / wc) * size;

	        nsx = sx / width;
	        nsy = sy / height;

	        if (node.width > node.height) {
	            w = size;
	            h = node.height / node.width * w;
	        } else {
	            h = size;
	            w = node.width / node.height * h;
	        }

	        vertices.push(x, y, z);
	        centers.push(centerX, centerY, z);
	        uv.push(offset.x, 1.0 - offset.y);
	        uv2.push(0, 0);
	        uv3.push(sx, sy);
	        uv4.push(sx, sy);
	        nuv4.push(nsx, nsy * ratio);

	        vertices.push(x + node.width, y, z);
	        centers.push(centerX, centerY, z);
	        uv.push(offset.x + scale.x, 1.0 - offset.y);
	        uv2.push(1, 0);
	        uv3.push(sx + w, sy);
	        uv4.push(sx + size, sy);
	        nuv4.push(nsx + nw, nsy * ratio);

	        vertices.push(x + node.width, y + node.height, z);
	        centers.push(centerX, centerY, z);
	        uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
	        uv2.push(1, 1);
	        uv3.push(sx + w, sy + h);
	        uv4.push(sx + size, sy + size);
	        nuv4.push(nsx + nw, (nsy + nh) * ratio);

	        vertices.push(x, y + node.height, z);
	        centers.push(centerX, centerY, z);
	        uv.push(offset.x, 1.0 - (offset.y + scale.y));
	        uv2.push(0, 1);
	        uv3.push(sx, sy + h);
	        uv4.push(sx, sy + size);
	        nuv4.push(nsx, (nsy + nh) * ratio);

	        if (node.text) {
	            var tx = textOffset.x;
	            var ty = textOffset.y;

	            var ntx = tx / width;
	            var nty = ty / height;
	            var ntw = w / width;
	            var nth = h / height;

	            uv5.push(tx, ty);
	            uv5.push(tx + w, ty);
	            uv5.push(tx + w, ty + h);
	            uv5.push(tx, ty + h);

	            nuv5.push(ntx, nty * ratio);
	            nuv5.push(ntx + ntw, nty * ratio);
	            nuv5.push(ntx + ntw, (nty + nth) * ratio);
	            nuv5.push(ntx, (nty + nth) * ratio);

	            textOffset.h = Math.max(h, textOffset.h);

	            textOffset.x = tx + w;
	            if (textOffset.x > width) {
	                textOffset.x = 0;
	                textOffset.y += textOffset.h;
	                textOffset.h = 0;
	            }
	        } else {
	            for (var j = 0; j < 4; j++) {
	                uv5.push(0, 0);
	                nuv5.push(0, 0);
	            }
	        }

	        counter++;
	    });

	    var len = vertices.length / 3;
	    var indices = [];

	    for (var i = 0; i < len; i += 4) {
	        var a = i,
	            b = i + 1,
	            c = i + 2,
	            d = i + 3;
	        indices.push(a, c, b);
	        indices.push(d, c, a);
	    }

	    // build geometry
	    geometry.setIndex(indices);
	    geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute("center", new THREE.Float32BufferAttribute(centers, 3));
	    geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	    geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	    geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));
	    geometry.addAttribute('uv4', new THREE.Float32BufferAttribute(uv4, 2));
	    geometry.addAttribute('uv5', new THREE.Float32BufferAttribute(uv5, 2));
	    geometry.addAttribute('nuv4', new THREE.Float32BufferAttribute(nuv4, 2));
	    geometry.addAttribute('nuv5', new THREE.Float32BufferAttribute(nuv5, 2));

	    return geometry;
	};

	// http://erkaman.github.io/glsl-cos-palette/
	var palletes = [[new THREE.Vector3(0.5, 0.6, 0.8), new THREE.Vector3(0.43, 0.44, 0.57), new THREE.Vector3(0.84, 0.81, 0.46), new THREE.Vector3(1.0, 0.61, 0.48)], [new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(2.0, 1.0, 0.0), new THREE.Vector3(0.5, 0.2, 0.25)], [new THREE.Vector3(0.79, 0.86, 0.73), new THREE.Vector3(0.41, 0.67, 0.46), new THREE.Vector3(0.4, 0.91, 0.07), new THREE.Vector3(0.48, 0.09, 0.99)], [new THREE.Vector3(0.5, 0.4, 0.5), new THREE.Vector3(0.3, 0.3, 0.1), new THREE.Vector3(2.6, 2.4, 1.6), new THREE.Vector3(1.0, 0.3, 0.8)], [new THREE.Vector3(0.4, 0.2, 0.5), new THREE.Vector3(0.3, 0.4, 0.3), new THREE.Vector3(1.8, 0.7, 1.0), new THREE.Vector3(0.0, 0.7, 0.6)], [new THREE.Vector3(0.3, 0.5, 0.7), new THREE.Vector3(0.2, 0.4, 0.1), new THREE.Vector3(2.7, 1.2, 1.3), new THREE.Vector3(1.0, 0.3, 0.4)], [new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(0.5, 0.5, 0.5), new THREE.Vector3(1.0, 0.7, 0.4), new THREE.Vector3(0.0, 0.2, 0.2)]];

	var DOMMesh = function (_THREE$Mesh) {
	    _inherits(DOMMesh, _THREE$Mesh);

	    function DOMMesh(nodes, width, height, size, offset) {
	        _classCallCheck(this, DOMMesh);

	        var pallete = 0;

	        var _this = _possibleConstructorReturn(this, (DOMMesh.__proto__ || Object.getPrototypeOf(DOMMesh)).call(this, new THREE.Geometry(), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(24),
	            fragmentShader: __webpack_require__(25),
	            uniforms: {
	                capture: { type: "t", value: null },
	                from: { type: "i", value: 0 },
	                to: { type: "i", value: 1 },

	                t: { type: "f", value: 0.0 },
	                c: { type: "f", value: 0.0 },
	                lighting: { type: "f", value: 0.0 },
	                lightDirection: { type: "v3", value: new THREE.Vector3(0.1, -0.5, -0.5) },
	                // threshold: { type : "f", value : 0.0 },

	                time: { type: "f", value: 0.0 },
	                scale: { type: "v2", value: new THREE.Vector2(0.05, 0.1) },
	                intensity: { type: "f", value: 0.0 },

	                pa: { type: "v3", value: palletes[pallete][0] },
	                pb: { type: "v3", value: palletes[pallete][1] },
	                pc: { type: "v3", value: palletes[pallete][2] },
	                pd: { type: "v3", value: palletes[pallete][3] },

	                texturePressure: { type: "t", value: null },
	                textureVelocity: { type: "t", value: null }
	            },
	            side: THREE.DoubleSide
	        })));

	        _this.init(nodes, width, height, size, offset);

	        _this.durationT = 750;
	        _this.durationL = 800;

	        _this.modes = {
	            "default": 0,
	            "grid": 1,
	            "square grid": 2,
	            "text only": 3
	        };

	        _this.onNextT = function () {};
	        _this.pallete = pallete;
	        return _this;
	    }

	    _createClass(DOMMesh, [{
	        key: "init",
	        value: function init(nodes, width, height, size, offset) {
	            this.geometry = build(nodes, width, height, size, offset);
	        }
	    }, {
	        key: "noise",
	        value: function noise(n) {
	            this.material.uniforms.time.value = n.time;
	            this.material.uniforms.scale.value = n.scale;
	            this.material.uniforms.intensity.value = n.intensity;
	        }
	    }, {
	        key: "color",
	        value: function color(pa, pb, pc, pd) {
	            this.material.uniforms.pa.value = pa;
	            this.material.uniforms.pb.value = pb;
	            this.material.uniforms.pc.value = pc;
	            this.material.uniforms.pd.value = pd;
	        }
	    }, {
	        key: "nextC",
	        value: function nextC(next) {
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
	            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TWEEN.Easing.Quadratic.Out;

	            var mesh = this;
	            var from = palletes[mesh.pallete];
	            var to = palletes[next % palletes.length];
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    t: 0
	                }).to({ t: 1 }, duration).easing(easing).onUpdate(function () {
	                    var pa = from[0].clone().lerp(to[0], this.t);
	                    var pb = from[1].clone().lerp(to[1], this.t);
	                    var pc = from[2].clone().lerp(to[2], this.t);
	                    var pd = from[3].clone().lerp(to[3], this.t);
	                    mesh.color(pa, pb, pc, pd);
	                }).onComplete(function () {
	                    mesh.color(to[0], to[1], to[2], to[3]);
	                    mesh.pallete = next;
	                }).start();
	            });
	        }
	    }, {
	        key: "nextT",
	        value: function nextT() {
	            var easing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TWEEN.Easing.Quadratic.Out;

	            var from = this.material.uniforms.t.value < 0.5 ? 0.0 : 1.0;
	            var to = 1 - from;
	            if (this.onNextT) {
	                this.onNextT(to > 0.5 ? this.to : this.from);
	            }
	            this.tweenT(from, to, this.durationT, easing);
	        }
	    }, {
	        key: "tweenT",
	        value: function tweenT(from, to, duration) {
	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var uniforms = this.material.uniforms;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    t: from
	                }).to({ t: to }, duration).easing(easing).onUpdate(function () {
	                    uniforms.t.value = this.t;
	                }).onComplete(function () {
	                    uniforms.t.value = to;
	                }).start();
	            });
	        }
	    }, {
	        key: "html",
	        value: function html(flag) {
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            var from = this.material.uniforms.c.value;
	            if (flag === undefined) {
	                flag = from > 0.5;
	            }
	            var to = flag ? 0 : 1;
	            this.tweenC(from, to, 800, easing);
	        }
	    }, {
	        key: "light",
	        value: function light(flag) {
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            var from = this.material.uniforms.lighting.value;
	            if (flag === undefined) {
	                flag = from < 0.5;
	            }
	            var to = flag ? 1 : 0;
	            this.tweenL(from, to, this.durationL, easing);
	        }
	    }, {
	        key: "tweenC",
	        value: function tweenC(from, to, duration) {
	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var uniforms = this.material.uniforms;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    c: from
	                }).to({ c: to }, duration).easing(easing).onUpdate(function () {
	                    uniforms.c.value = this.c;
	                }).onComplete(function () {
	                    uniforms.c.value = to;
	                }).start();
	            });
	        }
	    }, {
	        key: "tweenL",
	        value: function tweenL(from, to, duration) {
	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var uniforms = this.material.uniforms;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    lighting: from
	                }).to({ lighting: to }, duration).easing(easing).onUpdate(function () {
	                    uniforms.lighting.value = this.lighting;
	                }).onComplete(function () {
	                    uniforms.lighting.value = to;
	                }).start();
	            });
	        }
	    }, {
	        key: "another",
	        value: function another(candidates, v) {
	            candidates.splice(candidates.indexOf(v), 1);
	            return candidates[Math.floor(Math.random() * candidates.length)];
	        }
	    }, {
	        key: "osc",
	        value: function osc(data) {
	            switch (data[0]) {
	                case "mode":
	                    // set next mode
	                    var mode = parseInt(data[1]);
	                    if (mode < 0) {
	                        // randomize
	                        this.mode = this.another([0, 1, 2, 3], this.mode);
	                    } else {
	                        this.mode = mode;
	                    }
	                    break;

	                case "html":
	                    this.html(data[1] == 1);
	                    break;

	                case "light":
	                    this.light(data[1] == 1);
	                    break;

	                case "color":
	                    // change to next color
	                    var next = parseInt(data[1]);
	                    if (next < 0) {
	                        var candidates = palletes.map(function (p, i) {
	                            return i;
	                        });
	                        this.nextC(this.another(candidates, this.palette));
	                    } else {
	                        this.nextC(next);
	                    }
	                    break;

	            }
	        }
	    }, {
	        key: "from",
	        get: function get() {
	            return this.material.uniforms.from.value;
	        },
	        set: function set(mode) {
	            this.material.uniforms.from.value = mode;
	        }
	    }, {
	        key: "to",
	        get: function get() {
	            return this.material.uniforms.to.value;
	        },
	        set: function set(mode) {
	            this.material.uniforms.to.value = mode;
	        }
	    }, {
	        key: "mode",
	        get: function get() {
	            if (this.material.uniforms.t.value < 0.5) {
	                return this.from;
	            } else {
	                return this.to;
	            }
	        },
	        set: function set(mode) {
	            if (this.material.uniforms.t.value < 0.5) {
	                this.to = mode;
	            } else {
	                this.from = mode;
	            }
	            this.nextT();
	        }
	    }]);

	    return DOMMesh;
	}(THREE.Mesh);

	exports.default = DOMMesh;

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_5_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_2(vec4 x) {\n     return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_6;\n  vec3 i1 = min( g_1_6.xyz, l.zxy );\n  vec3 i2 = max( g_1_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_1(i);\n  vec4 p = permute_1_2( permute_1_2( permute_1_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_5.wyz - D_1_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_7.xy,h.z);\n  vec3 p3 = vec3(a1_1_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_3(vec4(dot(p0_1_8,p0_1_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nfloat quadraticOut_2_9(float t) {\n  return -t * (t - 2.0);\n}\n\n\n\nfloat cubicOut_4_10(float t) {\n  float f = t - 1.0;\n  return f * f * f + 1.0;\n}\n\n\n\nfloat exponentialOut_3_11(float t) {\n  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);\n}\n\n\n\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform int mode;\nuniform float t;\nuniform float c;\nuniform float seed;\n\nuniform int from;\nuniform int to;\n\nuniform float time;\nuniform vec2 scale;\nuniform float intensity;\n\nuniform vec3 pa;\nuniform vec3 pb;\nuniform vec3 pc;\nuniform vec3 pd;\n\nuniform sampler2D texturePressure;\nuniform sampler2D textureVelocity;\n\nattribute vec3 position;\nattribute vec3 center;\nattribute vec2 uv;\nattribute vec2 uv2; // [0.0 ~ 1.0, 0.0 ~ 1.0]\nattribute vec2 uv3;\nattribute vec2 uv4;\nattribute vec2 nuv4; // normalized uv4\nattribute vec2 uv5;\nattribute vec2 nuv5; // normalized uv5\n\nvarying vec2 vUv;\nvarying vec3 vColor;\nvarying vec3 vPosition;\n\nvec3 pallete(float t, vec3 a, vec3 b, vec3 c, vec3 d) {\n    return a + b * cos(6.28318 * (c * t + d));\n}\n\n// mode\n// 0 = default\n// 1 = order keep ratio\n// 2 = order squares \n// 3 = order text only\n// \nvec3 get(int m) {\n    vec3 pos = position;\n    if(m == 0) {\n        // pos = vec3(pos.xy - velocity, -abs(pressure));\n    } else if(m == 1) {\n        vec2 velocity = texture2D(textureVelocity, nuv4).xy;\n        float pressure = min(texture2D(texturePressure, nuv4).x * 10.0, 100.0);\n        pos = vec3(uv3.xy - velocity, -abs(pressure));\n    } else if(m == 2) {\n        vec2 velocity = texture2D(textureVelocity, nuv4).xy;\n        float pressure = min(texture2D(texturePressure, nuv4).x * 10.0, 100.0);\n        pos = vec3(uv4.xy - velocity, -abs(pressure));\n    } else if(m == 3) {\n        vec2 velocity = texture2D(textureVelocity, nuv5).xy;\n        float pressure = min(texture2D(texturePressure, nuv5).x * 10.0, 100.0);\n        pos = vec3(uv5.xy - velocity, -abs(pressure));\n    }\n    return pos;\n}\n\nvec3 noise(vec3 pos) {\n    pos.xy += vec2(\n        snoise_1_4(pos.xyz * vec3(scale, 0.0) + vec3(0.0, 0.0, time)),\n        snoise_1_4(pos.yxz * vec3(scale.yx, 0.0) + vec3(0.0, 0.0, time))\n    ) * intensity;\n    return pos;\n}\n\nvoid main() {\n    vec3 pos = position;\n\n    pos.xyz = mix(get(from), get(to), t);\n    pos.xyz = noise(pos.xyz);\n\n    vec4 world = modelMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * (viewMatrix * world);\n\n    vPosition = world.xyz;\n    vUv = uv;\n\n    float r = random_5_0(center.xy);\n    vColor = pallete(r, pa, pb, pc, pd);\n}\n\n"

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D capture;\nuniform float c;\nuniform float lighting;\nuniform vec3 lightDirection;\n\nvarying vec2 vUv;\nvarying vec3 vColor;\nvarying vec3 vPosition;\n\nconst float spec = 1.7;\n\nvoid main() {\n    vec3 dx = dFdx(vPosition.xyz);\n    vec3 dy = dFdy(vPosition.xyz);\n    vec3 normal = cross(dx, dy);\n    \n    float highlight = clamp(dot(normal, normalize(lightDirection)), 0.34, 2.0);\n    highlight = pow(highlight, spec);\n    highlight = mix(1.0, highlight, lighting);\n\n    vec4 color = texture2D(capture, vUv);\n\n    gl_FragColor = vec4(mix(color.rgb, vColor, c) * highlight, 1.0);\n}\n\n"

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build(nodes, width, height, size, sideCount) {
	    var geometry = new THREE.BufferGeometry();

	    var vertices = [];
	    var tips = [];
	    var easings = [];
	    var uv = [];
	    var uv2 = [];
	    var uv3 = []; // text only position

	    var inv = 1 / sideCount;
	    var counter = 0,
	        counter2 = 0;

	    var wc = Math.floor(width / size);

	    var textOffset = {
	        x: 0,
	        y: 0,
	        h: 0
	    };

	    var sx, sy;

	    var l, r, t, b;
	    var l2, r2, t2, b2;
	    var w, h;

	    nodes.forEach(function (node) {
	        l = node.x;
	        r = node.x + node.width;
	        t = node.y;
	        b = node.y + node.height;

	        vertices.push(l, t, 0);
	        vertices.push(r, t, 0);
	        tips.push(0, 1);

	        vertices.push(r, t, 0);
	        vertices.push(r, b, 0);
	        tips.push(0, 1);

	        vertices.push(r, b, 0);
	        vertices.push(l, b, 0);
	        tips.push(0, 1);

	        vertices.push(l, b, 0);
	        vertices.push(l, t, 0);
	        tips.push(0, 1);

	        for (var j = 0; j < 4; j++) {
	            var easing = Math.floor(Math.random() * 4);
	            easings.push(easing, easing);

	            var u = counter % sideCount * inv;
	            var div = counter * inv;
	            var v = div - counter * inv % 1.0;
	            uv.push(u, v, u, v);
	            counter++;
	        }

	        sx = counter2 % wc * size;
	        sy = Math.floor(counter2 / wc) * size;

	        l2 = sx, r2 = sx + size;
	        t2 = sy, b2 = sy + size;
	        uv2.push(l2, t2, r2, t2);
	        uv2.push(r2, t2, r2, b2);
	        uv2.push(r2, b2, l2, b2);
	        uv2.push(l2, b2, l2, t2);

	        if (node.text) {
	            if (node.width > node.height) {
	                w = size;
	                h = node.height / node.width * w;
	            } else {
	                h = size;
	                w = node.width / node.height * h;
	            }

	            var tx = textOffset.x;
	            var ty = textOffset.y;
	            uv3.push(tx, ty);uv3.push(tx + w, ty);
	            uv3.push(tx + w, ty);uv3.push(tx + w, ty + h);
	            uv3.push(tx + w, ty + h);uv3.push(tx, ty + h);
	            uv3.push(tx, ty + h);uv3.push(tx, ty);

	            textOffset.h = Math.max(h, textOffset.h);

	            textOffset.x = tx + w;
	            if (textOffset.x > width) {
	                textOffset.x = 0;
	                textOffset.y += textOffset.h;
	                textOffset.h = 0;
	            }
	        } else {
	            for (var j = 0; j < 8; j++) {
	                uv3.push(0, 0);
	            }
	        }

	        counter2++;
	    });

	    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute('tip', new THREE.Float32BufferAttribute(tips, 1));
	    geometry.addAttribute('easing', new THREE.Float32BufferAttribute(easings, 1));
	    geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	    geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	    geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));

	    return geometry;
	};

	var BoundingBoxLine = function (_THREE$LineSegments) {
	    _inherits(BoundingBoxLine, _THREE$LineSegments);

	    function BoundingBoxLine(nodes, width, height, size, sideCount) {
	        _classCallCheck(this, BoundingBoxLine);

	        var _this = _possibleConstructorReturn(this, (BoundingBoxLine.__proto__ || Object.getPrototypeOf(BoundingBoxLine)).call(this, new THREE.Geometry(), new THREE.RawShaderMaterial({
	            uniforms: {
	                textureLifetime: { type: "t", value: null },

	                t: { type: "f", value: 0.0 },
	                alpha: { type: "f", value: 1.0 },
	                beta: { type: "f", value: 0.0 },
	                time: { type: "f", value: 0.0 },
	                scale: { type: "v2", value: new THREE.Vector2(0.05, 0.1) },
	                intensity: { type: "f", value: 2.0 },
	                from: { type: "i", value: 0 },
	                to: { type: "i", value: 1 }
	            },
	            vertexShader: __webpack_require__(27),
	            fragmentShader: __webpack_require__(28),
	            linewidth: 1,
	            transparent: true
	        })));

	        _this.init(nodes, width, height, size, sideCount);
	        return _this;
	    }

	    _createClass(BoundingBoxLine, [{
	        key: 'init',
	        value: function init(nodes, width, height, size, sideCount) {
	            this.geometry = build(nodes, width, height, size, sideCount);
	        }
	    }, {
	        key: 'noise',
	        value: function noise(n) {
	            this.material.uniforms.time.value = n.time;
	            this.material.uniforms.scale.value = n.scale;
	            this.material.uniforms.intensity.value = n.intensity;
	        }
	    }, {
	        key: 'nextT',
	        value: function nextT() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            var from = this.material.uniforms.t.value < 0.5 ? 0.0 : 1.0;
	            var to = 1 - from;
	            this.tweenT(from, to, duration, easing);
	        }
	    }, {
	        key: 'tweenT',
	        value: function tweenT(from, to, duration) {
	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var uniforms = this.material.uniforms;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    t: from
	                }).to({ t: to }, duration).easing(easing).onUpdate(function () {
	                    uniforms.t.value = this.t;
	                }).onComplete(function () {
	                    uniforms.t.value = to;
	                }).start();
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            this.tweenAlpha(this.material.uniforms.alpha.value, 1.0, duration, easing);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            this.tweenAlpha(this.material.uniforms.alpha.value, 0, duration, easing);
	        }
	    }, {
	        key: 'tweenAlpha',
	        value: function tweenAlpha(from, to, duration) {
	            var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : TWEEN.Easing.Quadratic.Out;

	            var uniforms = this.material.uniforms;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    alpha: from
	                }).to({ alpha: to }, duration).easing(easing).onUpdate(function () {
	                    uniforms.alpha.value = this.alpha;
	                }).onComplete(function () {
	                    uniforms.alpha.value = to;
	                }).start();
	            });
	        }
	    }, {
	        key: 'move',
	        value: function move() {
	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 800;
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            var line = this;
	            var from = line.beta;
	            var to = from < 0.5 ? 1 : 0;
	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    beta: from
	                }).to({ beta: to }, duration).easing(easing).onUpdate(function () {
	                    line.beta = this.beta;
	                }).onComplete(function () {
	                    line.beta = to;
	                    resolve();
	                }).start();
	            });
	        }
	    }, {
	        key: 'osc',
	        value: function osc(data) {
	            switch (data[0]) {
	                case "show":
	                    this.show();
	                    break;

	                case "hide":
	                    this.hide();
	                    break;

	                case "move":
	                    this.move();
	                    break;
	            }
	        }
	    }, {
	        key: 'from',
	        get: function get() {
	            return this.material.uniforms.from.value;
	        },
	        set: function set(mode) {
	            this.material.uniforms.from.value = mode;
	        }
	    }, {
	        key: 'to',
	        get: function get() {
	            return this.material.uniforms.to.value;
	        },
	        set: function set(mode) {
	            this.material.uniforms.to.value = mode;
	        }
	    }, {
	        key: 'next',
	        set: function set(mode) {
	            if (this.material.uniforms.t.value < 0.5) {
	                this.to = mode;
	            } else {
	                this.from = mode;
	            }
	        }
	    }, {
	        key: 'beta',
	        get: function get() {
	            return this.material.uniforms.beta.value;
	        },
	        set: function set(v) {
	            this.material.uniforms.beta.value = v;
	        }
	    }]);

	    return BoundingBoxLine;
	}(THREE.LineSegments);

	exports.default = BoundingBoxLine;

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nfloat quadraticOut_1_0(float t) {\n  return -t * (t - 2.0);\n}\n\n\n\nfloat cubicOut_2_1(float t) {\n  float f = t - 1.0;\n  return f * f * f + 1.0;\n}\n\n\n\nfloat exponentialOut_4_2(float t) {\n  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);\n}\n\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_3_3(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_3_3(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_3_4(vec4 x) {\n     return mod289_3_3(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_3_5(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_3_6(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_3_7 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_3_8 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_3_8;\n  vec3 i1 = min( g_3_8.xyz, l.zxy );\n  vec3 i2 = max( g_3_8.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_3_7.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_3_3(i);\n  vec4 p = permute_3_4( permute_3_4( permute_3_4(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_3_7.wyz - D_3_7.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_3_9 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_3_10 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_3_9.xy,h.z);\n  vec3 p3 = vec3(a1_3_9.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_3_5(vec4(dot(p0_3_10,p0_3_10), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_3_10 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_3_10,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureLifetime;\n\nuniform float time;\nuniform vec2 scale;\nuniform float intensity;\n\nuniform float t;\nuniform int from;\nuniform int to;\n\nuniform float beta;\n\nattribute vec3 position;\nattribute float tip;\nattribute float easing;\nattribute vec2 uv;\nattribute vec2 uv2;\nattribute vec2 uv3;\n\nvarying float vThreshold;\nvarying float vTip;\nvarying float vLength;\n\nvec3 noise(vec3 pos) {\n    pos.xy += vec2(\n        snoise_3_6(pos.xyz * vec3(scale, 0.0) + vec3(0.0, 0.0, time)),\n        snoise_3_6(pos.yxz * vec3(scale.yx, 0.0) + vec3(0.0, 0.0, time))\n    ) * intensity;\n    return pos;\n}\n\n// mode\n// 0 = default\n// 1 = order keep ratio\n// 2 = order squares \n// 3 = order text only\nvec3 get(int m) {\n    vec3 pos = position;\n    if(m == 1 || m == 2) {\n        pos.xy = uv2.xy;\n    } else if(m == 3) {\n        pos.xy = uv3.xy;\n    }\n    return pos;\n}\n\nvoid main() {\n    vec3 pos = position;\n    pos.xyz = mix(get(from), get(to), t);\n    pos.xyz = noise(pos);\n    gl_Position = projectionMatrix * (modelViewMatrix * vec4(pos, 1.0));\n    vec4 lifetime = texture2D(textureLifetime, uv);\n\n    float l = lifetime.x;\n    float tt = l;\n    if(easing < 1.0) {\n        tt = quadraticOut_1_0(l);\n    } else if(easing < 2.0) {\n        tt = cubicOut_2_1(l);\n    } else if(easing < 3.0) {\n        tt = exponentialOut_4_2(l);\n    }\n\n    if(lifetime.w > 0.5) {\n        vTip = tip;\n    } else {\n        vTip = 1.0 - tip;\n    }\n\n    vThreshold = mix(0.0, 1.0 + lifetime.z, tt);\n    vLength = lifetime.z;\n\n    vThreshold = mix(1.0, vThreshold, beta);\n    vLength = mix(1.0, vLength, beta);\n\n}\n\n"

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform float alpha;\nuniform float beta;\n\nvarying float vThreshold;\nvarying float vTip;\nvarying float vLength;\n\nvoid main() {\n    float edge = vThreshold - vLength;\n    if(vTip > vThreshold || edge > vTip) discard;\n    float e = smoothstep(vThreshold, edge, vTip);\n    vec3 c = vec3(0.3);\n    gl_FragColor = vec4(c, mix(1.0, e, beta) * alpha);\n}\n\n"

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TextParticleSystem = __webpack_require__(30);

	var _TextParticleSystem2 = _interopRequireDefault(_TextParticleSystem);

	var _TextParticleMesh = __webpack_require__(34);

	var _TextParticleMesh2 = _interopRequireDefault(_TextParticleMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextParticle = function (_THREE$Object3D) {
	    _inherits(TextParticle, _THREE$Object3D);

	    function TextParticle(renderer, page) {
	        var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16384;

	        _classCallCheck(this, TextParticle);

	        var _this = _possibleConstructorReturn(this, (TextParticle.__proto__ || Object.getPrototypeOf(TextParticle)).call(this));

	        _this.system = new _TextParticleSystem2.default(renderer, page, count);

	        var nodes = page.root.getTextNodes();
	        _this.mesh = new _TextParticleMesh2.default(nodes, _this.system.sideCount);
	        _this.mesh.frustumCulled = false;
	        _this.mesh.material.uniforms.capture.value = page.texture;
	        _this.mesh.material.uniforms.texturePosition.value = _this.system.position;
	        _this.mesh.material.uniforms.textureVelocity.value = _this.system.velocity;
	        _this.mesh.material.uniforms.textureRotation.value = _this.system.rotation;
	        _this.add(_this.mesh);

	        _this.init(page);
	        return _this;
	    }

	    _createClass(TextParticle, [{
	        key: "init",
	        value: function init(page) {
	            this.system.init(page);

	            var nodes = page.root.getTextNodes();
	            this.mesh.init(nodes);
	            this.mesh.material.uniforms.capture.value = page.texture;
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.system.update(dt, t);
	        }
	    }, {
	        key: "throttle",
	        get: function get() {
	            return this.system.throttle;
	        }

	        // t: 0.0 ~ 1.0
	        ,
	        set: function set(t) {
	            this.system.throttle = t;
	        }
	    }]);

	    return TextParticle;
	}(THREE.Object3D);

	exports.default = TextParticle;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(13);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var velocity = "textureVelocity";
	var rotation = "textureRotation";
	var position = "texturePosition";

	var TextParticleSystem = function () {
	    function TextParticleSystem(renderer, page, count) {
	        _classCallCheck(this, TextParticleSystem);

	        var size = Math.ceil(Math.sqrt(count));
	        this._sideCount = size;
	        this._count = this._sideCount * this._sideCount;

	        this.gpuCompute = new _GPUComputationRenderer2.default(size, size, renderer);

	        this.velVar = this.gpuCompute.addVariable(velocity, __webpack_require__(31), null);
	        this.rotVar = this.gpuCompute.addVariable(rotation, __webpack_require__(32), null);
	        this.posVar = this.gpuCompute.addVariable(position, __webpack_require__(33), null);

	        // Add variable dependencies
	        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

	        var error = this.gpuCompute.init();
	        this.setup(page);
	        this.init(page);

	        this.velVar.material.uniforms.mode.value = 0;
	        this.gpuCompute.compute();
	    }

	    _createClass(TextParticleSystem, [{
	        key: "setup",
	        value: function setup(page) {
	            this.posVar.material.uniforms.throttle = { type: "f", value: 0.0 };
	            this.posVar.material.uniforms.boundsMin = { type: "v3", value: new THREE.Vector3(0, 0, -10) };
	            this.posVar.material.uniforms.boundsMax = { type: "v3", value: new THREE.Vector3(page.size.width, page.size.height, 10) };

	            this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type: "f", value: 0.15 };
	            this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type: "f", value: 0.0 };
	            this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type: "f", value: 0.0 };
	            this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type: "i", value: 0 };

	            this.velVar.material.uniforms.noiseScale = { type: "v3", value: new THREE.Vector3(0.01, 0.01, 0.01) };
	            this.velVar.material.uniforms.noiseSpeed = { type: "f", value: 0.5 };
	            this.velVar.material.uniforms.noiseIntensity = { type: "v3", value: new THREE.Vector3(20.8, 150.2, 0.1) };
	            this.velVar.material.uniforms.decay = { type: "f", value: 0.95 };
	        }
	    }, {
	        key: "init",
	        value: function init(page) {
	            this.posVar.material.uniforms.boundsMin.value.set(0, 0, -10);
	            this.posVar.material.uniforms.boundsMax.value.set(page.size.width, page.size.height, 10);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.velVar.material.uniforms.mode.value = 1;
	            this.velVar.material.uniforms.dt.value = dt;
	            this.velVar.material.uniforms.time.value = t;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
	        }
	    }, {
	        key: "velocity",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
	        }
	    }, {
	        key: "rotation",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
	        }
	    }, {
	        key: "throttle",
	        get: function get() {
	            return this.posVar.material.uniforms.throttle.value;
	        },
	        set: function set(t) {
	            this.posVar.material.uniforms.throttle.value = t;
	        }
	    }]);

	    return TextParticleSystem;
	}();

	exports.default = TextParticleSystem;

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\nhighp float random_2_8(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform float time;\nuniform float dt;\nuniform int mode;\n\nuniform float speed;\n\nuniform float noiseSpeed;\nuniform vec3 noiseScale;\nuniform vec3 noiseIntensity;\n\nuniform float decay;\n\nvoid init(vec2 uv) {\n    float r = random_2_8(uv * 33.15 + vec2(time, dt)) * 0.25 + 0.75;\n    gl_FragColor = vec4(0.0, 0.0, 0.0, r);\n}\n\nvoid update(vec2 uv) {\n    vec4 pos = texture2D(texturePosition, uv);\n    if(pos.a < 0.0) {\n        init(uv);\n    } else {\n        vec4 vel = texture2D(textureVelocity, uv);\n\n        vec3 seed = pos.xyz * noiseScale;\n        float t = time * noiseSpeed;\n\n        vel.xyz += vec3(\n            snoise_1_3(seed + vec3(t, 0, 0)), \n            -abs(snoise_1_3(seed + vec3(t, t, 0))), \n            snoise_1_3(seed + vec3(0, 0, t)) \n        ) * noiseIntensity * dt * vel.w;\n\n        // vel.xyz *= vel.w * (1.0 - pos.w);\n        vel.xyz *= decay;\n        gl_FragColor = vel;\n    }\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        update(uv);\n    }\n}\n\n"

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.1415926\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\n\nvec4 q_conj(vec4 q) {\n\treturn vec4(-q.x, -q.y, -q.z, q.w);\n}\n\nuniform float time;\nuniform float dt;\nuniform int mode;\n\nvoid init(vec2 uv) {\n    gl_FragColor = QUATERNION_IDENTITY;\n}\n\nvoid rotate(vec2 uv) {\n    vec4 v = texture2D(textureVelocity, uv);\n    vec4 r = texture2D(textureRotation, uv);\n\n    float theta = (0.1 + length(v.xyz) * 0.05) * dt;\n    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));\n\n    gl_FragColor = normalize(qmul(dq, r));\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        rotate(uv);\n    }\n}\n\n"

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\nuniform int mode;\nuniform float speed;\nuniform float time;\nuniform float dt;\nuniform float throttle;\n\nuniform vec3 boundsMin;\nuniform vec3 boundsMax;\n\n// emit\nvoid init(vec2 uv) {\n    vec2 seed = uv * 33.3;\n    vec3 v3 = vec3(random_1_0(seed.xy + vec2(time, 0.0)), random_1_0(seed.yx + vec2(time, dt)), random_1_0(seed.xy + vec2(dt, time)));\n    vec4 p = vec4(\n        (boundsMax - boundsMin) * v3 + boundsMin,\n        1.0\n    );\n\n    // Throttling: discards particle emission by adding offset.\n    if(uv.x > throttle) {\n        p += vec4(1e8, 1e8, 1e8, -1);\n    }\n    gl_FragColor = p;\n}\n\nvoid update(vec2 uv) {\n    vec4 pos = texture2D(texturePosition, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n    pos.w -= dt * speed * vel.w;\n    if(pos.w < 0.0)  {\n        init(uv);\n    } else {\n        pos.xyz += vel.xyz * dt;\n        gl_FragColor = pos;\n    }\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        update(uv);\n    }\n}\n\n\n"

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build(nodes) {
	    var sideCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 128;

	    var geometry = new THREE.BufferGeometry();

	    var indices = [];
	    var vertices = [];
	    var uv = [];
	    var uv2 = [];
	    var uv3 = [];
	    var colors = [];

	    var inv = 1 / sideCount;
	    var hinv = inv * 0.5;
	    var nodeLength = nodes.length;
	    var index = 0;

	    for (var y = 0; y < sideCount; y++) {
	        for (var x = 0; x < sideCount; x++) {
	            var node = nodes[index++ % nodeLength];
	            var scale = node.uvScale;
	            var offset = node.uvOffset;

	            var u = x * inv + hinv;
	            var v = y * inv + hinv;

	            var hw = node.width * 0.5;
	            var hh = node.height * 0.5;

	            vertices.push(-hw, -hh, 0); // lt
	            uv.push(offset.x, 1.0 - offset.y);
	            uv2.push(0, 0);

	            vertices.push(hw, -hh, 0); // rt
	            uv.push(offset.x + scale.x, 1.0 - offset.y);
	            uv2.push(1, 0);

	            vertices.push(hw, hh, 0); // rb
	            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
	            uv2.push(1, 1);

	            vertices.push(-hw, hh, 0); // lb
	            uv.push(offset.x, 1.0 - (offset.y + scale.y));
	            uv2.push(0, 1);

	            for (var i = 0; i < 4; i++) {
	                uv3.push(u, v);
	            }

	            var color = new THREE.Color(node.backgroundColor);
	            colors.push(color.r, color.g, color.b);
	            colors.push(color.r, color.g, color.b);
	            colors.push(color.r, color.g, color.b);
	            colors.push(color.r, color.g, color.b);
	        }
	    }

	    var len = vertices.length / 3;
	    for (var i = 0; i < len; i += 4) {
	        var a = i,
	            b = i + 1,
	            c = i + 2,
	            d = i + 3;
	        indices.push(a, c, b);
	        indices.push(d, c, a);
	    }

	    // build geometry
	    geometry.setIndex(indices);
	    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
	    geometry.addAttribute('uv2', new THREE.Float32BufferAttribute(uv2, 2));
	    geometry.addAttribute('uv3', new THREE.Float32BufferAttribute(uv3, 2));
	    geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

	    return geometry;
	};

	var TextParticleMesh = function (_THREE$Mesh) {
	    _inherits(TextParticleMesh, _THREE$Mesh);

	    function TextParticleMesh(nodes, sideCount) {
	        _classCallCheck(this, TextParticleMesh);

	        var _this = _possibleConstructorReturn(this, (TextParticleMesh.__proto__ || Object.getPrototypeOf(TextParticleMesh)).call(this, new THREE.Geometry(), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(35),
	            fragmentShader: __webpack_require__(36),
	            uniforms: {
	                time: { type: "f", value: 0.0 },
	                capture: { type: "t", value: null },
	                texturePosition: { type: "t", value: null },
	                textureRotation: { type: "t", value: null },
	                textureVelocity: { type: "t", value: null }
	            },
	            depthWrite: false,
	            transparent: true,
	            side: THREE.DoubleSide
	        })
	        // new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000), wireframe: true, side: THREE.DoubleSide })
	        ));

	        _this.init(nodes, sideCount);
	        return _this;
	    }

	    _createClass(TextParticleMesh, [{
	        key: 'init',
	        value: function init(nodes, sideCount) {
	            this.geometry.dispose();
	            this.geometry = build(nodes, sideCount);
	        }
	    }]);

	    return TextParticleMesh;
	}(THREE.Mesh);

	exports.default = TextParticleMesh;

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureVelocity;\nuniform sampler2D textureRotation;\nuniform sampler2D texturePosition;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec2 uv2;\nattribute vec2 uv3;\nattribute vec3 color;\n\nvarying vec2 vUv; // uv for capture \nvarying vec3 vColor; // bg color\n\nvoid main() {\n    vec4 pos = texture2D(texturePosition, uv3);\n    vec4 rot = texture2D(textureRotation, uv3);\n\n    float size = smoothstep(0.0, 0.2, pos.w) * smoothstep(1.0, 0.8, pos.w);\n    vec3 p = rotate_vector(position, rot) * size;\n    p += pos.xyz;\n    gl_Position = projectionMatrix * (modelViewMatrix * vec4(p, 1.0));\n\n    vUv = uv;\n    vColor = color;\n}\n\n"

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D capture;\n\nvarying vec2 vUv;\nvarying vec3 vColor;\n\nvoid main() {\n    vec4 color = texture2D(capture, vUv);\n    vec3 drgb = color.rgb - vColor.rgb;\n    color.a = smoothstep(0.0, 0.1, dot(drgb, drgb));\n    gl_FragColor = color;\n}\n\n"

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var MathUtil = {

	    TWO_PI: Math.PI * 2,
	    HALF_PI: Math.PI * 0.5,
	    QUARTER_PI: Math.PI * 0.25,

	    randomRange: function randomRange(min, max) {
	        return Math.random() * (max - min) + min;
	    },

	    randomCircle: function randomCircle(min, max) {
	        var r = Math.random() * MathUtil.TWO_PI;
	        var len = MathUtil.randomRange(min, max);
	        return {
	            x: Math.cos(r) * len,
	            y: Math.sin(r) * len
	        };
	    }

	};

	exports.default = MathUtil;

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform float t;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n    vec4 sample = texture2D(tDiffuse, uv);\n\n    float grayscale = dot(sample.rgb, vec3(0.299, 0.587, 0.114));\n    sample.rgb = mix(sample.rgb, vec3(grayscale, grayscale, grayscale), t);\n\n    gl_FragColor = sample;\n}\n"

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform float t;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n    vec4 sample = texture2D(tDiffuse, uv);\n    sample.rgb = mix(sample.rgb, 1.0 - sample.rgb, t);\n    gl_FragColor = sample;\n}\n"

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Stage2 = __webpack_require__(2);

	var _Stage3 = _interopRequireDefault(_Stage2);

	var _DOM = __webpack_require__(4);

	var _DOM2 = _interopRequireDefault(_DOM);

	var _Building = __webpack_require__(41);

	var _Building2 = _interopRequireDefault(_Building);

	var _BuildingControl = __webpack_require__(48);

	var _BuildingControl2 = _interopRequireDefault(_BuildingControl);

	var _PolarCoordinate = __webpack_require__(49);

	var _PolarCoordinate2 = _interopRequireDefault(_PolarCoordinate);

	var _Grid = __webpack_require__(50);

	var _Grid2 = _interopRequireDefault(_Grid);

	var _DOMBoxParticleSystem = __webpack_require__(56);

	var _DOMBoxParticle = __webpack_require__(60);

	var _DOMBoxParticle2 = _interopRequireDefault(_DOMBoxParticle);

	var _GridLine = __webpack_require__(64);

	var _GridLine2 = _interopRequireDefault(_GridLine);

	var _MathUtil = __webpack_require__(37);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TownStage = function (_Stage) {
	    _inherits(TownStage, _Stage);

	    function TownStage(vj, resolution) {
	        _classCallCheck(this, TownStage);

	        var _this = _possibleConstructorReturn(this, (TownStage.__proto__ || Object.getPrototypeOf(TownStage)).call(this, vj, resolution));

	        _this.towns = [];

	        var t0 = _MathUtil2.default.randomRange(0, Math.PI * 0.5);
	        var t1 = _MathUtil2.default.randomRange(0, Math.PI * 2.0);

	        _this.polar = new _PolarCoordinate2.default(t0, t1, 2500);

	        var folder = _this.gui.addFolder("camera");
	        folder.add(_this, "randomize");

	        var id = void 0;
	        var interval = function interval() {
	            if (id != null) {
	                clearInterval(id);
	            }
	            id = setInterval(function () {
	                _this.randomize(false);
	            }, 5000);
	        };
	        interval();
	        folder.add({ interval: true }, "interval").onChange(function (flag) {
	            if (flag) {
	                interval();
	            } else {
	                clearInterval(id);
	            }
	        });

	        folder.add(_this, "overlook");
	        folder.add(_this.polar, "radius", 100, 8000).name("distance");
	        folder.add(_this.polar, "theta0", 0, Math.PI * 0.5).name("θ");
	        folder.add(_this.polar, "theta1", 0, Math.PI * 2).name("θ'");

	        var pathes = ["../dist/captures/wikipedia-jp", "../dist/captures/github", "../dist/captures/amazon", "../dist/captures/ヤフオク", "../dist/captures/yoppa", "../dist/captures/foursquare"];

	        Promise.all(pathes.map(function (path) {
	            return _this.load(path);
	        })).then(function (pages) {
	            _this.hideIndicator();
	            _this.createScene(window.innerWidth, window.innerHeight);
	            _this.init(pages);
	        });

	        return _this;
	    }

	    _createClass(TownStage, [{
	        key: "init",
	        value: function init(pages) {
	            var _this2 = this;

	            this.selected = -1;

	            this.pages = pages;
	            this.pages.forEach(function (page) {
	                page.buildHierarchy();
	            });

	            this.container = new THREE.Object3D();
	            this.container.position.z -= 500;
	            this.scene.add(this.container);

	            this.gridLine = new _GridLine2.default(80, 80);
	            this.gridLine.scale.set(8000, 8000, 5);
	            this.gridLine.renderOrder = -1; // must be rendered at first
	            this.container.add(this.gridLine);

	            this.grid = new _Grid2.default(this.renderer);
	            this.grid.page = this.page;
	            this.container.add(this.grid);

	            var gridFolder = this.gui.addFolder("grid");
	            gridFolder.add(this.grid, "sync");
	            gridFolder.add(this.grid, "noise");
	            gridFolder.add(this.grid, "circle");

	            this.control = new _BuildingControl2.default();
	            this.container.add(this.control);

	            var buildingFolder = this.gui.addFolder("building");
	            buildingFolder.add(this.control, "sync");
	            buildingFolder.add({
	                append: function append() {
	                    _this2.control.append(_this2.page, Math.floor(_MathUtil2.default.randomRange(1, 4)));
	                }
	            }, "append");
	            buildingFolder.add(this.control, "destroy");
	            buildingFolder.add(this.control, "explode");
	            buildingFolder.add(this.control, "duration", 500, 4000);

	            this.particle = new _DOMBoxParticle2.default(this.renderer, this.pages);
	            this.container.add(this.particle);

	            var particleFolder = this.gui.addFolder("particle");

	            particleFolder.add(this.particle, "mode", _DOMBoxParticleSystem.DOMBoxParticleMode);
	            particleFolder.add(this.particle, "throttle", 0.0, 1.0);
	            particleFolder.add(this.particle.mesh.material.uniforms.scale, "value", 0.1, 1.0).name("scale");

	            var sphereFolder = particleFolder.addFolder("sphere");
	            sphereFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "z", 0.0, 1500.0).name("sphere noise");
	            sphereFolder.add(this.particle.system.velVar.material.uniforms.sphere.value, "w", 0.0, 400.0).name("sphere intensity");

	            var modelFolder = particleFolder.addFolder("model");
	            modelFolder.add(this.particle, "randomize");
	            modelFolder.add(this.particle.system, "size", 750, 2500);

	            setInterval(function () {
	                _this2.particle.system.step();
	            }, 5000);
	        }
	    }, {
	        key: "create",
	        value: function create(texture, node, width, height) {
	            var building = new _Building2.default(this.alpha, texture, node, width, height);
	            var rotate = Math.random() < 0.5;
	            var rotate2 = Math.random() < 0.5;
	            if (!rotate) {
	                building.rotation.set(Math.PI, 0, rotate2 ? Math.PI : 0);
	            } else {
	                building.rotation.set(Math.PI, 0, rotate2 ? Math.PI * 0.5 : Math.PI * 1.5);
	                building.rect.rotate90();
	            }

	            this.container.add(building);

	            return building;
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {

	            if (this.controls) {
	                this.controls.update(dt);
	            } else if (this.camera) {
	                this.turn(dt);
	            }

	            if (this.system) {
	                this.system.update(dt, t);
	            }

	            if (this.particle) {
	                this.particle.update(dt, t);
	            }

	            if (this.control) {
	                this.control.update(dt, t);
	            }

	            if (this.grid) {
	                this.grid.update(dt, t);
	            }

	            if (this.composer) {
	                this.rgbShift.uniforms.time.value = this.wave.uniforms.time.value = t;
	            }
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            _get(TownStage.prototype.__proto__ || Object.getPrototypeOf(TownStage.prototype), "destroy", this).call(this);

	            if (this.container) {
	                if (this.gridLine) {
	                    this.container.remove(this.gridLine);
	                }
	                if (this.control) {
	                    this.control.dispose();
	                    this.container.remove(this.control);
	                }
	                this.scene.remove(this.container);
	            }

	            if (this.composer) {
	                this.composer.renderTarget1.dispose();
	                this.composer.renderTarget2.dispose();
	            }
	        }
	    }, {
	        key: "bang",
	        value: function bang(duration) {
	            var beat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


	            if (this.control) {
	                if (this.control.sync && this.control.buildings.length < 100) {
	                    this.control.append(this.page, Math.floor(_MathUtil2.default.randomRange(1, 3)));
	                }
	                this.control.grow();
	            }

	            if (this.grid && this.grid.sync) {
	                this.grid.page = this.page;
	                this.grid.noise(1.5, 1.5, 1.0);
	            }
	        }
	    }, {
	        key: "randomize",
	        value: function randomize() {
	            var tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	            var near = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var up = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            var dt1 = (Math.random() - 0.5) * Math.PI * 2;

	            if (dt1 * this.polar.speed < 0) {
	                this.polar.speed = -(this.polar.speed > 0 ? 1 : -1) * _MathUtil2.default.randomRange(0.1, 0.35);
	            } else {
	                this.polar.speed = (this.polar.speed > 0 ? 1 : -1) * _MathUtil2.default.randomRange(0.1, 0.35);
	            }

	            var t0 = up ? _MathUtil2.default.randomRange(_MathUtil2.default.HALF_PI * 0.75, _MathUtil2.default.HALF_PI) : _MathUtil2.default.randomRange(0, _MathUtil2.default.HALF_PI);
	            var t1 = this.polar.theta1 + dt1;
	            var radius = near ? _MathUtil2.default.randomRange(500, 800) : _MathUtil2.default.randomRange(550, 4500);

	            if (tween) {
	                this.polar.tween(t0, t1, radius, Math.random() * 500 + 500);
	            } else {
	                this.polar.theta0 = t0;
	                this.polar.theta1 = t1;
	                this.polar.radius = radius;
	            }
	        }
	    }, {
	        key: "overlook",
	        value: function overlook() {
	            var tween = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	            var dt1 = (Math.random() - 0.5) * _MathUtil2.default.TWO_PI;

	            if (dt1 * this.polar.speed < 0) {
	                this.polar.speed *= -1;
	            }

	            var t0 = _MathUtil2.default.HALF_PI;
	            var t1 = this.polar.theta1 + dt1;
	            var radius = 8000;

	            if (tween) {
	                this.polar.tween(t0, t1, radius, 800);
	            } else {
	                this.polar.theta0 = t0;
	                this.polar.theta1 = t1;
	                this.polar.radius = radius;
	            }
	        }
	    }, {
	        key: "turn",
	        value: function turn(dt) {
	            this.polar.forward(dt);

	            var v = this.polar.cartesian;
	            this.camera.position.set(v.x, v.z, v.y);
	            this.camera.up.set(0, 0, 1);
	            this.camera.lookAt(new THREE.Vector3());
	        }
	    }, {
	        key: "render",
	        value: function render(renderer) {
	            if (this.composer) {
	                this.composer.render();
	            }
	        }
	    }, {
	        key: "createScene",
	        value: function createScene(w, h) {
	            var _this3 = this;

	            this.renderer.setClearColor(new THREE.Color("rgb(232, 232, 232)"));

	            this.camera = new THREE.PerspectiveCamera(45, w / h, 1.0, 20000);
	            this.camera.position.z = 1500;

	            // this.controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);

	            this.composer = new THREE.EffectComposer(this.renderer);

	            var rpass = new THREE.RenderPass(this.scene, this.camera);

	            var kernel = __webpack_require__(20);

	            var vignette = new THREE.ShaderPass({
	                uniforms: {
	                    tDiffuse: { type: "t", value: null },
	                    offset: { type: "f", value: 0.75 },
	                    darkness: { type: "f", value: 1.0 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(67)
	            });

	            var negative = new THREE.ShaderPass({
	                uniforms: {
	                    "tDiffuse": { type: "t", value: null },
	                    "t": { type: "f", value: 0.0 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(39)
	            });

	            var loader = new THREE.TextureLoader();

	            this.rgbShift = new THREE.ShaderPass({
	                uniforms: {
	                    tDiffuse: { type: "t", value: null },
	                    tNoise: { type: "t", value: null },
	                    t: { type: "f", value: 1.0 },
	                    amplitude: { type: "f", value: 0.035 },
	                    time: { type: "f", value: 0.0 },
	                    speed: { type: "f", value: 0.02 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(68)
	            });

	            loader.load("../dist/textures/random.png", function (texture) {
	                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	                _this3.rgbShift.uniforms.tNoise.value = texture;
	            });

	            var tiltshift = new THREE.ShaderPass({
	                uniforms: {
	                    tDiffuse: { type: "t", value: null },
	                    blurAmount: { type: "f", value: 1.0 },
	                    center: { type: "f", value: 1.0 },
	                    stepSize: { type: "f", value: 0.004 }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(69)
	            });

	            this.wave = new THREE.ShaderPass({
	                uniforms: {
	                    tDiffuse: { type: "t", value: null },
	                    time: { type: "f", value: 0.0 },
	                    t: { type: "f", value: 1.0 },
	                    intensity: { type: "f", value: 0.0 },
	                    border: { type: "f", value: 0.1 },
	                    scale: { type: "v2", value: new THREE.Vector2(1.5, 1.5) }
	                },
	                vertexShader: kernel,
	                fragmentShader: __webpack_require__(70)
	            });

	            this.composer.addPass(rpass);
	            this.composer.addPass(vignette);
	            this.composer.addPass(negative);
	            this.composer.addPass(this.rgbShift);
	            this.composer.addPass(tiltshift);
	            this.composer.addPass(this.wave);

	            var passes = this.composer.passes;
	            passes[passes.length - 1].renderToScreen = true;

	            this.composer.setSize(w * 2, h * 2);

	            var postEffectFolder = this.gui.addFolder("post effects");
	            var negativeFolder = postEffectFolder.addFolder("negative");
	            negativeFolder.add(negative.material.uniforms.t, "value", 0.0, 1.0).name("t");

	            var rgbShiftFolder = postEffectFolder.addFolder("rgb shift");
	            rgbShiftFolder.add(this.rgbShift.material.uniforms.amplitude, "value", 0.0, 0.4).name("amplitude");
	            rgbShiftFolder.add(this.rgbShift.material.uniforms.speed, "value", 0.0, 1.0).name("speed");

	            var waveFolder = postEffectFolder.addFolder("wave");
	            waveFolder.add(this.wave.material.uniforms.intensity, "value", 0.0, 0.5).name("intensity");
	            waveFolder.add(this.wave.material.uniforms.scale.value, "x", 0.0, 3.5).name("scale x");
	            waveFolder.add(this.wave.material.uniforms.scale.value, "y", 0.0, 3.5).name("scale y");
	        }
	    }, {
	        key: "resize",
	        value: function resize(w, h) {
	            _get(TownStage.prototype.__proto__ || Object.getPrototypeOf(TownStage.prototype), "resize", this).call(this, w, h);

	            if (this.camera) {
	                this.camera.aspect = w / h;
	                this.camera.updateProjectionMatrix();
	            }

	            if (this.composer) {
	                this.composer.setSize(w * 2, h * 2);
	            }
	        }
	    }, {
	        key: "page",
	        get: function get() {
	            if (this.selected < 0) {
	                return this.pages[Math.floor(Math.random() * this.pages.length)];
	            }
	            return this.pages[this.selected];
	        }
	    }]);

	    return TownStage;
	}(_Stage3.default);

	exports.default = TownStage;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Rect = __webpack_require__(42);

	var _Rect2 = _interopRequireDefault(_Rect);

	var _BuildingMesh = __webpack_require__(43);

	var _BuildingMesh2 = _interopRequireDefault(_BuildingMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var one = new THREE.Vector3(1, 1, 1);
	var zero = new THREE.Vector3(0, 0, 0);

	var Building = function (_THREE$Object3D) {
	    _inherits(Building, _THREE$Object3D);

	    function Building() {
	        var alpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;
	        var texture = arguments[1];
	        var node = arguments[2];
	        var width = arguments[3];
	        var height = arguments[4];
	        var downstair = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

	        _classCallCheck(this, Building);

	        var _this = _possibleConstructorReturn(this, (Building.__proto__ || Object.getPrototypeOf(Building)).call(this));

	        _this.texture = texture;
	        _this.node = node;
	        _this.width = width;
	        _this.height = height;
	        _this.downstair = downstair;
	        _this.upstair = null;
	        _this.rect = new _Rect2.default(0, 0, node.width, node.height);

	        _this.tween = null;
	        _this._alpha = alpha;

	        _this.velocity = new THREE.Vector3();
	        _this.decay = Math.random() * 0.02 + 0.995;

	        // 親オブジェクトよりも寿命を短く
	        if (_this.downstair) {
	            _this.startLifetime = _this.lifetime = _this.downstair.lifetime * 0.9;
	            _this.mass = _this.downstair.mass * 1.05;
	        } else {
	            _this.startLifetime = _this.lifetime = 7.5 + Math.random() * 2.5;
	            _this.mass = Math.random() * 0.5 + 0.5;
	        }

	        _this.uplifted = false;
	        _this.vanishing = false;
	        _this.mature = false;

	        _this.axis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
	        return _this;
	    }

	    _createClass(Building, [{
	        key: "uplift",
	        value: function uplift() {
	            var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -100;

	            var _this2 = this;

	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
	            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TWEEN.Easing.Quadratic.Out;


	            var mesh = this.mesh;
	            if (!mesh) {
	                mesh = this.build(this.node);
	                this.mesh = mesh;
	            }

	            return new Promise(function (resolve, reject) {
	                _this2.tween = new TWEEN.Tween({ h: 0 }).easing(easing).to({ h: h }, duration).onUpdate(function () {
	                    var h = this.h;
	                    mesh.uplift(h);
	                }).onComplete(function () {
	                    _this2.uplifted = true;
	                    mesh.uplift(h);
	                    resolve(_this2.node);
	                }).start();
	            });
	        }
	    }, {
	        key: "upliftNext",
	        value: function upliftNext() {
	            var _this3 = this;

	            var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -30;
	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

	            if (this.upstair) {
	                return this.upstair.upliftNext(h, duration);
	            }

	            return new Promise(function (resolve, reject) {
	                if (_this3.mesh && !_this3.vanishing) {
	                    var children = _this3.node.getNodesAt(_this3.node.depth + 1, true);
	                    var node = _this3.next(children);
	                    if (node) {
	                        _this3.upstair = _this3.spawn(node);
	                        _this3.add(_this3.upstair);
	                        return _this3.upstair.uplift(h, duration).then(resolve);
	                    } else {
	                        return reject(_this3);
	                    }
	                }
	                return resolve();
	            });
	        }
	    }, {
	        key: "upliftSeq",
	        value: function upliftSeq() {
	            var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -10;

	            var _this4 = this;

	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
	            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TWEEN.Easing.Quadratic.Out;

	            TWEEN.remove(this.tween);

	            if (this.upstair) {
	                return this.upstair.upliftSeq(h, duration, easing);
	            }

	            return new Promise(function (resolve, reject) {
	                var children = _this4.node.getNodesAt(_this4.node.depth + 1, true);
	                var node = _this4.next(children);
	                if (node) {
	                    _this4.upstair = _this4.spawn(node);
	                    _this4.add(_this4.upstair);
	                    _this4.upstair.uplift(h, duration, easing).then(function () {
	                        _this4.upstair.upliftSeq(h, duration, easing).then(resolve);
	                    });
	                } else {
	                    resolve(_this4);
	                }
	            });
	        }
	    }, {
	        key: "downlift",
	        value: function downlift(duration) {
	            var _this5 = this;

	            TWEEN.remove(this.tween);

	            return new Promise(function (resolve, reject) {
	                var mesh = _this5.mesh;
	                if (!mesh) {
	                    return resolve(_this5);
	                }

	                var h = mesh.height;
	                _this5.tween = new TWEEN.Tween({ h: h }).easing(TWEEN.Easing.Quadratic.Out).to({ h: 0 }, duration).onUpdate(function () {
	                    var h = this.h;
	                    mesh.uplift(h);
	                }).onComplete(function () {
	                    mesh.uplift(0);

	                    if (_this5.downstair) {
	                        _this5.downstair.downlift(duration).then(resolve);
	                        _this5.downstair.remove(_this5);
	                    } else {
	                        resolve(_this5);
	                    }
	                }).start();
	            });
	        }
	    }, {
	        key: "downliftAll",
	        value: function downliftAll() {
	            var _this6 = this;

	            var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
	            var easing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TWEEN.Easing.Quadratic.Out;

	            TWEEN.remove(this.tween);

	            var self = this;
	            var depth = self.position.z;
	            var mesh = self.mesh;

	            if (!mesh) {
	                return new Promise(function (resolve, reject) {
	                    setTimeout(function () {
	                        resolve(_this6);
	                    }, duration);
	                });
	            }

	            var h = mesh.height;
	            return new Promise(function (resolve, reject) {
	                var hasUpstair = _this6.upstair !== null;
	                if (hasUpstair) {
	                    _this6.upstair.downliftAll(duration, easing).then(resolve);
	                }

	                _this6.tween = new TWEEN.Tween({ depth: depth, h: h }).easing(easing).to({ depth: 0, h: 0 }, duration).onUpdate(function () {
	                    var h = this.h;
	                    mesh.uplift(h);
	                    self.position.z = this.depth;
	                }).onComplete(function () {
	                    if (!hasUpstair) {
	                        // top
	                        resolve(_this6);
	                    }
	                }).start();
	            });
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            if (this.upstair) {
	                this.upstair.dispose();
	            }
	            TWEEN.remove(this.tween);
	            this.remove(this.upstair);

	            if (this.mesh) {
	                this.mesh.material.dispose();
	                this.mesh.geometry.dispose();
	                this.remove(this.mesh);
	            }
	        }
	    }, {
	        key: "next",
	        value: function next(nodes) {

	            var l = this.node.x;
	            var r = l + this.node.width;
	            var t = this.node.y;
	            var b = t + this.node.height;

	            var candidates = nodes.filter(function (node) {
	                var children = node.getNodesAt(node.depth + 1, true);
	                return children.length > 0;
	            }).filter(function (node) {
	                // 親nodeからはみ出ていないか
	                return l <= node.x && node.x + node.width <= r && t <= node.y && node.y + node.height <= b;
	            });

	            if (candidates.length > 0) {
	                return candidates[Math.floor(Math.random() * candidates.length)];
	            }

	            return null;
	        }
	    }, {
	        key: "build",
	        value: function build(node) {
	            var mesh = new _BuildingMesh2.default(node, this._alpha);
	            mesh.material.uniforms.capture.value = this.texture;
	            mesh.position.set(0, 0, 0);
	            mesh.scale.set(node.width, node.height, 1);
	            this.add(mesh);

	            return mesh;
	        }
	    }, {
	        key: "spawn",
	        value: function spawn(node) {
	            var child = new Building(this.alpha, this.texture, node, this.width, this.height, this);

	            var centerX = this.node.x + this.node.width * 0.5;
	            var centerY = this.node.y + this.node.height * 0.5;

	            var centerX2 = node.x + node.width * 0.5;
	            var centerY2 = node.y + node.height * 0.5;

	            var dx = centerX2 - centerX;
	            var dy = centerY2 - centerY;

	            child.position.x += dx;
	            child.position.y += dy;
	            child.position.z = this.mesh.height;

	            return child;
	        }
	    }, {
	        key: "noise",
	        value: function (_noise) {
	            function noise(_x, _x2) {
	                return _noise.apply(this, arguments);
	            }

	            noise.toString = function () {
	                return _noise.toString();
	            };

	            return noise;
	        }(function (dt, t) {
	            this.vanishing = true;
	            TWEEN.remove(this.tween);

	            var p = this.position;
	            var px = p.x * 0.5 + t;
	            var py = p.y * 0.5 + t;
	            var pz = p.z * 0.2 + t;

	            var vx = noise.simplex3(px, py, pz);
	            var vy = noise.simplex3(py, pz, px);
	            var vz = noise.simplex3(pz, px, py);

	            this.velocity.x += vx * this.mass * 10;
	            this.velocity.y += vy * this.mass * 10;
	            this.velocity.z += Math.abs(vz * this.mass * 50);
	            this.velocity.clampLength(0, 100);

	            if (this.upstair) {
	                this.upstair.noise(dt, t);
	                this.upstair.world();
	            }
	        })
	    }, {
	        key: "world",
	        value: function world() {
	            this.downstair.updateMatrixWorld();

	            var m = this.matrixWorld;
	            var p = this.getWorldPosition();
	            var rot = this.getWorldRotation();

	            this.downstair.remove(this);

	            // this.bottom.parent is TownStage.container
	            // TownStage.container only translation without rotation and scale
	            this.bottom.parent.add(this);
	            p = this.bottom.parent.worldToLocal(p);

	            this.position.set(p.x, p.y, p.z);
	            this.rotation.set(rot.x, rot.y, rot.z);
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            if (!this.vanishing) return;

	            this.velocity.multiplyScalar(this.decay);

	            var vel = this.velocity.clone();
	            vel.multiplyScalar(dt);
	            this.position.add(vel);

	            var rot = new THREE.Quaternion();
	            rot.setFromAxisAngle(this.axis, vel.length() * 0.002);
	            this.quaternion.multiply(rot);

	            if (this.mesh) {
	                this.mesh.offset(dt * 10.0);
	            }

	            this.lifetime -= dt * this.mass;

	            // 0.001 is for matrix calculation error
	            var alpha = Math.max(0.001, this.lifetime / this.startLifetime);
	            this.scale.lerpVectors(zero, one, alpha);

	            if (this.upstair) {
	                this.upstair.update(dt, t);
	            }
	        }
	    }, {
	        key: "moveToRect",
	        value: function moveToRect() {
	            this.position.x = this.rect.x + this.rect.w * 0.5;
	            this.position.y = this.rect.y + this.rect.h * 0.5;
	        }

	        // 中心ほど高くなるように高さを計算する

	    }, {
	        key: "calculateCircleHeight",
	        value: function calculateCircleHeight(min, max) {
	            var distance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1400;
	            var random = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

	            var x = this.position.x;
	            var y = this.position.y;
	            var ratio = 1.0 - Math.min(Math.sqrt(x * x + y * y), distance) / distance;
	            return (max - min) * ratio + min + Math.random() * random;
	        }
	    }, {
	        key: "top",
	        get: function get() {
	            if (this.upstair !== null) {
	                return this.upstair.top;
	            }
	            return this;
	        }
	    }, {
	        key: "bottom",
	        get: function get() {
	            if (this.downstair !== null) {
	                return this.downstair.bottom;
	            }
	            return this;
	        }
	    }, {
	        key: "alpha",
	        get: function get() {
	            return this._alpha;
	        },
	        set: function set(alpha) {
	            this._alpha = this.mesh.alpha = alpha;
	            if (this.upstair) {
	                this.upstair.alpha = alpha;
	            }
	        }
	    }]);

	    return Building;
	}(THREE.Object3D);

	exports.default = Building;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rect = function () {
	    function Rect(x, y, w, h) {
	        _classCallCheck(this, Rect);

	        this.x = x;
	        this.y = y;
	        this.w = w;
	        this.h = h;
	    }

	    _createClass(Rect, [{
	        key: "intersects",
	        value: function intersects(other) {
	            return this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top;
	        }
	    }, {
	        key: "contains",
	        value: function contains(other) {
	            return this.left < other.left && other.right < this.right && this.top < other.top && other.bottom < this.bottom;
	        }
	    }, {
	        key: "rotate90",
	        value: function rotate90() {
	            var tmp = this.w;
	            this.w = this.h;
	            this.h = tmp;
	        }
	    }, {
	        key: "left",
	        get: function get() {
	            return this.x;
	        }
	    }, {
	        key: "right",
	        get: function get() {
	            return this.x + this.w;
	        }
	    }, {
	        key: "top",
	        get: function get() {
	            return this.y;
	        }
	    }, {
	        key: "bottom",
	        get: function get() {
	            return this.y + this.h;
	        }
	    }]);

	    return Rect;
	}();

	exports.default = Rect;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BuildingLine = __webpack_require__(44);

	var _BuildingLine2 = _interopRequireDefault(_BuildingLine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build() {
	    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
	    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	    var geometry = new THREE.BufferGeometry();

	    var width_half = 0.5;
	    var height_half = 0.5;
	    var gridX = w;
	    var gridY = h;
	    var gridX1 = gridX + 1;
	    var gridY1 = gridY + 1;

	    var segment_width = 1 / gridX;
	    var segment_height = 1 / gridY;

	    var ix, iy;

	    // buffers

	    var indices = [];
	    var vertices = [];
	    var uvs = [];
	    var flags = [];

	    // generate vertices and uvs
	    for (iy = 0; iy < gridY1; iy++) {
	        var y = iy * segment_height - height_half;
	        for (ix = 0; ix < gridX1; ix++) {
	            var x = ix * segment_width - width_half;
	            vertices.push(x, -y, 0);
	            uvs.push(ix / gridX);
	            uvs.push(1 - iy / gridY);
	            flags.push(1);
	        }
	    }

	    vertices.push(-width_half, height_half, 0);
	    uvs.push(0, 1);
	    flags.push(0);

	    vertices.push(width_half, height_half, 0);
	    uvs.push(1, 1);
	    flags.push(0);

	    vertices.push(width_half, -height_half, 0);
	    uvs.push(1, 0);
	    flags.push(0);

	    vertices.push(-width_half, -height_half, 0);
	    uvs.push(0, 0);
	    flags.push(0);

	    // indices
	    for (iy = 0; iy < gridY; iy++) {
	        for (ix = 0; ix < gridX; ix++) {
	            var a = ix + gridX1 * iy;
	            var b = ix + gridX1 * (iy + 1);
	            var c = ix + 1 + gridX1 * (iy + 1);
	            var d = ix + 1 + gridX1 * iy;

	            // faces
	            indices.push(a, d, b);
	            indices.push(b, d, c);
	        }
	    }

	    var lb = 0;
	    var rb = gridX;
	    var rt = gridX1 * gridY + gridX;
	    var lt = gridX1 * gridY;

	    var len = vertices.length / 3;
	    var lb2 = len - 4;
	    var rb2 = len - 3;
	    var rt2 = len - 2;
	    var lt2 = len - 1;

	    /*
	    indices.push(lt2, lt, lb2);
	    indices.push(lt, lb, lb2);
	     indices.push(rt2, rt, lt2);
	    indices.push(rt, lt, lt2);
	     indices.push(rb2, rb, rt2);
	    indices.push(rb, rt, rt2);
	     indices.push(lb2, lb, rb2);
	    indices.push(lb, rb, rb2);
	     indices.push(lb2, rb2, rt2);
	    indices.push(lt2, lb2, rt2);
	    */

	    indices.push(lt2, lb2, lt);
	    indices.push(lt, lb2, lb);

	    indices.push(rt2, lt2, rt);
	    indices.push(rt, lt2, lt);

	    indices.push(rb2, rt2, rb);
	    indices.push(rb, rt2, rt);

	    indices.push(lb2, rb2, lb);
	    indices.push(lb, rb2, rb);

	    indices.push(lb2, rt2, rb2);
	    indices.push(lt2, rt2, lb2);

	    // build geometry
	    geometry.setIndex(indices);
	    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	    geometry.addAttribute('flag', new THREE.Float32BufferAttribute(flags, 1));
	    return geometry;
	};

	var _geometry = build(1, 1);

	var BuildingMesh = function (_THREE$Mesh) {
	    _inherits(BuildingMesh, _THREE$Mesh);

	    function BuildingMesh(node) {
	        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.0;

	        _classCallCheck(this, BuildingMesh);

	        var _this = _possibleConstructorReturn(this, (BuildingMesh.__proto__ || Object.getPrototypeOf(BuildingMesh)).call(this, _geometry, new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(45),
	            fragmentShader: __webpack_require__(47),
	            uniforms: {
	                alpha: { type: "f", value: alpha },
	                time: { type: "f", value: 0.0 },
	                height: { type: "f", value: 0.0 },
	                offset: { type: "f", value: 0.0 },
	                capture: { type: "t", value: null },
	                uvScale: { type: "v2", value: node.uvScale },
	                uvOffset: { type: "v2", value: node.uvOffset },
	                lightDirection: { type: "v3", value: new THREE.Vector3(0.35, 0.15, 1.0) }
	            },
	            // side: THREE.DoubleSide,
	            transparent: true
	        })));

	        _this.line = new _BuildingLine2.default();
	        _this.add(_this.line);

	        _this.frustumCulled = _this.line.frustumCulled = false; // Avoid getting clipped
	        return _this;
	    }

	    _createClass(BuildingMesh, [{
	        key: 'uplift',
	        value: function uplift(height) {
	            this.material.uniforms.height.value = height;
	            this.line.uplift(height);
	        }
	    }, {
	        key: 'offset',
	        value: function offset(dh) {
	            var cur = this.material.uniforms.offset.value;;
	            var h = Math.min(cur + dh, -this.height * 0.5);
	            this.material.uniforms.offset.value = h;
	            this.line.offset(h);
	        }
	    }, {
	        key: 'alpha',
	        get: function get() {
	            return this.material.uniforms.alpha.value;
	        },
	        set: function set(alpha) {
	            this.material.uniforms.alpha.value = alpha;
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this.material.uniforms.height.value;
	        }
	    }]);

	    return BuildingMesh;
	}(THREE.Mesh);

	exports.default = BuildingMesh;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build() {
	    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	    var geometry = new THREE.BufferGeometry();

	    var width_half = 0.5;
	    var height_half = 0.5;

	    var vertices = [];
	    var flags = [];

	    // top

	    vertices.push(-width_half, height_half, 0);flags.push(1);
	    vertices.push(width_half, height_half, 0);flags.push(1);

	    vertices.push(width_half, height_half, 0);flags.push(1);
	    vertices.push(width_half, -height_half, 0);flags.push(1);

	    vertices.push(width_half, -height_half, 0);flags.push(1);
	    vertices.push(-width_half, -height_half, 0);flags.push(1);

	    vertices.push(-width_half, -height_half, 0);flags.push(1);
	    vertices.push(-width_half, height_half, 0);flags.push(1);

	    // side

	    vertices.push(-width_half, height_half, 0);flags.push(1);
	    vertices.push(-width_half, height_half, 0);flags.push(0);

	    vertices.push(width_half, height_half, 0);flags.push(1);
	    vertices.push(width_half, height_half, 0);flags.push(0);

	    vertices.push(width_half, -height_half, 0);flags.push(1);
	    vertices.push(width_half, -height_half, 0);flags.push(0);

	    vertices.push(-width_half, -height_half, 0);flags.push(1);
	    vertices.push(-width_half, -height_half, 0);flags.push(0);

	    // bottom 

	    vertices.push(-width_half, height_half, 0);flags.push(0);
	    vertices.push(width_half, height_half, 0);flags.push(0);

	    vertices.push(width_half, height_half, 0);flags.push(0);
	    vertices.push(width_half, -height_half, 0);flags.push(0);

	    vertices.push(width_half, -height_half, 0);flags.push(0);
	    vertices.push(-width_half, -height_half, 0);flags.push(0);

	    vertices.push(-width_half, -height_half, 0);flags.push(0);
	    vertices.push(-width_half, height_half, 0);flags.push(0);

	    // build geometry
	    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute('flag', new THREE.Float32BufferAttribute(flags, 1));
	    return geometry;
	};

	var _geometry = build(2, 2);

	var BuildingLine = function (_THREE$LineSegments) {
	    _inherits(BuildingLine, _THREE$LineSegments);

	    function BuildingLine(node) {
	        _classCallCheck(this, BuildingLine);

	        return _possibleConstructorReturn(this, (BuildingLine.__proto__ || Object.getPrototypeOf(BuildingLine)).call(this, _geometry, new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(45),
	            fragmentShader: __webpack_require__(46),
	            uniforms: {
	                height: { type: "f", value: 0.0 },
	                offset: { type: "f", value: 0.0 }
	            },
	            linewidth: 1.0
	        })));
	    }

	    _createClass(BuildingLine, [{
	        key: 'uplift',
	        value: function uplift(height) {
	            this.material.uniforms.height.value = height;
	        }
	    }, {
	        key: 'offset',
	        value: function offset(h) {
	            this.material.uniforms.offset.value = h;
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this.material.uniforms.height.value;
	        }
	    }]);

	    return BuildingLine;
	}(THREE.LineSegments);

	exports.default = BuildingLine;

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_2_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_1(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_2(vec4 x) {\n     return mod289_1_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_4(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_5 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_6 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_6;\n  vec3 i1 = min( g_1_6.xyz, l.zxy );\n  vec3 i2 = max( g_1_6.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_5.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_1(i);\n  vec4 p = permute_1_2( permute_1_2( permute_1_2(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_5.wyz - D_1_5.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_7 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_8 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_7.xy,h.z);\n  vec3 p3 = vec3(a1_1_7.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_3(vec4(dot(p0_1_8,p0_1_8), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_8 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_8,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform vec2 uvScale;\nuniform vec2 uvOffset;\n\nuniform float height;\nuniform float offset;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute float flag;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\nvarying float vAlpha;\n\nvoid main() {\n    vec3 pos = position;\n    pos.z += height * flag + offset;\n    vec4 world = modelMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * (viewMatrix * world);\n\n    vPosition = world.xyz;\n    vUv = vec2(uv.x * uvScale.x + uvOffset.x, 1.0 - (uv.y * uvScale.y + uvOffset.y));\n    vAlpha = smoothstep(0.0, 10.0, abs(height));\n}\n\n"

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\nvarying vec2 vUv2;\nvarying vec3 vPosition;\n\nvoid main() {\n    gl_FragColor = vec4(0., 0., 0., 1.0);\n}\n\n"

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D capture;\nuniform vec3 lightDirection;\nuniform float alpha;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\nvarying float vAlpha;\n\nvoid main() {\n    vec3 dx = dFdx(vPosition.xyz);\n    vec3 dy = dFdy(vPosition.xyz);\n    vec3 normal = normalize(cross(normalize(dx), normalize(dy)));\n    normal = abs(normal);\n\n    vec3 light = normalize(lightDirection);\n    float diff = clamp(dot(normal, light), 0.14, 1.0);\n\n    vec4 color = texture2D(capture, vUv);\n    gl_FragColor = vec4(color.rgb * diff, alpha * vAlpha);\n}\n\n"

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Building = __webpack_require__(41);

	var _Building2 = _interopRequireDefault(_Building);

	var _MathUtil = __webpack_require__(37);

	var _MathUtil2 = _interopRequireDefault(_MathUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BuildingControl = function (_THREE$Object3D) {
	    _inherits(BuildingControl, _THREE$Object3D);

	    function BuildingControl() {
	        _classCallCheck(this, BuildingControl);

	        var _this = _possibleConstructorReturn(this, (BuildingControl.__proto__ || Object.getPrototypeOf(BuildingControl)).call(this));

	        _this.buildings = [];
	        _this.alpha = 1.0;
	        _this.sync = true;
	        _this.duration = 1000;
	        return _this;
	    }

	    _createClass(BuildingControl, [{
	        key: "update",
	        value: function update(dt, t) {
	            if (this.buildings) {
	                this.buildings.forEach(function (building) {
	                    if (building.vanishing) {
	                        building.noise(dt, t);
	                    }
	                });
	                var len = this.buildings.length;
	                for (var i = len - 1; i >= 0; i--) {
	                    var building = this.buildings[i];
	                    building.update(dt, t);
	                    if (building.lifetime <= 0) {
	                        building.dispose();
	                        this.remove(building);
	                        this.buildings.splice(i, 1);
	                    }
	                }
	            }
	        }
	    }, {
	        key: "osc",
	        value: function osc(page, data) {

	            switch (data[0]) {
	                case "append":
	                    if (!parseInt(data[1])) {
	                        this.append(page, 1);
	                    } else {
	                        this.append(page, parseInt(data[1]));
	                    }
	                    break;

	                case "grow":
	                    this.grow();
	                    break;

	                case "destroy":
	                    this.destroy();
	                    break;

	                case "explode":
	                    this.explode();
	                    break;

	                case "surface":
	                    this.surface(data[1] == 1);
	                    break;

	                case "duration":
	                    if (data[1]) {
	                        this.duration = parseInt(data[1]);
	                    }
	                    break;

	            }
	        }
	    }, {
	        key: "append",
	        value: function append(page) {
	            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	            for (var i = 0; i < count; i++) {
	                var len = page.hierarchy.length;
	                var index = Math.floor(Math.random() * len * 0.4 + len * 0.1);
	                var nodes = page.hierarchy[index].filter(function (node) {
	                    return node.hasTranform && Math.max(node.width, node.height) < 1024;
	                });
	                if (nodes.length <= 0) return;

	                var node = nodes[Math.floor(Math.random() * nodes.length)];
	                var building = this.create(page.texture, node, page.size.width, page.size.height);
	                this.packing(building);
	                this.buildings.push(building);

	                var h = building.calculateCircleHeight(400, 650, 1400, 200);
	                building.uplift(-h, this.duration * _MathUtil2.default.randomRange(0.9, 1.1)).then(function (node) {});
	            }
	        }
	    }, {
	        key: "grow",
	        value: function grow() {
	            var buildings = this.buildings.filter(function (building) {
	                return building.uplifted && !building.vanishing && !building.mature;
	            });
	            if (buildings.length <= 0) return;

	            var building = buildings[Math.floor(Math.random() * buildings.length)];
	            building.mature = true;
	            building.upliftSeq(-50, this.duration);
	        }
	    }, {
	        key: "surface",
	        value: function surface(flag) {
	            var _this3 = this;

	            var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 800;
	            var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : TWEEN.Easing.Quadratic.Out;

	            var from = this.alpha;
	            var to = flag ? 1 : 0;
	            var stage = this;

	            TWEEN.remove(this.tween);
	            this.tween = new TWEEN.Tween({
	                alpha: from
	            }).to({
	                alpha: to
	            }, duration).easing(easing).onUpdate(function () {
	                var _this2 = this;

	                stage.alpha = this.alpha;
	                stage.buildings.forEach(function (building) {
	                    building.alpha = _this2.alpha;
	                });
	            }).onComplete(function () {
	                stage.alpha = to;
	                _this3.buildings.forEach(function (building) {
	                    building.alpha = to;
	                });
	            }).start();
	        }
	    }, {
	        key: "packing",
	        value: function packing(building) {
	            var rect = building.rect;

	            var px = rect.x;
	            var py = rect.y;

	            var pi2 = Math.PI * 2;
	            var rectangles = this.buildings.map(function (building) {
	                return building.rect;
	            });
	            var n = this.buildings.length;

	            var size = Math.max(rect.w, rect.h) * 0.5;
	            var radius = size;

	            var counter = 0;
	            var done = false;

	            var offset = Math.random() * pi2;
	            var limit = offset + pi2;
	            var step = Math.random() * 0.2 + 0.3;

	            while (!done) {
	                var cx, cy;
	                for (var rad = offset; rad < limit; rad += step) {
	                    cx = px + radius * Math.cos(rad);
	                    cy = py + radius * Math.sin(rad);

	                    rect.x = cx;
	                    rect.y = cy;

	                    var intersection = false;

	                    for (var i = 0; i < n; i++) {
	                        var other = rectangles[i];
	                        // if(rect.intersects(other) || rect.contains(other) || other.contains(rect)) {
	                        if (rect.intersects(other)) {
	                            intersection = true;
	                            break;
	                        }
	                    }

	                    if (!intersection) {
	                        done = true;
	                        break;
	                    }
	                }

	                radius += size;

	                if (counter++ > 1000) {
	                    done = true;
	                }
	            }

	            building.moveToRect();
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            var _this4 = this;

	            var easings = [TWEEN.Easing.Quadratic.Out, TWEEN.Easing.Exponential.Out, TWEEN.Easing.Linear.None];
	            var length = easings.length;
	            this.buildings.forEach(function (building) {
	                if (!building.vanishing) {
	                    var duration = _this4.duration * _MathUtil2.default.randomRange(0.75, 1.0);
	                    var easing = easings[Math.floor(Math.random() * length)];
	                    building.downliftAll(duration, easing).then(function () {
	                        building.dispose();
	                        _this4.remove(building);

	                        var idx = _this4.buildings.indexOf(building);
	                        _this4.buildings.splice(idx, 1);
	                    });
	                }
	            });
	        }
	    }, {
	        key: "explode",
	        value: function explode() {
	            this.buildings.forEach(function (building) {
	                building.noise(0, 0);
	            });
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            var _this5 = this;

	            this.buildings.forEach(function (building) {
	                _this5.remove(building);
	                building.dispose();
	            });
	        }
	    }, {
	        key: "create",
	        value: function create(texture, node, width, height) {
	            var building = new _Building2.default(this.alpha, texture, node, width, height);
	            var rotate = Math.random() < 0.5;
	            var rotate2 = Math.random() < 0.5;
	            if (!rotate) {
	                // building.rotation.set(Math.PI, 0, 0);
	                building.rotation.set(Math.PI, 0, rotate2 ? Math.PI : 0);
	            } else {
	                // building.rotation.set(Math.PI, 0, Math.PI * 0.5);
	                building.rotation.set(Math.PI, 0, rotate2 ? Math.PI * 0.5 : Math.PI * 1.5);
	                building.rect.rotate90();
	            }

	            this.add(building);

	            return building;
	        }
	    }]);

	    return BuildingControl;
	}(THREE.Object3D);

	exports.default = BuildingControl;

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PolarCoordinate = function () {
	    function PolarCoordinate(theta0, theta1, radius) {
	        var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.1;

	        _classCallCheck(this, PolarCoordinate);

	        this.theta0 = theta0;
	        this.theta1 = theta1;
	        this.radius = radius;
	        this.speed = speed;

	        this.offset = 0;
	    }

	    _createClass(PolarCoordinate, [{
	        key: "tween",
	        value: function tween(theta0, theta1, radius, duration) {
	            var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : TWEEN.Easing.Quadratic.Out;

	            var polar = this;
	            this.offset = 0;

	            return new Promise(function (resolve, reject) {
	                new TWEEN.Tween({
	                    theta0: polar.theta0,
	                    theta1: polar.theta1,
	                    radius: polar.radius
	                }).to({
	                    theta0: theta0,
	                    theta1: theta1,
	                    radius: radius
	                }, duration).easing(easing).onUpdate(function () {
	                    polar.theta0 = this.theta0;
	                    polar.theta1 = this.theta1 + polar.offset;
	                    polar.radius = this.radius;
	                }).onComplete(function () {
	                    polar.theta0 = theta0;
	                    polar.theta1 = theta1 + polar.offset;
	                    polar.radius = radius;

	                    resolve();
	                }).start();
	            });
	        }
	    }, {
	        key: "forward",
	        value: function forward(dt) {
	            this.theta1 += dt * this.speed;
	            this.offset += dt * this.speed;
	        }
	    }, {
	        key: "cartesian",
	        get: function get() {
	            return new THREE.Vector3(-this.radius * Math.cos(this.theta0) * Math.cos(this.theta1), this.radius * Math.sin(this.theta0), this.radius * Math.cos(this.theta0) * Math.sin(this.theta1));
	        }
	    }]);

	    return PolarCoordinate;
	}();

	exports.default = PolarCoordinate;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GridSystem = __webpack_require__(51);

	var _GridSystem2 = _interopRequireDefault(_GridSystem);

	var _GridMesh = __webpack_require__(53);

	var _GridMesh2 = _interopRequireDefault(_GridMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Grid = function (_THREE$Object3D) {
	    _inherits(Grid, _THREE$Object3D);

	    function Grid(renderer) {
	        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
	        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;

	        _classCallCheck(this, Grid);

	        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this));

	        _this.system = new _GridSystem2.default(renderer, count * count);
	        _this.mesh = new _GridMesh2.default(count, size);
	        _this.mesh.material.uniforms.textureHeight.value = _this.system.texture;
	        _this.add(_this.mesh);

	        _this.sync = true;
	        _this.speed = 1.0;
	        return _this;
	    }

	    _createClass(Grid, [{
	        key: "update",
	        value: function update(dt, t) {
	            this.system.update(dt * this.speed, t);
	        }
	    }, {
	        key: "osc",
	        value: function osc(page, data) {
	            switch (data[0]) {
	                case "speed":
	                    this.speed = Number(data[1]);
	                    break;

	                case "height":
	                    this.height = Number(data[1]);
	                    break;

	                case "sync":
	                    this.sync = data[1] == 1;
	                    break;

	                case "noise":
	                    this.page = page;
	                    this.noise(1.5, 1.5, 1.0);
	                    break;

	                case "circle":
	                    this.page = page;
	                    this.circle(1.0);
	                    break;

	                case "wave":
	                    break;
	            }
	        }
	    }, {
	        key: "force",
	        value: function force(x, y) {
	            var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.025;
	            var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

	            this.system.force(x, y, r, h);
	        }
	    }, {
	        key: "circle",
	        value: function circle() {
	            var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

	            this.system.circle(h);
	        }
	    }, {
	        key: "noise",
	        value: function noise() {
	            var sx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.5;
	            var sy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.5;
	            var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;

	            this.system.noise(sx, sy, h);
	        }
	    }, {
	        key: "page",
	        set: function set(page) {
	            this.mesh.material.uniforms.capture.value = page.texture;
	            this.mesh.material.uniforms.uvScale.value = page.size.height / page.size.width;
	        }
	    }, {
	        key: "height",
	        set: function set(h) {
	            this.mesh.height = h;
	        }
	    }]);

	    return Grid;
	}(THREE.Object3D);

	exports.default = Grid;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(13);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var modes = {
	    Init: 0,
	    Force: 1,
	    Line: 2,
	    Noise: 3,
	    Circle: 4,
	    Update: 5
	};

	var GridSystem = function () {
	    function GridSystem(renderer, count) {
	        _classCallCheck(this, GridSystem);

	        var size = Math.ceil(Math.sqrt(count));
	        this._sideCount = size;

	        this._count = this._sideCount * this._sideCount;

	        this.gpuCompute = new _GPUComputationRenderer2.default(size, size, renderer);

	        this.heightVar = this.gpuCompute.addVariable("textureHeight", __webpack_require__(52), null);
	        this.heightVar.material.uniforms.mode = { type: "i", value: 0 };
	        this.heightVar.material.uniforms.time = { type: "f", value: 0.0 };
	        this.heightVar.material.uniforms.dt = { type: "f", value: 0.0 };
	        this.heightVar.material.uniforms.force = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
	        this.heightVar.material.uniforms.line = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
	        this.heightVar.material.uniforms.lineThickness = { type: "f", value: 0.1 };
	        this.heightVar.material.uniforms.noise = { type: "v4", value: new THREE.Vector3(0.5, 0.5, 0.025, 1.0) };
	        this.heightVar.material.uniforms.circle = { type: "f", value: 1.0 };
	        this.heightVar.material.uniforms.speedRange = { type: "v2", value: new THREE.Vector2(0.3, 1.0) };

	        this.gpuCompute.setVariableDependencies(this.heightVar, [this.heightVar]);

	        var error = this.gpuCompute.init();
	        this.init();
	    }

	    _createClass(GridSystem, [{
	        key: "init",
	        value: function init() {
	            this.heightVar.material.uniforms.mode.value = modes.Init;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.heightVar.material.uniforms.mode.value = modes.Update;
	            this.heightVar.material.uniforms.dt.value = dt;
	            this.heightVar.material.uniforms.time.value = t;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "force",
	        value: function force(x, y) {
	            var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.025;
	            var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

	            this.heightVar.material.uniforms.mode.value = modes.Force;

	            this.heightVar.material.uniforms.force.value.x = x;
	            this.heightVar.material.uniforms.force.value.y = y;
	            this.heightVar.material.uniforms.force.value.z = r;
	            this.heightVar.material.uniforms.force.value.w = h;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "line",
	        value: function line(x, y) {
	            var thickness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;
	            var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.0;

	            this.heightVar.material.uniforms.mode.value = modes.Line;

	            this.heightVar.material.uniforms.line.value.x = x;
	            this.heightVar.material.uniforms.line.value.y = y;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "noise",
	        value: function noise(sx, sy) {
	            var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;

	            this.heightVar.material.uniforms.mode.value = modes.Noise;

	            this.heightVar.material.uniforms.noise.value.x = sx;
	            this.heightVar.material.uniforms.noise.value.y = sy;
	            this.heightVar.material.uniforms.noise.value.z = h;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "circle",
	        value: function circle() {
	            var h = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1.0;

	            this.heightVar.material.uniforms.mode.value = modes.Circle;
	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.heightVar.renderTargets[0].dispose();
	            this.heightVar.renderTargets[1].dispose();
	            this.heightVar.material.dispose();
	        }
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "texture",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.heightVar).texture;
	        }
	    }]);

	    return GridSystem;
	}();

	exports.default = GridSystem;

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_4_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_1(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_2_1(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_2_2(vec3 x) {\n  return mod289_2_1(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2_3(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_2_1(i); // Avoid truncation effects in permutation\n  vec3 p = permute_2_2( permute_2_2( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n//\n// GLSL textureless classic 2D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_3_4(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_3_5(vec4 x)\n{\n  return mod289_3_4(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_3_6(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade_3_7(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_3_8(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289_3_4(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute_3_5(permute_3_5(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy_3_9 = abs(gx) - 0.5 ;\n  vec4 tx_3_10 = floor(gx + 0.5);\n  gx = gx - tx_3_10;\n\n  vec2 g00 = vec2(gx.x,gy_3_9.x);\n  vec2 g10 = vec2(gx.y,gy_3_9.y);\n  vec2 g01 = vec2(gx.z,gy_3_9.z);\n  vec2 g11 = vec2(gx.w,gy_3_9.w);\n\n  vec4 norm = taylorInvSqrt_3_6(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade_3_7(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n\n\nfloat quadraticOut_1_11(float t) {\n  return -t * (t - 2.0);\n}\n\n\n\n\nuniform float time;\nuniform float dt;\n\n// 0: Init\n// 1: Force\n// 2: Line\n// 3: Noise\n// 4: Circle\n// 5: Update\nuniform int mode;\n\nuniform vec2 speedRange;\nuniform vec4 force;\nuniform vec4 line;\nuniform float lineThickness;\nuniform float circle;\nuniform vec4 noise;\n\nconst vec2 center = vec2(0.5, 0.5);\n\nvoid init(vec2 uv) {\n    float r = random_4_0(uv + vec2(time, dt));\n    float speed = mix(speedRange.x, speedRange.y, r);\n\n    // vec4(height, time, to, speed)\n    gl_FragColor = vec4(0.0, 0.0, 0.0, speed);\n}\n\nvoid eForce(vec2 uv) {\n    vec4 height = texture2D(textureHeight, uv);\n\n    vec2 dir = uv - force.xy;\n    float d = length(dir);\n    height.y += smoothstep(force.z, 0.0, d) * force.w;\n\n    gl_FragColor = height;\n}\n\n// https://www.shadertoy.com/view/Xd2XWR\nvoid eLine(vec2 uv) {\n    vec4 height = texture2D(textureHeight, uv);\n\n    gl_FragColor = height;\n}\n\nfloat fbm(vec2 P, float lacunarity, float gain) {\n    float sum = 0.0;\n    float amp = 1.0;\n    vec2 pp = P;\n    for(int i = 0; i < 6; i += 1) {\n        amp *= gain; \n        sum += amp * cnoise_3_8(pp);\n        pp *= lacunarity;\n    }\n    return sum;\n}\n \nfloat pattern(vec2 p) {\n    float l = 2.5;\n    float g = 0.4;\n    vec2 q = vec2(fbm(p + vec2(0.0, 0.0), l, g), fbm(p + vec2(5.2, 1.3), l, g));\n    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2), l, g), fbm(p + 4.0 * q + vec2(8.3, 2.8), l, g));\n    return fbm(p + 4.0 * r, l, g);    \n}\n\nvoid eNoise(vec2 uv) {\n    vec4 height = texture2D(textureHeight, uv);\n\n    float d = distance(center, uv.xy);\n    float h = smoothstep(0.5, 0.4, d);\n    height.y += pattern(uv * noise.xy + vec2(dt, time)) * noise.z * h;\n\n    gl_FragColor = height;\n}\n\nvoid eCircle(vec2 uv) {\n    vec4 height = texture2D(textureHeight, uv);\n\n    float d = distance(center, uv.xy);\n    float h = smoothstep(-0.02, 0.35, d) * smoothstep(0.5, 0.4, d);\n    float n = snoise_2_3(uv * 10.0 + vec2(time, dt));\n\n    height.y += (h * (0.75 + n * 0.25)) * circle;\n    height.y = max(0.0, height.y);\n\n    // height.y += pattern(uv * noise.xy + vec2(dt, time)) * noise.z;\n    gl_FragColor = height;\n}\n\nvoid update(vec2 uv) {\n    vec4 height = texture2D(textureHeight, uv);\n    height.y = max(0.0, height.y - height.w * dt); // 0.0 ~ 1.0\n    height.x = quadraticOut_1_11(min(max(0.0, height.y), 1.0));\n    gl_FragColor = height;\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else if(mode == 1) {\n        eForce(uv);\n    } else if(mode == 2) {\n        eLine(uv);\n    } else if(mode == 3) {\n        eNoise(uv);\n    } else if(mode == 4) {\n        eCircle(uv);\n    } else {\n        update(uv);\n    }\n}\n\n"

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build() {
	    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
	    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 64;

	    var geometry = new THREE.BufferGeometry();

	    var half = size * count * 0.5;

	    var vertices = [];
	    var uv = [];
	    var uv2 = [];
	    var flags = [];

	    var invC = 1 / count;

	    for (var y = 0; y < count; y++) {
	        for (var x = 0; x < count; x++) {
	            var u = (x + 0.5) * invC;
	            var v = (y + 0.5) * invC;

	            var l = x * size - half;
	            var r = l + size;
	            var t = y * size - half;
	            var b = t + size;

	            vertices.push(l, t, 0);
	            vertices.push(r, t, 0);
	            vertices.push(r, b, 0);
	            vertices.push(l, b, 0);

	            for (var i = 0; i < 4; i++) {
	                flags.push(1);
	            }

	            vertices.push(l, t, 0);
	            vertices.push(r, t, 0);
	            vertices.push(r, b, 0);
	            vertices.push(l, b, 0);

	            for (var i = 0; i < 4; i++) {
	                flags.push(0);
	            }

	            for (var i = 0; i < 8; i++) {
	                uv.push(u, v);
	            }

	            uv2.push(u, v, u + invC, v, u + invC, v + invC, u, v + invC, u, v, u + invC, v, u + invC, v + invC, u, v + invC);
	        }
	    }

	    var indices = [];
	    for (var i = 0, n = vertices.length / 3 / 8; i < n; i++) {
	        var offset = i * 8;
	        var lt = offset;
	        var rt = offset + 1;
	        var rb = offset + 2;
	        var lb = offset + 3;

	        var lt2 = offset + 4;
	        var rt2 = offset + 5;
	        var rb2 = offset + 6;
	        var lb2 = offset + 7;

	        indices.push(lt, rt, rb);
	        indices.push(lt, rb, lb);

	        // sides
	        indices.push(lt2, lt, lb2);
	        indices.push(lt, lb, lb2);

	        indices.push(rt2, rt, lt2);
	        indices.push(rt, lt, lt2);

	        indices.push(rb2, rb, rt2);
	        indices.push(rb, rt, rt2);

	        indices.push(lb2, lb, rb2);
	        indices.push(lb, rb, rb2);

	        indices.push(lb2, rb2, rt2);
	        indices.push(lt2, lb2, rt2);
	    }

	    // build geometry
	    geometry.setIndex(indices);
	    geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
	    geometry.addAttribute("uv2", new THREE.Float32BufferAttribute(uv2, 2));
	    geometry.addAttribute("flag", new THREE.Float32BufferAttribute(flags, 1));

	    return geometry;
	};

	var GridMesh = function (_THREE$Mesh) {
	    _inherits(GridMesh, _THREE$Mesh);

	    function GridMesh() {
	        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 512;
	        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

	        _classCallCheck(this, GridMesh);

	        return _possibleConstructorReturn(this, (GridMesh.__proto__ || Object.getPrototypeOf(GridMesh)).call(this, build(count, size), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(54),
	            fragmentShader: __webpack_require__(55),
	            uniforms: {
	                capture: { type: "t", value: null },
	                uvScale: { type: "f", value: 1.0 },
	                textureHeight: { type: "t", value: null },
	                height: { type: "f", value: 400.0 },
	                lightDirection: { type: "v3", value: new THREE.Vector3(0.35, 0.15, 1.0) }
	            },
	            transparent: true
	        })));
	    }

	    _createClass(GridMesh, [{
	        key: "height",
	        set: function set(h) {
	            this.material.uniforms.height.value = h;
	        }
	    }]);

	    return GridMesh;
	}(THREE.Mesh);

	exports.default = GridMesh;

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.1415926\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureHeight;\nuniform float height;\nuniform float uvScale;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec2 uv2;\nattribute float flag;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\nvarying float vAlpha;\n\nvoid main() {\n    vec3 pos = position;\n\n    vec4 p = texture2D(textureHeight, uv);\n    float h = height * p.x;\n    pos.z += h * flag;\n\n    vec4 world = modelMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * (viewMatrix * world);\n\n    vPosition = world.xyz;\n    vUv = uv2 * vec2(uvScale, 1.0);\n    vAlpha = smoothstep(0.0, 0.1, p.x);\n}\n\n"

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = "#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform sampler2D capture;\nuniform vec3 lightDirection;\n\nvarying vec3 vPosition;\nvarying vec2 vUv;\nvarying float vAlpha;\n\nvoid main() {\n    vec3 dx = dFdx(vPosition.xyz);\n    vec3 dy = dFdy(vPosition.xyz);\n    vec3 normal = normalize(cross(normalize(dx), normalize(dy)));\n    normal = abs(normal);\n\n    vec3 light = normalize(lightDirection);\n    float d = clamp(dot(normal, light), 0.14, 1.0);\n\n    vec3 color = texture2D(capture, vUv).rgb;\n    gl_FragColor = vec4(color * d, vAlpha);\n}\n\n"

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DOMBoxParticleSystem = exports.DOMBoxParticleMode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GPUComputationRenderer = __webpack_require__(13);

	var _GPUComputationRenderer2 = _interopRequireDefault(_GPUComputationRenderer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var velocity = "textureVelocity";
	var rotation = "textureRotation";
	var position = "texturePosition";

	var DOMBoxParticleMode = {
	    Init: 0,
	    Field: 1,
	    Sphere: 2,
	    Model: 3
	};

	var DOMBoxParticleSystem = function () {
	    function DOMBoxParticleSystem(renderer, count) {
	        _classCallCheck(this, DOMBoxParticleSystem);

	        var size = Math.ceil(Math.sqrt(count));
	        this._sideCount = size;
	        this._count = this._sideCount * this._sideCount;

	        this.gpuCompute = new _GPUComputationRenderer2.default(size, size, renderer);

	        this.velVar = this.gpuCompute.addVariable(velocity, __webpack_require__(57), null);
	        this.rotVar = this.gpuCompute.addVariable(rotation, __webpack_require__(58), null);
	        this.posVar = this.gpuCompute.addVariable(position, __webpack_require__(59), null);

	        this.gpuCompute.setVariableDependencies(this.velVar, [this.velVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.rotVar, [this.velVar, this.rotVar, this.posVar]);
	        this.gpuCompute.setVariableDependencies(this.posVar, [this.velVar, this.posVar]);

	        var error = this.gpuCompute.init();
	        this.setup();

	        this.velVar.material.uniforms.mode.value = DOMBoxParticleMode.Init;
	        this.gpuCompute.compute();

	        this.velVar.material.uniforms.mode.value = DOMBoxParticleMode.Field;
	    }

	    _createClass(DOMBoxParticleSystem, [{
	        key: "setup",
	        value: function setup() {
	            this.posVar.material.uniforms.throttle = { type: "f", value: 0.5 };
	            this.posVar.material.uniforms.emitter = { type: "v2", value: new THREE.Vector3(3000, 1000) };
	            this.posVar.material.uniforms.step = { type: "f", value: 0.0 };

	            this.velVar.material.uniforms.speed = this.posVar.material.uniforms.speed = this.rotVar.material.uniforms.speed = { type: "f", value: 0.15 };
	            this.velVar.material.uniforms.time = this.posVar.material.uniforms.time = this.rotVar.material.uniforms.time = { type: "f", value: 0.0 };
	            this.velVar.material.uniforms.dt = this.posVar.material.uniforms.dt = this.rotVar.material.uniforms.dt = { type: "f", value: 0.0 };
	            this.velVar.material.uniforms.mode = this.posVar.material.uniforms.mode = this.rotVar.material.uniforms.mode = { type: "i", value: DOMBoxParticleMode.Init };

	            this.velVar.material.uniforms.noiseScale = { type: "v3", value: new THREE.Vector3(0.1, 0.1, 0.1) };
	            this.velVar.material.uniforms.noiseSpeed = { type: "f", value: 0.5 };
	            this.velVar.material.uniforms.noiseIntensity = { type: "v3", value: new THREE.Vector3(220.8, 220.8, 250.8) };
	            this.velVar.material.uniforms.sphere = this.posVar.material.uniforms.sphere = { type: "v4", value: new THREE.Vector4(750, 500.0, 22.5, 150.0) };
	            this.velVar.material.uniforms.textureModel = this.posVar.material.uniforms.textureModel = { type: "t", value: null };

	            // v2: (size, height)
	            this.velVar.material.uniforms.model = this.posVar.material.uniforms.model = { type: "v2", value: new THREE.Vector2(1200, 800) };
	            this.velVar.material.uniforms.decay = { type: "f", value: 0.98 };
	        }
	    }, {
	        key: "step",
	        value: function step() {
	            this.posVar.material.uniforms.step.value += 1.0;
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.velVar.material.uniforms.dt.value = dt;
	            this.velVar.material.uniforms.time.value = t;

	            this.gpuCompute.compute();
	        }
	    }, {
	        key: "sideCount",
	        get: function get() {
	            return this._sideCount;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this._count;
	        }
	    }, {
	        key: "position",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.posVar).texture;
	        }
	    }, {
	        key: "velocity",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.velVar).texture;
	        }
	    }, {
	        key: "rotation",
	        get: function get() {
	            return this.gpuCompute.getCurrentRenderTarget(this.rotVar).texture;
	        }
	    }, {
	        key: "throttle",
	        get: function get() {
	            return this.posVar.material.uniforms.throttle.value;
	        },
	        set: function set(t) {
	            this.posVar.material.uniforms.throttle.value = t;
	        }
	    }, {
	        key: "mode",
	        get: function get() {
	            return this.velVar.material.uniforms.mode.value;
	        },
	        set: function set(mode) {
	            this.velVar.material.uniforms.mode.value = mode;
	        }
	    }, {
	        key: "model",
	        get: function get() {
	            return this.velVar.material.uniforms.textureModel.value;
	        },
	        set: function set(texture) {
	            this.velVar.material.uniforms.textureModel.value = texture;
	        }
	    }, {
	        key: "size",
	        get: function get() {
	            return this.velVar.material.uniforms.model.value.x;
	        },
	        set: function set(v) {
	            this.velVar.material.uniforms.model.value.x = v;
	        }
	    }, {
	        key: "height",
	        set: function set(v) {
	            this.velVar.material.uniforms.model.value.y = v;
	        }
	    }, {
	        key: "sphere",
	        get: function get() {
	            return this.velVar.material.uniforms.sphere.value;
	        },
	        set: function set(v) {
	            this.velVar.material.uniforms.sphere.value = v;
	        }
	    }, {
	        key: "speed",
	        get: function get() {
	            return this.velVar.material.uniforms.speed.value;
	        },
	        set: function set(v) {
	            return this.velVar.material.uniforms.speed.value = v;
	        }
	    }]);

	    return DOMBoxParticleSystem;
	}();

	exports.DOMBoxParticleMode = DOMBoxParticleMode;
	exports.DOMBoxParticleSystem = DOMBoxParticleSystem;

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\nhighp float random_2_8(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.14159265359\n#define PI2 6.28318530718\n\nuniform float time;\nuniform float dt;\nuniform int mode;\n\nuniform float speed;\n\nuniform float noiseSpeed;\nuniform vec3 noiseScale;\nuniform vec3 noiseIntensity;\n\nuniform vec4 sphere;\n\nuniform float decay;\n\nuniform sampler2D textureModel;\nuniform vec3 model;\n\nvoid init(vec2 uv) {\n    float r = random_2_8(uv * 33.15 + vec2(time, dt)) * 0.25 + 0.75;\n    gl_FragColor = vec4(0.0, 0.0, 0.0, r);\n}\n\nvec3 uUp(vec4 pos, vec4 vel, vec2 uv) {\n    vec3 seed = pos.xyz * noiseScale;\n    float t = time * noiseSpeed;\n    vec3 force = vec3(\n        snoise_1_3(seed + vec3(t, 0, 0)), \n        snoise_1_3(seed + vec3(t, t, 0)), \n        abs(snoise_1_3(seed + vec3(0, 0, t)))\n    ) * noiseIntensity;\n    return force * dt * vel.w;\n}\n\nvec3 uSphere(vec4 pos, vec4 vel, vec2 uv) {\n    vec3 seed = pos.xyz * noiseScale;\n    float t = time * noiseSpeed;\n    vec3 force = vec3(\n        snoise_1_3(seed + vec3(t, 0, 0)), \n        snoise_1_3(seed + vec3(t, t, 0)), \n        snoise_1_3(seed + vec3(0, 0, t))\n    ) * sphere.z;\n    force.z += sphere.w * (1.0 - pos.w);\n\n    return force * dt * vel.w;\n}\n\nvec3 eModel(vec2 uv) {\n    vec3 p = texture2D(textureModel, uv).xyz;\n    p.y = 1.0 - p.y;\n    p -= 0.5;\n    p *= model.x;\n    return p.xzy + vec3(0.0, 0.0, model.y);\n}\n\nvec3 uModel(vec4 pos, vec4 vel, vec2 uv) {\n    vec3 to = eModel(uv);\n    vec3 dir = (to.xyz - pos.xyz);\n    if(length(dir) < 100.0) {\n        return dir * dt * vel.w * 0.1;\n    }\n    return vel.xyz + dir * dt * vel.w;\n}\n\nvoid update(vec2 uv) {\n    vec4 pos = texture2D(texturePosition, uv);\n    if(pos.a < 0.0) {\n        init(uv);\n    } else {\n        vec4 vel = texture2D(textureVelocity, uv);\n\n        if(mode == 1) {\n            vel.xyz += uUp(pos, vel, uv);\n        } else if(mode == 2) {\n            vel.xyz += uSphere(pos, vel, uv);\n        } else if(mode == 3) {\n            vel.xyz += uSphere(pos, vel, uv);\n            // vel.xyz = uModel(pos, vel, uv);\n        }\n        vel.xyz *= decay;\n\n        gl_FragColor = vel;\n    }\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        update(uv);\n    }\n}\n\n"

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.1415926\n#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nvec3 rotate_vector_at(vec3 v, vec3 center, vec4 r) {\n\tvec3 dir = v - center;\n\treturn center + rotate_vector(dir, r);\n}\n\n// A given angle of rotation about a given axis\nvec4 rotate_angle_axis(float angle, vec3 axis) {\n\tfloat sn = sin(angle * 0.5);\n\tfloat cs = cos(angle * 0.5);\n\treturn vec4(axis * sn, cs);\n}\n\nvec4 q_conj(vec4 q) {\n\treturn vec4(-q.x, -q.y, -q.z, q.w);\n}\n\nuniform float time;\nuniform float dt;\n\n// \nuniform int mode;\n\nvoid init(vec2 uv) {\n    gl_FragColor = QUATERNION_IDENTITY;\n}\n\nvoid rotate(vec2 uv) {\n    vec4 v = texture2D(textureVelocity, uv);\n    vec4 r = texture2D(textureRotation, uv);\n\n    float theta = (0.01 + length(v.xyz) * 0.005) * dt;\n    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));\n\n    gl_FragColor = normalize(qmul(dq, r));\n}\n\nvoid rModel(vec2 uv) {\n    vec4 v = texture2D(textureVelocity, uv);\n    float theta = (length(v.xyz) * 0.001) * dt;\n\n    vec4 dq = vec4(random_point_on_sphere(uv) * sin(theta), cos(theta));\n\n    vec4 r = texture2D(textureRotation, uv);\n\n    // gl_FragColor = normalize(qmul(dq, r));\n    gl_FragColor = mix(normalize(qmul(dq, r)), QUATERNION_IDENTITY, dt);\n    // gl_FragColor = mix(r, QUATERNION_IDENTITY, dt);\n}\n\nvoid update(vec2 uv) {\n    if(mode == 3) {\n        rModel(uv);\n    } else {\n        rotate(uv);\n    }\n}\n\nvoid main() {\n    vec2 uv = gl_FragCoord.xy / resolution.xy;\n    if(mode == 0) {\n        init(uv);\n    } else {\n        update(uv);\n    }\n}\n\n"

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nhighp float random_1_0(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n\n\n#define PI 3.14159265359\n#define PI2 6.28318530718\n\nuniform int mode;\nuniform float speed;\nuniform float time;\nuniform float step;\nuniform float dt;\nuniform float throttle;\n\nuniform vec2 emitter; // x = distance, y = height\nuniform vec4 sphere;\n\nuniform sampler2D textureModel;\nuniform vec3 model;\n\nvec3 eBounds (vec2 uv) {\n    vec2 seed = uv * 11.3 + vec2(dt, time);\n\n    float r = random_1_0(seed.xy + vec2(time, 0.0)) * PI2;\n    float r2 = random_1_0(seed.yx + vec2(time, dt));\n    float r3 = random_1_0(seed.xy + vec2(dt, time));\n\n    return vec3(\n        cos(r) * emitter.x * r2,\n        sin(r) * emitter.x * r2,\n        r3 * emitter.y\n    );\n}\n\nconst vec3 center = vec3(0.0, 0.0, 750.0);\n\nvec3 random_point_on_sphere(vec2 uv) {\n    float u = random_1_0(uv) * 2.0 - 1.0;\n    float theta = random_1_0(uv + 0.333) * PI * 2.0;\n    float u2 = sqrt(1.0 - u * u);\n    return vec3(u2 * cos(theta), u2 * sin(theta), u);\n}\n\nvec3 eSphere(vec2 uv) {\n    float len = random_1_0(uv * 33.1);\n    return vec3(0.0, 0.0, sphere.x) + random_point_on_sphere(uv) * (len * sphere.y);\n}\n\nvec3 eModel(vec2 px, vec2 uv) {\n    vec3 p = texture2D(textureModel, uv + vec2(0.0, step * px.y)).xyz;\n    p.y = 1.0 - p.y;\n    p -= 0.5;\n    p *= model.x;\n    return p.xzy + vec3(0.0, 0.0, model.y);\n}\n\n// emit\nvoid init(vec2 px, vec2 uv) {\n    vec4 p = vec4(0.0, 0.0, 0.0, 1.0);\n\n    if(mode <= 1) {\n        p.xyz = eBounds(uv);\n    } else if(mode == 2) {\n        p.xyz = eSphere(uv);\n    } else if(mode == 3) {\n        p.xyz = eModel(px, uv);\n    }\n\n    // Throttling: discards particle emission by adding offset.\n    if(uv.x > throttle) {\n        p += vec4(1e8, 1e8, 1e8, -1);\n    }\n    gl_FragColor = p;\n}\n\nvoid update(vec2 px, vec2 uv) {\n    vec4 pos = texture2D(texturePosition, uv);\n    vec4 vel = texture2D(textureVelocity, uv);\n    pos.w -= dt * speed * vel.w;\n    if(pos.w < 0.0)  {\n        init(px, uv);\n    } else {\n        if(mode == 3) {\n            vec3 to = eModel(px, uv);\n            pos.xyz = mix(pos.xyz, to, dt);\n        } else {\n            pos.xyz += vel.xyz * dt;\n        }\n\n        gl_FragColor = pos;\n    }\n}\n\nvoid main() {\n    vec2 px = 1.0 / resolution.xy;\n    vec2 uv = gl_FragCoord.xy * px;\n    if(mode == 0) {\n        init(px, uv);\n    } else {\n        update(px, uv);\n    }\n}\n"

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DOMBoxParticleSystem = __webpack_require__(56);

	var _DOMBoxParticleMesh = __webpack_require__(61);

	var _DOMBoxParticleMesh2 = _interopRequireDefault(_DOMBoxParticleMesh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DOMBoxParticle = function (_THREE$Object3D) {
	    _inherits(DOMBoxParticle, _THREE$Object3D);

	    // constructor(renderer, pages, count = 16384) {
	    function DOMBoxParticle(renderer, pages) {
	        var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4096;

	        _classCallCheck(this, DOMBoxParticle);

	        var _this = _possibleConstructorReturn(this, (DOMBoxParticle.__proto__ || Object.getPrototypeOf(DOMBoxParticle)).call(this)); // 64 * 64


	        _this.system = new _DOMBoxParticleSystem.DOMBoxParticleSystem(renderer, count);

	        var size = 128;

	        var nodes = [];

	        for (var i = 0, n = pages.length; i < n; i++) {
	            var page = pages[i];
	            page.root.traverse(function (node) {
	                if (node.hasTranform && !node.text && node.width < size && node.height < size) {
	                    nodes.push({
	                        node: node,
	                        page: i
	                    });
	                }
	            });
	        }

	        _this.mesh = new _DOMBoxParticleMesh2.default(pages, nodes, _this.system.sideCount);
	        _this.mesh.frustumCulled = false;
	        _this.mesh.material.uniforms.texturePosition.value = _this.system.position;
	        _this.mesh.material.uniforms.textureVelocity.value = _this.system.velocity;
	        _this.mesh.material.uniforms.textureRotation.value = _this.system.rotation;

	        _this.add(_this.mesh);
	        _this.models = [];
	        _this.loadModels(["../dist/textures/Head.png", "../dist/textures/Stickman.png", "../dist/textures/Hand.png", "../dist/textures/Heart.png", "../dist/textures/Chimp.png"]);
	        return _this;
	    }

	    _createClass(DOMBoxParticle, [{
	        key: "loadModels",
	        value: function loadModels(pathes) {
	            var _this2 = this;

	            Promise.all(pathes.map(function (path) {
	                return _this2.load(path);
	            })).then(function (models) {
	                _this2.models = models;
	                _this2.model = 0;
	            });
	        }
	    }, {
	        key: "load",
	        value: function load(path) {
	            return new Promise(function (resolve, reject) {
	                var loader = new THREE.TextureLoader();
	                loader.load(path, function (texture) {
	                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	                    resolve(texture);
	                });
	            });
	        }
	    }, {
	        key: "update",
	        value: function update(dt, t) {
	            this.system.update(dt, t);
	        }
	    }, {
	        key: "randomize",
	        value: function randomize() {
	            this.mode = _DOMBoxParticleSystem.DOMBoxParticleMode.Model;
	            this.model = this.another(this.models.map(function (tex, i) {
	                return i;
	            }), this.model);
	        }
	    }, {
	        key: "another",
	        value: function another(candidates, v) {
	            candidates.splice(candidates.indexOf(v), 1);
	            return candidates[Math.floor(Math.random() * candidates.length)];
	        }
	    }, {
	        key: "osc",
	        value: function osc(page, data) {
	            switch (data[0]) {
	                case "mode":
	                    this.mode = parseInt(data[1]);
	                    break;

	                case "throttle":
	                    this.throttle = Number(data[1]);
	                    break;

	                case "sphere":
	                    if (data[1] == "height") {} else if (data[1] == "size") {} else if (data[1] == "noise") {
	                        this.system.velVar.material.uniforms.sphere.value.z = data[2];
	                    } else if (data[1] == "intensity") {
	                        this.system.velVar.material.uniforms.sphere.value.w = data[2];
	                    }
	                    break;

	                case "scale":
	                    this.tweenScale(data[1]);
	                    break;

	                case "speed":
	                    this.system.speed = data[1];
	                    break;

	                case "model":
	                    if (data[1] == "type") {
	                        var index = parseInt(data[2]);
	                        if (index < 0) {
	                            this.randomize();
	                        } else {
	                            this.model = index % this.models.length;
	                        }
	                    } else if (data[1] == "size") {
	                        this.system.size = data[2];
	                    } else if (data[1] == "height") {
	                        this.system.height = data[2];
	                    } else if (data[1] == "step") {
	                        this.system.step();
	                    }
	                    break;

	            }
	        }
	    }, {
	        key: "tweenScale",
	        value: function tweenScale(to) {
	            var mesh = this.mesh;
	            var from = mesh.material.uniforms.scale.value;
	            TWEEN.remove(this.tw);
	            this.tw = new TWEEN.Tween({
	                v: from
	            }).to({
	                v: to
	            }, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
	                mesh.material.uniforms.scale.value = this.v;
	            }).onComplete(function () {
	                mesh.material.uniforms.scale.value = to;
	            }).start();
	        }
	    }, {
	        key: "throttle",
	        get: function get() {
	            return this.system.throttle;
	        }

	        // t: 0.0 ~ 1.0
	        ,
	        set: function set(t) {
	            this.system.throttle = t;
	        }
	    }, {
	        key: "mode",
	        get: function get() {
	            return this.system.mode;
	        },
	        set: function set(mode) {
	            this.system.mode = mode;
	        }
	    }, {
	        key: "model",
	        get: function get() {
	            if (!this.models) return 0;
	            return this.models.indexOf(this.system.model);
	        },
	        set: function set(index) {
	            this.system.model = this.models[index];
	        }
	    }]);

	    return DOMBoxParticle;
	}(THREE.Object3D);

	exports.default = DOMBoxParticle;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build(pages, nodes) {
	    var sideCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 128;

	    var geometry = new THREE.BufferGeometry();

	    var indices = [];
	    var vertices = [];
	    var voxels = [];

	    var uv = [];
	    var uv2 = [];
	    var unit = [];

	    var inv = 1 / sideCount;
	    var hs = 0.5;

	    var index = 0;
	    var nodeLength = nodes.length;

	    for (var y = 0; y < sideCount; y++) {
	        for (var x = 0; x < sideCount; x++) {
	            var element = nodes[index++ % nodeLength];

	            var node = element.node;
	            var scale = node.uvScale;
	            var offset = node.uvOffset;

	            var hw = node.width * 0.5;
	            var hh = node.height * 0.5;
	            var hd = Math.min(hw, hh);

	            // top
	            vertices.push(-hw, -hh, hd); // lt
	            vertices.push(hw, -hh, hd); // rt
	            vertices.push(hw, hh, hd); // rb
	            vertices.push(-hw, hh, hd); // lb

	            voxels.push(-hs, -hs, hs); // lt
	            voxels.push(hs, -hs, hs); // rt
	            voxels.push(hs, hs, hs); // rb
	            voxels.push(-hs, hs, hs); // lb

	            // bottom
	            vertices.push(-hw, -hh, -hd); // lt
	            vertices.push(hw, -hh, -hd); // rt
	            vertices.push(hw, hh, -hd); // rb
	            vertices.push(-hw, hh, -hd); // lb

	            voxels.push(-hs, -hs, -hs); // lt
	            voxels.push(hs, -hs, -hs); // rt
	            voxels.push(hs, hs, -hs); // rb
	            voxels.push(-hs, hs, -hs); // lb

	            // top
	            uv.push(offset.x + scale.x, 1.0 - offset.y);
	            uv.push(offset.x, 1.0 - offset.y);
	            uv.push(offset.x, 1.0 - (offset.y + scale.y));
	            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));

	            // bottom
	            uv.push(offset.x, 1.0 - offset.y);
	            uv.push(offset.x + scale.x, 1.0 - offset.y);
	            uv.push(offset.x + scale.x, 1.0 - (offset.y + scale.y));
	            uv.push(offset.x, 1.0 - (offset.y + scale.y));

	            var u = (x + 0.5) * inv;
	            var v = (y + 0.5) * inv;

	            for (var i = 0; i < 8; i++) {
	                uv2.push(u, v);
	            }

	            for (var i = 0; i < 8; i++) {
	                unit.push(element.page);
	            }
	        }
	    }

	    var len = vertices.length / 3;
	    for (var i = 0; i < len; i += 8) {
	        var a = i,
	            b = i + 1,
	            c = i + 2,
	            d = i + 3;
	        var e = i + 4,
	            f = i + 5,
	            g = i + 6,
	            h = i + 7;

	        // up down
	        indices.push(a, b, c);
	        indices.push(d, a, c);

	        indices.push(e, g, f);
	        indices.push(h, g, e);

	        // front back
	        indices.push(a, e, b);
	        indices.push(e, f, b);

	        indices.push(c, g, d);
	        indices.push(g, h, d);

	        // left right
	        indices.push(c, b, g);
	        indices.push(f, g, b);

	        indices.push(e, a, d);
	        indices.push(h, e, d);
	    }

	    // build geometry
	    geometry.setIndex(indices);
	    geometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	    geometry.addAttribute("voxel", new THREE.Float32BufferAttribute(voxels, 3));
	    geometry.addAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
	    geometry.addAttribute("uv2", new THREE.Float32BufferAttribute(uv2, 2));
	    geometry.addAttribute("unit", new THREE.Float32BufferAttribute(unit, 1));

	    return geometry;
	};

	var DOMBoxParticleMesh = function (_THREE$Mesh) {
	    _inherits(DOMBoxParticleMesh, _THREE$Mesh);

	    function DOMBoxParticleMesh(pages, nodes, sideCount) {
	        _classCallCheck(this, DOMBoxParticleMesh);

	        return _possibleConstructorReturn(this, (DOMBoxParticleMesh.__proto__ || Object.getPrototypeOf(DOMBoxParticleMesh)).call(this, build(pages, nodes, sideCount), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(62),
	            fragmentShader: __webpack_require__(63),
	            uniforms: {
	                captures: { type: "tv", value: pages.map(function (page) {
	                        return page.texture;
	                    }) },
	                lightDirection: { type: "v3", value: new THREE.Vector3(0.35, 0.15, 1.0) },
	                texturePosition: { type: "t", value: null },
	                textureRotation: { type: "t", value: null },
	                textureVelocity: { type: "t", value: null },
	                scale: { type: "f", value: 0.4 }
	            }
	        })));
	    }

	    return DOMBoxParticleMesh;
	}(THREE.Mesh);

	exports.default = DOMBoxParticleMesh;

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\n// Quaternion multiplication\n// http://mathworld.wolfram.com/Quaternion.html\nvec4 qmul(vec4 q1, vec4 q2) {\n\treturn vec4(\n\t\tq2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),\n\t\tq1.w * q2.w - dot(q1.xyz, q2.xyz)\n\t);\n}\n\n// Vector rotation with a quaternion\n// http://mathworld.wolfram.com/Quaternion.html\nvec3 rotate_vector(vec3 v, vec4 r) {\n\tvec4 r_c = r * vec4(-1, -1, -1, 1);\n\treturn qmul(r, qmul(vec4(v, 0), r_c)).xyz;\n}\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureVelocity;\nuniform sampler2D textureRotation;\nuniform sampler2D texturePosition;\n\nuniform float scale;\n\nattribute vec3 position;\nattribute vec3 voxel;\nattribute vec2 uv;\nattribute vec2 uv2;\nattribute float unit;\n\nvarying vec2 vUv; // uv for capture\nvarying float vUnit;\nvarying vec3 vPosition;\n\nvoid main() {\n    vec4 pos = texture2D(texturePosition, uv2);\n    vec4 rot = texture2D(textureRotation, uv2);\n\n    float size = scale * smoothstep(0.0, 0.2, pos.w) * smoothstep(1.0, 0.8, pos.w);\n    vec3 p = rotate_vector(position, rot) * size + pos.xyz;\n    vec4 world = modelMatrix * vec4(p, 1.0);\n    gl_Position = projectionMatrix * (viewMatrix * world);\n\n    vUv = uv;\n    vUnit = unit;\n    vPosition = world.xyz;\n}\n"

/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = "#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\n// equals to TownStage.js pages length\nuniform sampler2D captures[6];\nuniform vec3 lightDirection;\n\nvarying vec2 vUv;\nvarying float vUnit;\nvarying vec3 vPosition;\n\nvoid main() {\n    vec3 dx = dFdx(vPosition.xyz);\n    vec3 dy = dFdy(vPosition.xyz);\n    vec3 normal = normalize(cross(normalize(dx), normalize(dy)));\n    normal = abs(normal);\n\n    vec3 light = normalize(lightDirection);\n    float diff = clamp(dot(normal, light), 0.14, 1.0);\n\n    vec4 color = vec4(0, 0, 0, 0);\n    if(vUnit < 0.5) {\n        color = texture2D(captures[0], vUv);\n    } else if(vUnit < 1.5) {\n        color = texture2D(captures[1], vUv);\n    } else if(vUnit < 2.5) {\n        color = texture2D(captures[2], vUv);\n    } else if(vUnit < 3.5) {\n        color = texture2D(captures[3], vUv);\n    } else if(vUnit < 4.5) {\n        color = texture2D(captures[4], vUv);\n    } else if(vUnit < 5.5) {\n        color = texture2D(captures[5], vUv);\n    }\n    color.rgb *= diff;\n    gl_FragColor = color;\n}\n"

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var build = function build() {
	    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
	    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

	    var geometry = new THREE.BufferGeometry();

	    var vertices = [];
	    var uv = [];

	    var invH = 1 / h;
	    var invW = 1 / w;
	    var py, py2;
	    var px, px2;

	    for (var y = 0, n = h - 1; y < n; y++) {
	        py = y * invH - 0.5;
	        py2 = (y + 1) * invH - 0.5;

	        for (var x = 0, m = w - 1; x < m; x++) {
	            px = x * invW - 0.5;
	            px2 = (x + 1) * invW - 0.5;

	            // vertical
	            vertices.push(px, py, 0);
	            vertices.push(px, py2, 0);

	            // horizontal
	            vertices.push(px, py, 0);
	            vertices.push(px2, py, 0);
	        }

	        // last column
	        vertices.push(px2, py, 0);
	        vertices.push(px2, py2, 0);
	    }

	    // last row
	    for (var x = 0, m = w - 1; x < m; x++) {
	        px = x * invW - 0.5;
	        px2 = (x + 1) * invW - 0.5;

	        vertices.push(px, py2, 0);
	        vertices.push(px2, py2, 0);
	    }

	    // build geometry
	    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	    return geometry;
	};

	var GridLine = function (_THREE$LineSegments) {
	    _inherits(GridLine, _THREE$LineSegments);

	    function GridLine(w, h) {
	        _classCallCheck(this, GridLine);

	        return _possibleConstructorReturn(this, (GridLine.__proto__ || Object.getPrototypeOf(GridLine)).call(this, build(w, h), new THREE.RawShaderMaterial({
	            vertexShader: __webpack_require__(65),
	            fragmentShader: __webpack_require__(66),
	            uniforms: {
	                texturePressure: { type: "t", value: null },
	                textureVelocity: { type: "t", value: null }
	            },
	            linewidth: 1.0,
	            transparent: true
	        })));
	    }

	    _createClass(GridLine, [{
	        key: "noise",
	        value: function noise(n) {}
	    }, {
	        key: "dispose",
	        value: function dispose() {
	            this.mesh.material.dispose();
	            this.mesh.geometry.dispose();
	        }
	    }]);

	    return GridLine;
	}(THREE.LineSegments);

	exports.default = GridLine;

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform mat4 projectionMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\n\nuniform sampler2D textureVelocity;\nuniform sampler2D texturePressure;\n\nattribute vec3 position;\n\nvarying float vDistance;\n\nvoid main() {\n    vec3 pos = position;\n    vec2 uv = pos.xy + 0.5;\n    vDistance = length(pos.xy) / 0.5;\n\n    float pressure = texture2D(texturePressure, uv).x;\n    pos.z -= clamp(pressure, -10.0, 10.0);\n\n    vec4 world = modelMatrix * vec4(pos, 1.0);\n    gl_Position = projectionMatrix * (viewMatrix * world);\n}\n\n"

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying float vDistance;\n\nvoid main() {\n    gl_FragColor = vec4(0, 0, 0, (1.0 - vDistance));\n}\n\n"

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform float offset;\nuniform float darkness;\nuniform sampler2D tDiffuse;\n\nvarying vec2 vUv;\n\nvoid main() {\n    // Eskil's vignette\n\tvec4 texel = texture2D(tDiffuse, vUv);\n\tvec2 uv = (vUv - vec2(0.5)) * vec2(offset);\n\tgl_FragColor = vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a);\n}\n\n"

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nuniform sampler2D tDiffuse;\nuniform sampler2D tNoise;\nuniform float t;\nuniform float amplitude;\nuniform float time;\nuniform float speed;\n\nvarying vec2 vUv;\n\nvec2 loop(vec2 p) {\n    p.x = mod(p.x, 1.0);\n    p.y = mod(p.y, 1.0);\n    return p;\n}\n\n// https://www.shadertoy.com/view/4t23Rc\nvec4 rgbShift(vec2 p, vec4 shift) {\n    shift *= 2.0 * shift.w - 1.0;\n\n    vec2 rs = vec2(shift.x, -shift.y);\n    vec2 gs = vec2(shift.y, -shift.z);\n    vec2 bs = vec2(shift.z, -shift.x);\n    \n    float r = texture2D(tDiffuse, loop(p + rs)).x;\n    float g = texture2D(tDiffuse, loop(p + gs)).y;\n    float b = texture2D(tDiffuse, loop(p + bs)).z;\n\n    return vec4(r, g, b, 1.0);\n}\n\nvec4 noise(vec2 p) {\n    return texture2D(tNoise, p);\n}\n\nvec4 vec4pow(vec4 v, float p) {\n    return vec4(pow(v.x, p), pow(v.y, p), pow(v.z, p), v.w); \n}\n\nvoid main() {\n    vec2 uv = vUv;\n    float amp = amplitude * t;\n    vec4 shift = vec4pow(noise(vec2(speed * time, 2.0 * speed * time / 25.0)), 8.0) * vec4(amp, amp, amp, 1.0);\n    gl_FragColor = rgbShift(uv, shift);\n}\n\n"

/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\nconst float steps = 3.0;\nconst float minOffs = (float(steps-1.0)) / -2.0;\nconst float maxOffs = (float(steps-1.0)) / +2.0;\n\nuniform sampler2D tDiffuse;\nuniform float blurAmount;\nuniform float center;\nuniform float stepSize;\n\nvarying vec2 vUv;\n\n// https://gist.github.com/underscorediscovery/10324388\nvoid main() {\n    float amount = pow((vUv.y * center) * 2.0 - 1.0, 2.0) * blurAmount;\n\n    vec4 blurred = vec4(0.0, 0.0, 0.0, 1.0);\n\n    for (float offsY = minOffs; offsY <= maxOffs; ++offsY) {\n        for (float offsX = minOffs; offsX <= maxOffs; ++offsX) {\n            vec2 temp_vUv = vUv.xy;\n\n            temp_vUv.x += offsX * amount * stepSize;\n            temp_vUv.y += offsY * amount * stepSize;\n\n            blurred += texture2D(tDiffuse, temp_vUv);\n        }\n    } \n\n    gl_FragColor = blurred / float(steps * steps);\n} \n\n"

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "#define GLSLIFY 1\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform float t;\n\nuniform vec2 scale;\nuniform float intensity;\nuniform float border;\n\nvarying vec2 vUv;\n\nvoid main() {\n    vec2 uv = vUv;\n\n    float d = t * intensity * smoothstep(0.0, border, uv.x) * smoothstep(1.0, 1.0 - border, uv.x) * smoothstep(0.0, border, uv.y) * smoothstep(1.0, 1.0 - border, uv.y);\n    uv.x += (snoise_1_3(vec3(uv * scale, time)) - 0.5) * d;\n    uv.y += (snoise_1_3(vec3(uv.yx * scale, time)) - 0.5) * d;\n\n    gl_FragColor = texture2D(tDiffuse, uv);\n} \n\n"

/***/ }
/******/ ]);