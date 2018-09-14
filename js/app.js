var container = document.getElementsByClassName('instagram--list')[0]
var userid = '10852869'
var data = {
  access_token: '10852869.cc3c323.657f16e2ddf34e22b6e8fcff62a5fc19',
  count: 8
}
var qs = objToQS(data)

var req = new XMLHttpRequest()

req.onreadystatechange = function(e) {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status === 200) {
      var data = JSON.parse(this.responseText).data

      for (var i = 0; i < data.length; i++) {
        container.appendChild(newInstagramElement(data[i]))
      }
    } else {
      console.log(this.status, this.statusText)
    }
  }
}

req.open(
  'GET',
  'https://api.instagram.com/v1/users/' + userid + '/media/recent' + qs,
  true
)
req.send()

function objToQS(obj) {
  return (
    '?' +
    Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&')
  )
}

function newInstagramElement(data) {
  var li = document.createElement('li')
  var a = document.createElement('a')
  var img = document.createElement('img')

  li.className = 'instagram--list--item col-2'
  a.href = data.link
  img.className = 'instagram--list--item--thumbnail'
  img.src = data.images.standard_resolution.url

  a.appendChild(img)
  li.appendChild(a)

  return li
}
