var gulp = require("gulp");
var webpack = require("gulp-webpack");
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var path = require("path");
var glob = require("glob");
var webserver = require("gulp-webserver");

gulp.task("webpack", function() {

    var source = "./source/javascripts/vj.js";
    gulp.src(source)
        .pipe(plumber())
        .pipe(webpack({
            entry : source,
            output : { 
                filename: "[name].js"
            }, 
            resolve : {
                root : [path.join(__dirname, "bower_components")],
                extensions : ["", ".js"],

                alias : {
                    threejs : "threejs/build/three.min.js",
                    "dat-gui" : "dat-gui/build/dat.gui.min.js"
                }
            },
            plugins : [],
            module : {
                loaders : [
                    { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
                    { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ },
                    { 
                        test: /\.js$/, 
                        exclude: /node_modules/, 
                        loader: "babel", 
                        query:{
                            presets: ["es2015"],
                            compact: false
                        }
                    },
                    { test:"/\.json$/", loader: "json" }
                ]
            }
        }))
        .pipe(gulp.dest("./dist/javascripts"))
        .pipe(notify("webpack task done."));

});

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            host: "localhost",
            port: "4567",
            livereload: true
        }));
});

gulp.task("watch", function() {
    gulp.watch(["./source/javascripts/*.js", "./source/javascripts/*/*.js", "./source/shaders/*", "./source/shaders/*/*", "./source/shaders/*/*/*"], ["webpack"]);
});

gulp.task("default", ["webpack", "watch"]);

