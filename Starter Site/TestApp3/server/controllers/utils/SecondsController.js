/* @flow */

import {Controller} from '../lib/Controller.js'

export class SecondsController extends Controller {
  getCurrentSecondsAsString() {
    return (new Date()).getSeconds().toString();
  }
}
