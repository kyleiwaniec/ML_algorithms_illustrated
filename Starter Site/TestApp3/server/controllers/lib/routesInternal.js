let app = null;

export function initRoutes(_app) {
  app = _app;
}

export function get(path, cb) {
  app.get(path, (req, res) => {
    res.send(cb(req, res));
  });
}
