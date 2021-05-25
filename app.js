var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var core = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();


var con = require('./db').connection;



con.connect((err) => {
  if (!err)
    console.log('connection success');
  else
    console.log('connection failed' + JSON.stringify(err, undefined, 2));
})

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/auth');
var registerRouter = require('./routes/register');
var addProductRouter = require('./routes/create/create_product');
var productsRouter = require('./routes/products');
var productsByIdRouter = require('./routes/productsbyid');
var usersRouter = require('./routes/users');
var userProductsRouter = require('./routes/user_product_list');
var searchRouter = require('./routes/search');
var commonSearchRouter = require('./routes/common_search');
var getProductRouter = require('./routes/get_product');
var getUserRouter = require('./routes/get_user');
var deleteImageRouter = require('./routes/remove/delete_image');
var uploadImageRouter = require('./routes/upload/image_upload');
var uploadProfileImageRouter = require('./routes/upload/profile_upload');
var updateProductRouter = require('./routes/updates/update_product');
var updateProfileRouter = require('./routes/updates/update_user');
var deleteProductRouter = require('./routes/remove/delete_product');
var downloadImagesRouter = require('./routes/download/image_download');
var updateRouter = require('./routes/update');
var insertRouter = require('./routes/insert');
var selectRouter = require('./routes/select');
var deleteRouter = require('./routes/delete');
var forgetRouter = require('./routes/forget');
var resetPassword = require('./routes/reset_password');
const { env } = require('process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(core());
app.use(fileUpload());

app.use('/api/v1/login', loginRouter);
app.use('/api/v1/addProduct', addProductRouter);
app.use('/api/v1/register', registerRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/productsById', productsByIdRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/userProducts', userProductsRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/commonSearch', commonSearchRouter);
app.use('/api/v1/getProduct', getProductRouter);
app.use('/api/v1/getUser', getUserRouter);
app.use('/api/v1/deleteImage', deleteImageRouter);
app.use('/api/v1/uploadImage', uploadImageRouter);
app.use('/api/v1/uploadProfile', uploadProfileImageRouter);
app.use('/api/v1/updateProduct', updateProductRouter);
app.use('/api/v1/updateProfile', updateProfileRouter);
app.use('/api/v1/deleteProduct', deleteProductRouter);
app.use('/api/v1/download', downloadImagesRouter);
app.use('/api/v1/update', updateRouter);
app.use('/api/v1/insert', insertRouter);
app.use('/api/v1/select', selectRouter);
app.use('/api/v1/delete', deleteRouter);
app.use('/api/v1/forget', forgetRouter);
app.use('/api/v1/resetPassword', resetPassword);
app.get('/api/v1',(req, res)=>{
  res.json('service running');
});

app.get('/api/v1/test',(req, res)=>{
  res.json('service running');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
