/**
 *
 * @param {express.Request}  req
 * @param {express.Response} res
 * @param {Function}         next middleware iterator
 */
module.exports = function (option) {
  return function (req, res, next) {
    var url = req.url
      , now
      ;

    if (!option.pattern.test(url)) {
      return next();
    }

    now = (new Date(Date.now() + option.duration)).toUTCString();
    res.setHeader('Expires', now);
    res.setHeader('Cache-Control', "max-age=" + (option.duration / 1000));
    next();
  };
};
