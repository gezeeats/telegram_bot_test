const { sendMainKeyboardBelow ,delay} = require("./../../utils");
const { axiosInstance } = require("./../../axios");
const { foodItems } = require("./../../constants");




async function sendFoodList(messageObj) {
    const chatId = messageObj.chat.id;

    // ✅ Show typing indicator
    await axiosInstance.post("sendChatAction", {
        chat_id: chatId,
        action: "typing"
    });

    // Simulate delay OR fetch real data
    await delay(1500);

    // Send food list
    for (const item of foodItems) {
        await axiosInstance.post("sendPhoto", {
            chat_id: chatId,
            photo: item.photo,
            caption: `
🏪 ${item.restaurant}
🍽️ *${item.name}*

💰 Price: *${item.price} Birr*
💰 Delivery Price: *${50} Birr*
💰 TotlalPrice: *${item.price+50} Birr*
📍 Distance: ${item.distance} KM
⭐ Score: ${item.score}
            `,
            parse_mode: "Markdown",
            reply_markup: {
                // ...getMainKeyboard(), 
                inline_keyboard: [
                    [
                        { text: "🍔 Order", callback_data: item.orderCallback },
                    ],
                    [
                        { text: `🏪 ${item.restaurant}`, callback_data: item.restaurantCallback },
                        { text: "➕ Add to Cart", callback_data: item.cartCallback },
                        { text: "❤️ Favorite", callback_data: `fav_${item.orderCallback}` }
                    ],
                    [
                        { text: `🏪 ${item.restaurant}`, callback_data: item.restaurantCallback }
                       
                    ]
                ]
            }
        });

        // optional small delay between items
        await delay(300);
    }
    await sendMainKeyboardBelow(chatId);

}
module.exports = { sendFoodList };
