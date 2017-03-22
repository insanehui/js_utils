import Koa from 'koa'

import Ketch from '../ketch.js'


import {get, ketch_} from './client.js'
import {simple_encrypt} from './koa.js'

const ketch = Ketch(require('node-fetch'))
ketch.use_(ketch_)

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

test('get', async () => {
  const txt = await get('http://localhost:666')
  expect(txt).toEqual(JSON.parse(txt1))
})

test('ketch', async () => {
  const res = await ketch('http://localhost:666')
  const txt = res.Data
  console.log(txt)
  expect(JSON.parse(txt)).toEqual(JSON.parse(txt1))
})

