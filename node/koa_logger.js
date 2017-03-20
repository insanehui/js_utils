/*
 * koa一个打日志的小中间件
 */
export async function logger(ctx, next) { 
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
}

