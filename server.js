const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;
const bp = require('body-parser')
const longpoll = require("express-longpoll")(app)

longpoll.create("/poll");
let chat=[]
let num=0

app.use(express.static(path.join(__dirname, 'static')))
app.listen(PORT, () => console.log('serwer startuje na: ' + PORT))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get("/" ,function(req,res){
    res.sendFile(path.join(__dirname, 'static', 'irc.html'))
})

longpoll.publish("/poll", chat);

// setInterval(function () { 
// }, 5000);

app.post("/messageOut", (req,res)=>{
    const messageObj = req.body 
    messageObj.num = num
    console.log(messageObj)
    // chat.push(messageObj)
    chat=[messageObj]
    longpoll.publish("/poll", chat);
    res.end("message in")
})

app.post("/stop", function(req, res){
    chat.push({})
    res.end("stopped es")
})