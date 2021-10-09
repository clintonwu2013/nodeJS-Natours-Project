const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users: users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "THIS ROUT IS NOT FOR UPDATE PASSWORDS. PLEASE USE /updatePassword",
        400
      )
    );
  }

  // 2) update user document
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this rout is not yet defined"
  });
};

exports.creatUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this rout is not yet defined"
  });
};

exports.modifyUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this rout is not yet defined"
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null
  });
});
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this rout is not yet defined"
  });
};
