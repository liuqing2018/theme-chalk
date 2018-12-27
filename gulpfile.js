'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect   = require('gulp-connect')
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

gulp.task('compile', function() {
  return gulp.src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('E:\\all-project\\VAP\\01-Dev\\branches\\vap-VUE\\theme'));
    // .pipe(gulp.dest('./lib'));
});

gulp.task('copyfont', function() {
    console.log('copyfont');
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('E:\\all-project\\VAP\\01-Dev\\branches\\vap-VUE\\theme\\fonts'));
    // .pipe(gulp.dest('./lib/fonts'));
});

gulp.task('build', ['compile', 'copyfont']);


// 创建文件修改监听任务
gulp.task('auto',function(){
    // 源码有改动就进行压缩以及热刷新
    gulp.watch('src/*/*.scss',['build'])
    gulp.watch('lib/*/*.css',['reload'])
    gulp.watch('index.html',['reload'])
})

// 创建热加载任务
gulp.task('reload',function(){
    gulp.src('lib/*')
        .pipe(connect.reload())
    gulp.src('index.html')
        .pipe(connect.reload());
})

// gulp服务器
gulp.task('server',function(){
    connect.server({
        root:'test',
        port: 8899,
        livereload:true
    })
});

gulp.task('dev', ['server', 'auto']);