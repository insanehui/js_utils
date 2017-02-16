// fetch api的一些小封装
import form_encode from 'form-urlencoded'

// post, 返回promise
export function post(url, para) {
  const headers = {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }

  return fetch(url, {
    method : 'POST', headers, body : form_encode(para),
  }).then(res => res.json())
}

export function get(url, para) {
  // const headers = {
  //   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  // }

  return fetch(url + '?' + form_encode(para), {
    method : 'GET', 
    // headers, body : form_encode(para),
  }).then(res => res.json())
}

