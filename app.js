var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var core = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

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

app.use('/login', loginRouter);
app.use('/addProduct', addProductRouter);
app.use('/register', registerRouter);
app.use('/products', productsRouter);
app.use('/productsById', productsByIdRouter);
app.use('/users', usersRouter);
app.use('/userProducts', userProductsRouter);
app.use('/search', searchRouter);
app.use('/commonSearch', commonSearchRouter);
app.use('/getProduct', getProductRouter);
app.use('/getUser', getUserRouter);
app.use('/deleteImage', deleteImageRouter);
app.use('/uploadImage', uploadImageRouter);
app.use('/uploadProfile', uploadProfileImageRouter);
app.use('/updateProduct', updateProductRouter);
app.use('/updateProfile', updateProfileRouter);
app.use('/deleteProduct', deleteProductRouter);
app.use('/download', downloadImagesRouter);
app.use('/update', updateRouter);
app.use('/insert', insertRouter);
app.use('/select', selectRouter);
app.use('/delete', deleteRouter);

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

module.exports = app;
