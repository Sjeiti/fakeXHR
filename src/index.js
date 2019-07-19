const OldXHR = window.XMLHttpRequest

class FakeXMLHttpRequest extends OldXHR {

  static org = OldXHR
  static _fakeResponses = new Map()

  static fake(response, method, url, async, user, password){
    this._fakeResponses.set(this._getKey(method, url, async, user, password), response)
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
  _responseText = null

  constructor(...arg){
    super(...arg)
  }

  open(method, url, async, user, password){
    const {constructor} = this
    const key = constructor._getKey(method, url, async, user, password)
    this._responseText = 
      this._fakeResponses.get(key)
      ||constructor._fakeResponses.get(key)
    super.open(method, url, async, user, password)
  } 
 
  get responseText(){
    return this._responseText||super.responseText
  }
 
  fake(response, method, url, async, user, password){
    const {constructor} = this
    this._fakeResponses.set(constructor._getKey(method, url, async, user, password), response)
  }

  send(){
    console.log('send', !!this.responseText)
    if (this.responseText) {
      // ProgressEvent
      this.dispatchEvent(new CustomEvent('load',{
        responseText: this.responseText
        ,detail: {
          responseText: this.responseText
        }
      }))
    } else {
      super.send()
    }
  }
}


window.XMLHttpRequest = FakeXMLHttpRequest
