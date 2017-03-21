import Koa from 'koa'

import {get} from './client.js'
import {simple_encrypt} from './koa.js'

const txt1 = '{"name" : "tcli", "age" : 18}' 

const app = new Koa()
app.use(async (ctx, next) => {
  ctx.body = txt1// 一个http服务器，任何请求返回haha
  await next()
})
app.use(simple_encrypt)

let server

beforeAll(() => {
  server = app.listen(666)
})

afterAll(() => {
  server && server.close()
})

test('learn_supertest', async () => {
  const txt = await get('http://localhost:666')
  expect(txt).toEqual(JSON.parse(txt1))
})

