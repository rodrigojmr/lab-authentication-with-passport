const roleRouteGuard = allowedRoles => {
  return function (req, res, next) {
    console.log(req.user.role);
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(new Error('User is not authorized to see that page.'));
    }
  };
};

module.exports = roleRouteGuard;
