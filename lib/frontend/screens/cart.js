const { sendMainKeyboardBelow ,delay} = require("./../../utils");
const { axiosInstance } = require("./../../axios");
const { foodItems } = require("./../../constants");

async function sendCartList(messageObj) {
    const chatId = messageObj.chat.id;

    // ✅ Show typing indicator
    await axiosInstance.post("sendChatAction", {
        chat_id: chatId,
        action: "typing"
    });

    await delay(1500);

    // ✅ Send cart items
    for (const item of foodItems) {
        await axiosInstance.post("sendPhoto", {
            chat_id: chatId,
            photo: item.photo,
            caption: `
🏪 ${item.restaurant}
🍽️ *${item.name}*

💰 Price: *${item.price} Birr*
⭐ Score: ${item.score}
            `,
            parse_mode: "Markdown"
        });

        await delay(300);
    }

    // ✅ Send summary message (FIXED)
    await axiosInstance.post("sendMessage", {
        chat_id: chatId,
        text: `
.           💰 Total Food  Price: *4950 Birr    .*
.           💰 Delivery Price: *315 Birr        .*
.           💰 Total Price: *5256 Birr*         .
.           📍  Distance: 1.6 KM                .
        `,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [
                [{ text: "🍔 Order", callback_data: "order_cart" }]
            ]
        }
    });
      await sendMainKeyboardBelow(chatId);
}
module.exports = { sendCartList };