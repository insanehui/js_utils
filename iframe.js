// iframe的一些工具

// TODO: 后面这个函数可能不再导出，因为下面导出的iparent对象会包含足够的信息
export function get_parent_url() { // 获取父页面的url，如果没有被iframe包括则返回null
  var url = null
  if (parent !== window) 
  { 
    try 
    {
      url = parent.location.href // 这是哪些浏览器生成的？
    } 
    catch (e) 
    { 
      // 貌似chrome使用的是这个分支

      // 需要服务器上的页面，才能取得到其url
      // 如果是本地打开一个iframe, referrer为''
      url = document.referrer 
    } 
  }
  return url; 
}


let iparent = null
if( get_parent_url() ){
  const host = get_parent_url().split('//')[1].split('/')[0]
  iparent = {host}
}

export {iparent}

