const mongo=require('mongoose')
let MongoSchema=mongo.Schema

//Model creation
const movieSchema=new MongoSchema(
    {
        Movie:String,
        Actor:String,
        Actress:String,
        Director:String,
        Released_Year:String,
        Camera:String,
        Producer:String,
        Language:String
    })

    var movModel=mongo.model("movies",movieSchema)
    module.exports={movModel}    