const { sendMainKeyboardBelow ,delay} = require("./../../utils");
const { axiosInstance } = require("./../../axios");
const { orderList } = require("./../../constants");
async function sendOrderList(messageObj) {
    const chatId = messageObj.chat.id;

    // ✅ Show typing indicator
    await axiosInstance.post("sendChatAction", {
        chat_id: chatId,
        action: "typing"
    });

    await delay(1500);

    // 🔁 Loop through each restaurant order
    for (const order of orderList) {

        let itemsText = "";
        let itemsTotal = 0;
        let totalQty = 0;

        // 🔁 Loop through items inside the order
        for (const item of order.items) {
            const total = item.price * item.qty;

            itemsTotal += total;
            totalQty += item.qty;

            itemsText += `🍽️ ${item.name} x${item.qty} → *${total} Birr*\n`;
        }

        const totalPrice = itemsTotal + order.delivery;

        await axiosInstance.post("sendMessage", {
            chat_id: chatId,

            text: `
🏪 *${order.restaurant}*

${itemsText}

📦 Items: *${totalQty}*

💰 Food Total: *${itemsTotal} Birr*
🚚 Delivery: *${order.delivery} Birr*
💵 *Total: ${totalPrice} Birr*

📍 Distance: ${order.distance}
            `,
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "⋯ More Option", callback_data: `order_${order.restaurant}` }
                    ],
                    [
                        { text: "📄 View Detail", callback_data: `order_${order.restaurant}` }
                    ],
                   
                ]
            }
        });

        await delay(300);
    }

    await sendMainKeyboardBelow(chatId);
}
module.exports = { sendOrderList };
