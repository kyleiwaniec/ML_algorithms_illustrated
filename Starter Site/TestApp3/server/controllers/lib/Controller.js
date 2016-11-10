/* @flow */

export type Request = any;

export class Controller {
  req: Request;
  params: Object;

  constructor(req: Request) {
    this.req = req;
    this.params = req.params;
  }
}
