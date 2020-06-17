export default class EventListener {
  constructor() {
    this._listeners = [];
  }
  _addListener(element, event, callback) {
    element.addEventListener(event, callback);
    this._listeners.push({element, event, callback});
  }
  _removeListeners() {
    this._listeners.forEach(({element, event, callback}) => {
      element.removeEventListener(event, callback);
    });
    this._listeners = [];
  }
}