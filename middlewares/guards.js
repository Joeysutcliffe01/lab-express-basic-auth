const requiredToLogin = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/login");
    return;
  }

  next();
};

const requiredToBeLogedinOut = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect("/profile");
    return;
  }

  next();
};

const guardExports = { requiredToLogin, requiredToBeLogedinOut };

module.exports = guardExports;
