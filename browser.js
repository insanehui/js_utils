/*
 * 用来判断浏览器类型的工具
 */

export function is_ms(){ // 是否为微软系列的浏览器
  /*
   * 这个办法区分不出来edge和ie
   */
  return !!navigator.msLaunchUri
}

// 取ie的版本。也能判断是否为ie
function getIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)), 10);

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;
		
  else
    return 0; //It is not IE
}
export const IEVersion = getIEVersion()

const userAgent = window.navigator.userAgent

export function has_chrome(){
  return userAgent.indexOf('Chrome') !== -1
}

export function has_firefox(){
  return userAgent.indexOf('Firefox') !== -1
}
