// 对浏览器location对象的一些封装
import form_encode from 'form-urlencoded'

// 设置query string: 设置参数并重新加载页面
export function query(data){
  location.search = '?' + form_encode(data)
}
