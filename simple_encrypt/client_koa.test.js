import {get} from './client.js'
import http from 'http'

import Koa from 'koa'

const app = new Koa()
app.use(ctx => {
  ctx.body = '{"name" : "tcli", "age" : 18}' // 一个http服务器，任何请求返回haha
})
let server

beforeAll(() => {
  server = app.listen(666)
})

afterAll(() => {
  server && server.close()
})

test('learn_supertest', async () => {
  const txt = await get('http://localhost:666')
  console.log(txt)
})

