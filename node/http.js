// http小工具

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

// 简易的返回json的方法
export function write_json(res, data) {
  res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'}) // 历史原因，有些代码里用的是plain，但后续还是统一用json规范一些
  const ret = JSON.stringify(data)
  console.log(">>>>>>>>>>>>>>>>>>>>>>", ret)
  res.end(ret);
}

// 基于npm httpdispatcher 封装的一个简易的router
export class Router {

  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  
  onGet(path, handler) { // handler(qs, req, res)
    this.dispatcher.onGet(path, function(req, res){
      try {

        const url = require('url')

        // 取到参数
        let qs = url.parse(req.url, true).query;
        console.log("qs", qs)

        handler(qs, req, res)

        // res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.end(ret);

      } catch(e) {
        console.log("err", e)
        res.writeHead(500)
      }
    })
  }

  jsonGet(path, handler) { // handler(qs, req, res) => promise of json_data
    this.dispatcher.onGet(path, function(req, res){
      const url = require('url')

      // 取到参数
      let qs = url.parse(req.url, true).query;
      console.log("qs", qs)

      handler(qs, req, res).then(data => {
        write_json(res, data)
      }).catch(err => {
        write_json(res, err)
      })

    })
  }

}

