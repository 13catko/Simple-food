const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const svgo = require('imagemin-svgo');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
}

function styles() {
  return src([
    'node_modules/swiper/swiper-bundle.min.css',
    'app/scss/style.scss'
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(postcss([autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    })]))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 75, progressive: true }),
      optipng({ optimizationLevel: 5 }),
      svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: true
          },
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}


function build () {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js',
  ],{base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function svgSprites() {
  return src('app/images/icon-sprite/*.svg')
    .pipe(cheerio({
      run: ($) => {
        $("[fill]").removeAttr("fill"); // очищаем цвет
        $("[stroke]").removeAttr("stroke"); // очищаем, если есть лишние атрибуты
        $("[style]").removeAttr("style"); // убираем внутренние стили для иконок
      },
      parserOptions: { xmlMode: true },
    })
    )
    .pipe(replace('&gt;', '>')) // боремся с заменой символа 
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      })
    )
    .pipe(dest('app/images'));
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/images/icons/*.svg'], svgSprites);
}


exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;
exports.build = series(cleanDist, images, build);



exports.default = parallel(svgSprites, styles, scripts, browsersync, watching)