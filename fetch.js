// fetch api的一些小封装
import form_encode from 'form-urlencoded'
import _ from 'lodash'

// 直接取 res.json()
export const json = fetch_fn => async (...para) => {
  // eslint-disable-next-line
  para; // 这是babel的bug，经试验，若省略这一行的话，会出现诡异的错误

  const res = await fetch_fn(...para)
  return res.json()
}

// 支持一个对象来指定query string
export const query = fetch_fn => async(...para) => {
  /*
   * 通过 opt:{query} 对象来生成query string的内容
   */
  let [url, opt, ...rest]  = para
  const obj = _.get(opt, 'query')
  if ( _.isObject(obj) ) { 
    const qs = form_encode(obj)
    url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs
  } 

  return fetch_fn(url, _.omit(opt, 'query'), ...rest)
}


// 采用application/json的方式来post
export const post_json = fetch_fn => async(url, opt = {}, ...para) => {
  /*
   * 通过 opt:{json_body} 来指定一个post的参数
   */
  opt = _.cloneDeep(opt) // 深拷贝一份
  const {json_body} = opt
  if ( _.isObject(json_body) ) {
    _.merge(opt, {
      method : 'POST',
      headers:{
      'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
      'Content-Type': 'application/json; charset=utf-8'
    }})

    opt.body = JSON.stringify(json_body)
  } 
  return fetch_fn(url, opt, ...para)
}

// 支持urlencoded形式的post body
export const post_urlenc = fetch_fn => async (...para) => { 
  /*
   * 作用是能识别第二个参数: { body } 里为对象形式的body，将其转为
   * urlencoded的格式提交
   */

  const headers = {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }

  _.each(headers, (v, i ) => {
    _.set(para, `1.headers.${i}`, v)
  })
  _.set(para, `1.method`, 'POST')

  const obj = _.get(para, '1.body')

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

