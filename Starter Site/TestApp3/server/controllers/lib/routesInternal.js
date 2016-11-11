/* @flow */

import type {Request} from './Controller.js';

let app: ?Request = null;
import invariant from 'invariant';

export function initRoutes(_app: Request): void {
  app = _app;
}

export function get(path: string, cb: (req: Request) => mixed): void {
  invariant(app != null, "app can't be null");
  const processor = (req: Request, res: any) => {
    res.send(cb(req));
  };
  app.get(path, processor);
}

export function post(path: string, cb: (req: Request) => mixed): void {
  invariant(app != null, "app can't be null");
  const processor = (req: Request, res: any) => {
    res.send(cb(req));
  };
  app.post(path, processor);
}
