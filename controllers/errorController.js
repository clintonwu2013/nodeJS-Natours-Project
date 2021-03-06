const AppError = require("./../utils/appError");

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: "sth went wrong!!!",
      msg: err.message
    });
  }
};

const handleCastErrorDB = err => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFields = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  //console.log("value=", value);
  const message = `duplicate field value: ${value}. please use another value!`;
  return new AppError(message, 400);
};

const handleValidatorError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `invalid input data.${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  console.log("error=", err);
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    return res.status(500).json({
      status: "error",
      message: "something went very wrong"
    });
  }
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "sth went wrong!!!",
      msg: err.message
    });
  }
  res.status(err.statusCode).render("error", {
    title: "sth went wrong!!!",
    msg: "please try again later"
  });
};
const handleJWTError = err =>
  new AppError("Invalid token.Please login again!", 401);
const handleJWTExpiredError = err =>
  new AppError("Your Token is expired.Please login again!", 401);

module.exports = (err, req, res, next) => {
  //console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.name = err.name;
    error.isOperational = err.isOperational;
    error.errmsg = err.errmsg;
    error.message = err.message;
    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFields(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidatorError(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError(error);
    }
    sendErrorProd(error, req, res);
  }
};
