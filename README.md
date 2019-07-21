# fakeXHRr

A small XMLHttpRequest wrapper for intercepting
or faking responses.
The module is plain untranspiled es6.


## Installation

```
npm i -S fakexhr
```

## Usage

When loaded will take over `window.XMLHttpRequest`.
The original class will be stored at
`window.XMLHttpRequest.original`.

The new `XMLHttpRequest` is baseclassed from the
real one so it will work the same.

The XHR instances will have an extra method called
`fake`.

### Faking the XHR response

The first parameter is the string you want the 
response to be. The remaining parameters are the
exact same signature as you will use in `xhr.open(..,)`.

```
const xhr = new XMLHttpRequest()
xhr.fake('<foo>bar</foo>', 'GET', 'file.xml')
xhr.open('GET', 'file.xml')
xhr.send()
```

This will fake the `xhr.responseText` only for this
xhr instance. To fake the responses for all instances
you can use the similarly named static method.

```
XMLHttpRequest.fake('<foo>bar</foo>', 'GET', 'file.xml')

const xhr = new XMLHttpRequest()
xhr.open('GET', 'file.xml')
xhr.send()
```

Contrary to hijacking a response, faking it will not
send an actual HTTP request. This also means the fired
events will have the `isTrusted` property set to `false`.

### Hijacking the XHR response

To alter an existing request you can hijack it by
overloading the same to methods. Simply replace the
first parameter with a callback function.

```
const xhr = new XMLHttpRequest()
xhr.fake(xml=>`<blaat>${xml}</blaat>`, 'GET', 'file.xml')
xhr.open('GET', 'file.xml')
xhr.send()
```

The same applies to the static method. 
