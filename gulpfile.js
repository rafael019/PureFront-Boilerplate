const gulp = require("gulp");
const gulpSass = require("gulp-sass")(require("node-sass"));
const nodeSass = require("node-sass");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const minifyCSS = require("gulp-clean-css");

// Compila Sass e envia para pasta dist/asses/css
function buildSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(gulpSass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.stream()); // Depois de compilar da o Reload da Página
}
gulp.task("sass", buildSass);

exports.buildSass = buildSass;

// Função que junta todos os arquivos .js
function gulpJS() {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      }) // Adicionar compatibilidade com Browsers Antigos
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.stream());
}

exports.gulpJS = gulpJS;

// Iniciar o Browser e faz o Live Reload
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}
exports.browser = browser;

// Monitora a Pasta src/ e arquivos .php, quando altera algum estilo o mesmo compila o Sass automaticamente
function watch() {
  gulp.watch("src/scss/**/*.scss", buildSass);
  gulp.watch("src/js/*.js", gulpJS);
  gulp.watch("./**/*.html").on("change", browserSync.reload);
}

exports.watch = watch;

exports.default = gulp.parallel(watch, browser, buildSass, gulpJS);

// Webpack
// Compila Sass
// Monitora Mudanças
// Exibe no Navegador
// Concatena Javascript
// Renomeia pra arquivo.min

// Aula 5 - Gulp Autoprefixer
