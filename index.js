const koa = require("koa")
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const sequelize = require("./config/sqlConfig") // 连接数据库的配置
const cors = require("koa-cors")
const app = new koa()
const router = new Router()

const port = process.env.PORT || 3000
app.use(cors()) // 设置允许跨域
app.use(bodyParser()) // 处理post请求获取参数

// 引入product.js
const product = require("./routes/mysqlApi/product")
// 引入user.js
const user = require("./routes/mysqlApi/user")
// 引入film.js
const film = require("./routes/mysqlApi/film")
// 引入sms.js
const sms = require("./routes/mysqlApi/sms")

// 配置路由地址
router.use("/sqlApi/product", product) //localhost:3000/sqlApi/product
router.use("/sqlApi/user", user) //localhost:3000/sqlApi/user
router.use("/sqlApi/film", film) //localhost:3000/sqlApi/film
router.use("/sqlApi/sms", sms) // localhost:3000/sqlApi/sms

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

// 与数据库建立连接
sequelize
  .authenticate()
  .then(() => {
    console.log("MYSQL数据库连接成功")
  })
  .catch(err => {
    console.error("MYSQL数据库连接失败", err)
  })

// 路由
router.get("/", async ctx => {
  ctx.body = { msg: "MYSQL koa2" }
})

app.listen(port, () => {
  console.log(`listen to ${port}`)
})
