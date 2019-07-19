const OldXHR = window.XMLHttpRequest

class FakeXMLHttpRequest extends OldXHR {

  static org = OldXHR
  static _fakeResponses = new Map()
  
  /**
   * Store a fake response to the `open` method signature
   * The static implementation also fakes later instantiations
   * @param {string} response
   * @param {object[]} openParams
   */
  static fake(response, ...openParams){
    this._fakeResponses.set(this._getKey(...openParams), response)
  }

  /**
   * Create a key from function parameters
   * @param {object[]} arg
   * @returns {string}
   */
  static _getKey(...arg){
    return arg.toString(arg)
  }

  _fakeResponses = new Map()
  _readyState
  _status
  _statusText
  _responseText = null

  constructor(...arg){
    super(...arg)
  }

  open(...openParams){
    const {constructor} = this
    const key = constructor._getKey(...openParams)
    this._responseText = 
      this._fakeResponses.get(key)
      ||constructor._fakeResponses.get(key)
    super.open(...openParams)
  } 
 
  get readyState(){
    return this._readyState||super.readyState
  }
 
  get status(){
    return this._status||super.status
  }

  get statusText(){
    return this._statusText||super.statusText
  }

  get responseText(){
    return this._responseText||super.responseText
  }

  /**
   * Store a fake response to the `open` method signature
   * The instance implementation takes precedence over the static one but should be called before the `open` method
   * @param {string} response
   * @param {object[]} openParams
   */
  fake(response, method, url, async, user, password){
    const {constructor} = this
    this._fakeResponses.set(constructor._getKey(method, url, async, user, password), response)
  }

  /**
   * Overridden `send`
   */
  send(){
    if (this.responseText) {
      this.dispatchEvent(new ProgressEvent('loadstart'))
      this._readyState = 4
      this._status = 200 
      this._statusText = '200 OK'
      this.dispatchEvent(new ProgressEvent('load'))
      this.dispatchEvent(new ProgressEvent('loadend'))
    } else {
      super.send()
    }
  }
}
window.XMLHttpRequest = FakeXMLHttpRequest
