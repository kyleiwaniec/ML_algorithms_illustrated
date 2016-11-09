module.exports = function(app) {
  app.get('/ab', function response(req, res) {
    const hours = (new Date()).getSeconds()
    res.send(hours.toString());
  });
}
