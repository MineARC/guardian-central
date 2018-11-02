var express = require('express');
var app = express();
module.exports = app;

// ///// UPDATE /////
// var AutoUpdater = require('auto-updater');

// var autoupdater = new AutoUpdater({
//   pathToJson: '',
//   autoupdate: false,
//   checkgit: true,
//   jsonhost: 'raw.githubusercontent.com',
//   contenthost: 'codeload.github.com',
//   progressDebounce: 0,
//   devmode: false
// });

// // State the events
// autoupdater.on('git-clone', function() {
//   console.log(
//       'You have a clone of the repository. Use \'git pull\' to be up-to-date');
// });
// autoupdater.on('check.up-to-date', function(v) {
//   console.info('You have the latest version: ' + v);
// });
// autoupdater.on('check.out-dated', function(v_old, v) {
//   console.warn('Your version is outdated. ' + v_old + ' of ' + v);
//   autoupdater.fire('download-update');  // If autoupdate: false, you'll have to
//                                         // do this manually.
//   // Maybe ask if the'd like to download the update.
// });
// autoupdater.on('update.downloaded', function() {
//   console.log('Update downloaded and ready for install');
//   autoupdater.fire(
//       'extract');  // If autoupdate: false, you'll have to do this manually.
// });
// autoupdater.on('update.not-installed', function() {
//   console.log('The Update was already in your folder! It\'s read for install');
//   autoupdater.fire(
//       'extract');  // If autoupdate: false, you'll have to do this manually.
// });
// autoupdater.on('update.extracted', function() {
//   console.log('Update extracted successfully!');
//   console.warn('RESTART THE APP!');
//   process.exit();
// });
// autoupdater.on('download.start', function(name) {
//   console.log('Starting downloading: ' + name);
// });
// autoupdater.on('download.progress', function(name, perc) {
//   process.stdout.write('Downloading ' + perc + '% \033[0G');
// });
// autoupdater.on('download.end', function(name) {
//   console.log('Downloaded ' + name);
// });
// autoupdater.on('download.error', function(err) {
//   console.error('Error when downloading: ' + err);
// });
// autoupdater.on('end', function() {
//   console.log('The app is ready to function');
//   app.exit();
// });
// autoupdater.on('error', function(name, e) {
//   console.error(name, e);
// });

// // Start checking
// require('dns').resolve('github.com', function(err) {
//   if (!err) autoupdater.fire('check');
// });

// function afterUpdate() {
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var cors = require('cors');

var dashboard = require('./routes/overview');
var chamber = require('./routes/chamber');

var database = require('./database');
var guardian_polling = require('./guardian_polling');
var battmon_polling = require('./battmon_polling');
var elv_polling = require('./elv_polling');
var elvp_polling = require('./elvp_polling');
var s3_polling = require('./s3_polling');
var s4_polling = require('./s4_polling');

app.use(cors());
app.options('*', cors());

app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', dashboard);
app.use('/chamber', chamber);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// }