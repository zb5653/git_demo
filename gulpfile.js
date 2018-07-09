/**
* gulp的主文件，用于注册任务
*/

'use strict';

//此处代码都是由node执行

//载入gulp模块
var gulp = require('gulp');
var less = require('gulp-less');

//注册一个任务
gulp.task('copyfile',function(){
	//当gulp执行这个output任务时会自动执行该函数
	console.log('Hello World');
	//合并 压缩之类的操作
	//复制文件到目标文件,gulp.src('')取一个文件
	gulp.src('src/index.html')
		//gulp.dest(目标路径)，将pipe输出到目标路径，不需要写文件名
		.pipe(gulp.dest('dist/'))	//将此处需要的操作传递进去，可以链式操作
});

//注册一个任务
gulp.task('dist',function(){
	//为了使文件每次改变不需要手动去执行copyfile任务
	//监听index.jsp文件，有改变时执行copyfile任务，会覆盖之前复制的文件
	gulp.watch('src/index.html',['copyfile']);
	gulp.watch('src/style/*.less',['style']);
});

gulp.task('style',function(){
	gulp.src('src/style/*.less')
		.pipe(less())	//该环节过后就得到css文件
		.pipe(cssnano())	//压缩css，gulp上现在找不到这个cssnano插件了，无法使用
		.pipe(gulp.dest('dist/css/'));
});

var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-server', function() {
    browserSync.init({
        server: {
            baseDir: "./"	//启动的静态文件服务器的根目录，是gulpfile所在的目录
        }
    });
});






