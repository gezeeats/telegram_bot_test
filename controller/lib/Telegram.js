const { axiosInstance } = require("./axios");

function sendMessage(messageObj,messageText){
    return axiosInstance.get("sendMessage",{
        chat_id:messageObj.chat.id,
        text:messageText,
    });
}
function handleMessage(messageObj){
    const messageText=messageObj.text ||'';
    if (messageText.startsWith("/")) {
        const command = messageText.slice(1);
        switch (command) {
            case 'start':
                return sendMessage(messageObj,"Hi! I'm a bot. I can help you to get started");
                
                break;
            case 'test':
                return sendMessage(messageObj,"Testing if it works");
                
                break;
            case 'test2':
                return sendMessage(messageObj,"Testing if test2 works");
                
                break;
            case 'view':
                return sendMessage(messageObj,"i am going be showing foods here");
                
                break;
        
            default:
                return sendMessage(messageObj,"Unknown command");
                break;
        }
    }
    else{
        return sendMessage(messageObj,messageText);
    }
}

module.exports = { handleMessage };