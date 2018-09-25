const ensureLoggedIn = (redirectTo) => {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      req.flash('error', 'You have to login first');
      res.redirect(redirectTo);
    }
  }
}

const ensureLoggedOut = (redirectTo) => {
  return (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      req.flash('error', 'You are logged in, cannot access');

      res.redirect(redirectTo);
    }
  }
}

const isDesigner = (req, res, next) => {
  if (req.user.role.designer) {
    next();
  } else {
    req.flash('error', 'You are not designer');
    res.redirect(redirectTo);
  }
}

const isUser = (req, res, next) => {
  if (req.user.role.user) {
    next();
  } else {
    req.flash('error', 'You are not a user');
    res.redirect(redirectTo);
  }
}

const hasRole = (redirectTo="/", role="Designer") => {
  return (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role.includes(role)) {
      next();
    } else {
      req.flash('error', `You do not have the role ${role}`);
      res.redirect(redirectTo);
    }
  }
}

module.exports = {
  ensureLoggedIn,
  ensureLoggedOut,
  isDesigner,
  isUser,
  hasRole
}