// const checkYesLogin = (req, res, next) => {
//     if(req.isAuthenticated()) {
//         next();
//     }
//     else {
//         res.redirect('/login');
//     }
// }

module.exports = checkYesLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/loginAuth/login');
}