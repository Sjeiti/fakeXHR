const OldXHR = window.XMLHttpRequest

class FakeXMLHttpRequest extends OldXHR {

  constructor(...arg){
    super(...arg)
  }

  

}




function reqListener () {
  console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
oReq.send();
