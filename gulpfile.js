const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const gutil = require('gulp-util');
const SequelizeFixtures = require('sequelize-fixtures');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const redis = require('./server/db/redis');

env({
  file: './.env',
  type: 'ini',
});

const db = require('./server/db/models');

const models = {
  'School' : db.School,
  'User': db.User,
  'StudentQuestion' : db.StudentQuestion,
  'Cohort' : db.Cohort,
  'StudentCohort' : db.StudentCohort,
  'Lecture' : db.Lecture,
  'Topic' : db.Topic,
  'Quiz' : db.Quiz,
  'Question' : db.Question,
  'Answer' : db.Answer,
  'Result' : db.Result,
};

gulp.task('sync', (cb) => {
  db.School.sync({ force: true })
  .then(() => db.User.sync({ force: true }))
  .then(() => db.Cohort.sync({ force: true }))
  .then(() => db.StudentCohort.sync({ force: true }))
  .then(() => db.Lecture.sync({ force: true }))
  .then(() => db.Attendance.sync({ force: true }))
  .then(() => db.Topic.sync({ force: true }))
  .then(() => db.StudentQuestion.sync({ force: true }))
  .then(() => db.Quiz.sync({ force: true }))
  .then(() => db.Question.sync({ force: true }))
  .then(() => db.Answer.sync({ force: true }))
  .then(() => db.Result.sync({ force: true }))
  // .then(() => redis.set('allTeacherData', 'null'))
  .then(() => { cb(); })
  .catch((err) => { cb(err); });
});

gulp.task('seed:seed', ['sync'], (cb) => {
  SequelizeFixtures.loadFile('./server/db/models/seedData/data.json', models)
    .then(() => {
      cb();
    })
    .catch((err) => {
      cb(err);
    });
});

gulp.task('seed', ['sync', 'seed:seed']);

gulp.task('nodemon', () => {
  const stream = nodemon({
    script: 'server/Index.js',
    watch: ['server/'],
    ignore: ['client/**'],
  });
});

gulp.task('dbwatch', () => {
  gulp.watch(['./server/db/models'], ['seed']);
});

gulp.task('webpack-dev-server', () => {
  const compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    contentBase: './static',
    publicPath: '/static',
    hot: true,
    inline: true,
    stats: true,
    clientLogLevel: 'info',
    proxy: [
      {
        context: ['/api', '/'],
        target: `http://localhost:${process.env.PORT}`,
      },
    ],
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server ', err);
    }
    gutil.log('[webpack-dev-server]', 'WPDS - Listening in on http://localhost:8080');
  });
});

gulp.task('default', ['nodemon', 'dbwatch', 'webpack-dev-server']);
