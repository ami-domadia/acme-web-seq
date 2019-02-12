//Did not deploy to heroku

const express=require('express')
const app=express()
const morgan=require('morgan')
const db=require('./db.js')
module.exports=app

app.use(morgan('dev'))
app.get('/', (req,res)=>{
    res.redirect('/pages/1')
})

app.get('/pages/:id', async(req, res, next)=>{
    try{
        //could not get db.Page.getContent() to work so ended up using
        //db.Content.findOne( where..)
        const header=await Promise.all([db.Page.findByPk(req.params.id), 
            db.Content.findOne({where: {pageId:req.params.id}})])
        
        const final='<html>'+header[0].title + '<br>'+header[1].body+'</html>'
        await res.send(final)
    }
    catch(error){
        next(error)
    }
})

//does this need a try/catch?
try{
    db.syncAndSeed()
}
catch(error){console.log(error)}


const PORT=3000
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
})