const { sendMainKeyboardBelow ,delay} = require("./../../utils");
const { axiosInstance } = require("./../../axios");
const { restaurants } = require("./../../constants");
async function sendRestaurantList(messageObj) {
    const chatId = messageObj.chat.id;

    // ✅ Show typing indicator
    await axiosInstance.post("sendChatAction", {
        chat_id: chatId,
        action: "typing"
    });

    // Simulate delay OR fetch real data
    await delay(1500);

    // Send food list
    for (const res of restaurants) {
        await axiosInstance.post("sendPhoto", {
            chat_id: chatId,
            photo: res.photo,
            caption: `
🏪 *${res.name}*
🟡 Score: ${res.score}
📍 Around ${res.distance}
            `,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [{ text: `🏪 View Menu`, callback_data: res.menuCallback }],
                   
                ]
            }
        });

        // optional small delay between items
        await delay(300);
    }
      await sendMainKeyboardBelow(chatId);


    
}
module.exports = { sendRestaurantList };