/* @flow */

export type Request = any;

export class Controller {
  req: Request;

  constructor(req: Request) {
    this.req = req;
  }
}
