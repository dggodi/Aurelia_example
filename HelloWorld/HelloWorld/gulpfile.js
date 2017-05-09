var gulp = require("gulp");
var runSequence = require("run-sequence");
var changed = require("gulp-changed");
var plumber = require("gulp-plumber");
var babel = require("gulp-babel");
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var vinylpaths = require("vinyl-paths");
var assign = Object.assign || require("object.assign");
var browserSync = require("browser-sync");

var appRoot = "wwwroot/";
var outputRoot = "dist/";

var paths = {
    root: appRoot,
    source: appRoot + "**/*.js",
    html: appRoot + "**/*.html",
    output: outputRoot
};

var compilerOptions = {
    modules: "system",
    moduleIds: false,
    comments: false,
    compact: false,
    stage: 2,
    optional: [
        "es7.decorators",
        "es7.classproperties"
    ]
};

// deletes all files in the output path
gulp.task("clean", function() {
    return gulp.src([paths.output])
        .pipe(vinylpaths(del));
});

// transpiles changed es6 files to systemjs format
// the plumber() call prevents 'pipe breaking' caused by errors form gulp plugins
gulp.task("build-system", function(){
    return gulp.src(paths.source)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(changed(paths.output, { extension: ".js" }))
        .pipe(sourcemaps.init({ loadmaps: true }))
        .pipe(babel(assign({}, compilerOptions, { modules: "system" })))
        .pipe(sourcemaps.write({ includeContent: true }))
        .pipe(gulp.dest(paths.output));
});

// copies the changed html files to the ouput directory
gulp.task("build", function(callback) {
    return runSequence(
        "clean",
        ["build-system", "build-html"],
        callback
    )
});

gulp.task("serve", ["build"], function(done) {
    browserSynce({
        online: false,
        open: false,
        port: 4200 ,
        server: {
            baseDir: ['.'],
            middleware: function(req, res, next) {
                res.setHeader('Access-Contrl-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

function reportChange(event) {
    console.log('File' + event.path + ' was ' + event.type + ', running tasks...');
}

// watch sfor changes to js, html and css files
gulp.task('watch'['serve'], function() {
    gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
});