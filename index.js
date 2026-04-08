const express = require("express");
const PORT = process.env.PORT || 5123;
const { handleMessage } = require("./lib/main");


async function handler(req,method) {
    
    const {body}= req;
   
        if(body){
            const messageObj=body.message;
            await handleMessage(messageObj);

        }
        return;
    
}

const app = express();
app.use(express.json());

app.post(/.*/, async (req, res) => {
    console.log(req.body);
    res.send(await handler(req));
});

app.get(/.*/, async (req, res) => {
    
    res.send(await handler(req));
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server Listening on PORT", PORT);
});