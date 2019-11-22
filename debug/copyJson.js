/*
 * 将对象的json复制到剪贴板，便于编辑器查看
 */
export default function copyJson(j) {
  navigator.clipboard.writeText(JSON.stringify(j, null, '  '))
}

