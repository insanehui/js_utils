
// 网上摘抄的获取客户端ip的写法
export function client_ip(req) {
  return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress || // 好像我的环境中取的是这个值
    req.connection.socket.remoteAddress;
}

export function client_port(req) {
  return req.connection.remotePort ||
    req.socket.remotePort ||
    req.connection.socket.remotePort;
}

