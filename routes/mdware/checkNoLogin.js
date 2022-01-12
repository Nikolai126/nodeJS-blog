// const checkNoLogin = (req, res, next) => {
//     return res.redirect('/index');
//     next();
// }

module.exports = checkNoLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/index');
    }
    next();
}