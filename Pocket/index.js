const express = require('express');
const app = express();
const articles = [{title:'Example'}];
console.log(typeof app);
app.set('port',process.env.PORT || 3000);

app.get('/articles',(req,res,next) => {
    res.send(articles);
})

app.post('/articles',(req,res,next) => {
    res.send('ok')
})


app.get('/articles/:id',(req,res,next) => {
    const id = req.params.id;
    console.log('Fetching',id)
    res.send(articles[id]);
})

app.delete('articles/:id',(req,res,next) => {
    const id = req.params.id;
    console.log('deleteing',id);
    delete articles[id];
    res.send({'message':'Delete'});
})

app.listen(app.get('port'),()=>{
    console.log('on port',app.get('port'))
})

module.exports = app;