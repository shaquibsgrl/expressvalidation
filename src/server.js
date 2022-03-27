const app=require("./index");

const connect=require("./config/db")

app.listen(5100,async()=>{

    await connect()
    console.log("listening on port 5100")

})