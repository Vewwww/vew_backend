module.exports.catchAsyncErr=(fn)=>{
    return(req,res,next)=>{
        fn(req,res).catch(err=>{
            next();
        })
    }
}