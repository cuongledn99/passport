module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.send("You must login!");
      }
    },
  
    notLoggedIn: (req, res, next) => {
      if(!req.isAuthenticated()) {
          console.log('user is not login')
        return next();
      }
      return res.redirect('/');
    }    
  }