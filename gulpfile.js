const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const webpack = require("webpack");
const babel = require("gulp-babel");
const path = require("path");
const webserver = require("gulp-webserver");
const sass = require("gulp-sass");

gulp.task("webpack", function() {
    const source = "./source/javascripts/vj.js";
    const config = {
        entry : source,
        watch : true,
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
    };

    return gulp.src(source)
        .pipe($.plumber())
        .pipe($.webpack(config))
        .pipe(gulp.dest("./dist/javascripts"));
});

gulp.task("sass", function() {
    gulp.src("./source/sass/*.scss")
        .pipe($.plumber())
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("webserver", function() {
    gulp.src(".")
        .pipe(webserver({
            host: "0.0.0.0",
            port: "4567",
            livereload: true
        }));
});

gulp.task("default", ["webpack", "webserver"]);

