let $ajax = function ajaxFunc ({method, url, data = ""}) {
  return new Promise((resolve, reject) => {
    var xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    method = method.toUpperCase() // 转大写
    var str = ''
    for (var i in data) {
      str += i + '=' + data[i] + '&'
    }
    if (method == 'GET') {
      xhr.open(method, url + '?' + str, true)
      xhr.send()
    } else if (method == 'POST') {
      xhr.open(method, url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') 
      xhr.send(str)
    }   
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          if(xhr.responseText.indexOf('<!DOCTYPE html>') !== -1) {
            window.location.href = '/login.html'
          } else {
            resolve(JSON.parse(xhr.responseText))
          }
        } else {
          reject(JSON.parse(xhr.responseText))
        }
      }
    }
  })
}

