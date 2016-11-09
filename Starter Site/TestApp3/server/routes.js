export function registerRoutes(app) {
  app.get('/seconds', function response(req, res) {
    const seconds = (new Date()).getSeconds()
    res.send(seconds.toString());
  });
}
