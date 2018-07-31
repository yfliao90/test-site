// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

//process.env.NODE_ENV = 'production';//生产环境下增加如此配置
console.log('isproduction? ' + process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';//===优先级更高，常量isProduction，它判断当前环境是否是production环境。

//记录URL以及页面执行时间：
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//处理静态文件
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//用post请求处理URL时，我们会遇到一个问题：post请求通常会发送一个表单，或者JSON，它作为request的body发送，但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
//解析POST请求：
app.use(bodyParser());

//使用Nunjucks as view：
app.use(templating('view-koa/views', {
    noCache: !isProduction,
    watch: !isProduction
}));

//处理URL路由：
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
