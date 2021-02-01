module.exports = {
    ensureAuthenticated: function (request, response, next) {
        if (request.isAuthenticated()) {
            return next();
        }
        request.flash('error_message', 'Please logging to access resource');
        response.redirect('auth/login');
    }
    
}