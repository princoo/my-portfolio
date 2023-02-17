const express= require('express')
const{connect} = require('./src/configs/database')
const cookieparser= require('cookie-parser')
const dotenv= require('dotenv')
const cors= require('cors')
const swaggerJSDoc= require('swagger-jsdoc')
const swaggerUi= require('swagger-ui-express')
const upload= require('./src/configs/multer')
const blogRoutes= require('./src/routes/blogroutes')
// const Image= require('../NODE_MONGO_TUTORIAL/src/models/imagemodel')
// const cloudinary= require('./src/configs/cloudinary')
const verifyUser = require('./src/middlewares/verifyuser')

const app= express()
connect("CHALLENGE")

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API library",
            version:1.0,
            description:" simple API Library",
        },
        servers:[
            {
                url:'http://localhost:5000/'
            }
        ],
    },
        apis:['./src/routes/*.js']
    
}
const specs= swaggerJSDoc(options);
app.use('/myapi',swaggerUi.serve,swaggerUi.setup(specs))

app.use( express.static( "public" ) );
app.set('view engine','ejs')
app.use(express.json())
app.use(cookieparser())
dotenv.config()
app.use(cors(
    {
        // origin: 'http://127.0.0.1:550',
        // optionsSuccessStatus: 200 
      }
))

app.all('*',verifyUser)
app.use('',blogRoutes)

const PORT = process.env.PORT ||3000
const server= app.listen(PORT,()=>{
    console.log(`server connected fine ${PORT}`)
   })
module.exports= server

