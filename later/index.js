const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;
const read = require('node-readability')
const url = 'http://www.manning.com/cantelon2/'

read(url,(err,result)=>{
    if(err || !result) res.status(500).send('Error downloading article');
    console.log(result.title)
    // Article.create({title:result.title, content:result.content}),
    // (err,article) => {

    // }
})


app.set('port',process.env.PORT || 3000)

app.use(bodyParser.json()); //支持编码为json 的请求消息体
app.use(bodyParser.urlencoded({ extended:true })); //支持编码为表单的请求消息体

app.post('/articles', (req, res, next) => {
    //从post 消息体中取得url
    const url = req.body.url;
    console.log(req.body.url)
    read (url, (err, result) => {
        if(err || !result){res.status(500).send('Error downloading article');}
        Article.create({title:result.title, content:result.content}, (err, article) => {
            if (err) return next(err);
            res.send('ok');
        })
    })
})

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.send(articles);
    })
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article)
    })
})

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err, article) => {
      if (!id) return next(err);
      res.send({ message:'Deleted' })
  })
});

app.listen(app.get('port'), ()=>{
    console.log('APP started on port', app.get('port'));
});
module.exports = app;