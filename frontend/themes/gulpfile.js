const gulp = require('gulp')
const fs = require('fs')
const Path = require('path')
const rename = require('gulp-rename')
const sass = require('gulp-sass')(require('sass'))
const sassInlineImage = require('./sass-inline-image-v2')
const {rimrafSync} = require('rimraf')

const destDir = Path.join(__dirname, '../public/resources/themes-dist')

function buildStyles(name) {
  const basePath = `./sass/${name}`

  // 检测单文件是否存在，如果不存在就取同名文件夹下的index.scss文件
  let srcPath = basePath + '.scss'
  if (!fs.existsSync(srcPath)) {
    srcPath = Path.join(basePath, './index.scss')
  }

  console.log('[buildStyles]', name, srcPath)

  return gulp
    .src(srcPath)
    .pipe(
      sass
        .sync({
          functions: {
            ...sassInlineImage({
              base: basePath,
            }),
          },
        })
        .on('error', (error) => {
          sass.logError(error)
          throw error
        }),
    )
    .pipe(rename(`${name}.css`))
    .pipe(gulp.dest(destDir))
}

gulp.task('clean-folder', function (cb) {
  rimrafSync(destDir)
  cb()
})

gulp.task('copy-files', function () {
  return gulp.src('./sass/index.json').pipe(gulp.dest(destDir))
})

const defaultTasks = ['clean-folder', 'copy-files']
const list = require('./sass/index.json')
list.forEach((item) => {
  const {label, value} = item
  gulp.task(value, () => buildStyles(value))
  defaultTasks.push(value)
})

console.log(defaultTasks)
gulp.task('default', gulp.series(defaultTasks))
