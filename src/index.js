const OldXHR = window.XMLHttpRequest

class FakeXMLHttpRequest extends OldXHR {

  static org = OldXHR
  _responseText = null

  constructor(...arg){
    super(...arg)
  }

  open(method, url, async, user, password){
    super.open(method, url, async, user, password)
  } 
 
  get responseText(){
    return this._responseText||super.responseText
  }

  fake(method, url, responseText){
    this._responseText = responseText
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
