
/**
 * create middleware
 *
 * @param {Object} option
 * @config {RegExp} pattern
 * @config {Number} duration
 */
module.exports = function (option) {
  /**
   * set expires to response headers
   *
   * @param {express.Request}  req
   * @param {express.Response} res
   * @param {Function}         next middleware iterator
   */
  return function (req, res, next) {
    var url = req.url
      , now
      ;

    option = option || {};
    // default one day
    option.duration = (option.duration == null) ? (1000 * 60 * 60 * 24) : +option.duration;

    if (!option.pattern || !option.pattern.test(url)) {
      return next();
    }

    now = (new Date(Date.now() + option.duration)).toUTCString();
    res.setHeader('Expires', now);
    res.setHeader('Cache-Control', "max-age=" + (option.duration / 1000));
    next();
  };
};
