const exp=require('express')
const bodyParser=require('body-parser')
const mongo=require('mongoose')
const {movModel}=require('./model')
const { response } = require('express')


//INITIALIZE
let app=exp()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//CORS Policy
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET','POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    next()
})

//DataBase Connection
mongo.connect("mongodb+srv://Athira:Athi@cluster0.ltbk6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


//Routes
app.get('/',(req,res)=>{
    res.send("helloooo")
})  

//DataView....
app.get('/view',async(req,res)=>{
    try{
        var result=await movModel.find()
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)

    }
})



//POST Method

app.post('/add',async(req,res)=>{
try{
    console.log(req.body)
    let movie=new movModel(req.body)
    let result=await movie.save()
    res.json(result)
     
}    
catch(error)
{
    res.status(500).send(error)
}


})


//Delete
app.post('/delete',async(req,res)=>{
    try{
        var result=await movModel.findByIdAndDelete(req.body)
        res.json({"status":"Deleted......"})
    }
    catch(error){
        res.send(500).json({"status":error})
    }
})
//Update
app.post('/update',async(req,res)=>{
    try{
        var result=await movModel.findByIdAndUpdate(req.body._id,req.body)
        res.json({"status":"UPDATED..."})
    }
    catch(error){
        res.send(500).json({"status":error})
    }
})


//TO SEARCH
app.post('/search',async(req,res)=>{
    try{
        var result=await movModel.find({"Movie":{$regex:'.*'+req.body.Movie+'.*'}})
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.post('/searchUpd',async(req,res)=>{
    try{
        var result=await movModel.find(req.body)
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
    }
})








//to run servet

app.listen(8082,()=>{
    console.log('Running...')
})
