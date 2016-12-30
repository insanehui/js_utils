// iframe的一些工具

export function get_parent_url() { // 获取父页面的url，如果没有被包括则返回null
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

