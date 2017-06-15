// fetch api的一些小封装
import form_encode from 'form-urlencoded'
import _ from 'lodash'

// 直接取 res.json()
export const json = fetch_fn => async (...para) => {
  const res = await fetch_fn(...para)
  return res.json()
}

// 支持urlencoded形式的post body
export const post_urlenc = fetch_fn => async (...para) => { 

  const headers = {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }

  _.each(headers, (v, i ) => {
    _.set(para, `1.headers.${i}`, v)
  })
  _.set(para, `1.method`, 'POST')

  const obj = _.get(para, '2')
  if ( _.isObject(obj) ) {
    _.set(para, `1.body`, form_encode(obj))
  } 

  return fetch_fn(...para)
}

// 令请求可以带cookie
export const credentials_include = fetch_fn => async (...para) => {
  let [url, opt, ...rest] = para
  opt = {
    ...opt,
    credentials: "include",
  }

  return fetch_fn(url, opt, ...rest)
}

// [deprecated] post, 返回promise
export function post(url, para) {
  const headers = {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }

  return fetch(url, {
    method : 'POST', headers, body : form_encode(para),
  }).then(res => res.json())
}

// [deprecated]
export function get(url, para) {
  // const headers = {
  //   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  // }
  const full_url = url + '?' + form_encode(para)
  console.log(`fetch GET: ${full_url}`)

  return fetch(full_url, {
    method : 'GET', 
    // headers, body : form_encode(para),
  }).then(res => res.json())
}

