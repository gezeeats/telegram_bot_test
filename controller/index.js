const {handleMessage}= require('./lib/Telegram');

async function handler(req,method) {
    
    const {body}= req;
   
        if(body){
            const messageObj=body.message;
            await handleMessage(messageObj);

        }
        return;
    
}
module.exports={handler};
// const { handleMessage } = require('./lib/Telegram');

// async function handler(req, res) {
//     const { body } = req;

//     if (body && body.message) {
//         const messageObj = body.message;
//         await handleMessage(messageObj);
//     }

//     // Always respond to Telegram
//     res.send("OK");
// }

module.exports = { handler };