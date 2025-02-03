const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500 : res.statusCode
    switch(statusCode){
        case 400:
            res.status(400)
            res.json({title:"Bad Request",message:err.message})
            break
        case 401:
            res.status(401)
            res.json({title:"Unauthorized",message:err.message})
            break
        case 404:    
            res.status(404)
            res.json({title:"Not Found",message:err.message})
            break
        case 500:
            res.status(500)
            res.json({title:"Internal Server Error",message:err.message})
            break
    }
}

module.exports=errorHandler