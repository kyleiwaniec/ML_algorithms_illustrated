/* @flow */

let app = null;
import invariant from 'invariant';

export function initRoutes(_app: any): void {
  app = _app;
}

export function get(path: string, cb: any): void {
  invariant(app != null, "app can't be null");
  app.get(path, (req, res) => {
    res.send(cb(req, res));
  });
}
