export class SecondsController {
    getCurrentSecondsAsString() {
      return (new Date()).getSeconds().toString();
    }
}
