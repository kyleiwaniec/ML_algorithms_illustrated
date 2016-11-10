/* @flow */

export type Request = any;

export class Controller {
  req: Request;
  params: Object;

  constructor(req: Request) {
    this.req = req;
    this.params = JSON.parse(req.query.params || '{}');
  }
}
