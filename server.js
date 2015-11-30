var koa = require('koa');
var app = koa();

const PORT = 3000;

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000, ()=>{
  console.log(`Listening on port: ${PORT}`);
});
