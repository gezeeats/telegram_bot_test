const { axiosInstance } = require("./axios");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Only declare foodItems once
const foodItems = [
    {
        name: "Delicious Pizza2",
        price: 412.0,
        distance: "1.75 KM",
        score: 109,
        photo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        restaurant: "Restaurant R16",
        restaurantCallback: "restaurant_16",
        orderCallback: "order_444",
        cartCallback: "cart_444"
    },
    {
        name: "Tasty Burger2",
        price: 200.0,
        distance: "2.1 KM",
        score: 98,
        photo: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        restaurant: "Restaurant R21",
        restaurantCallback: "restaurant_21",
        orderCallback: "order_555",
        cartCallback: "cart_555"
    },
    // add more food items here...
];
const restaurants = [
    {
        name: "Restaurant R9 New2",
        distance: "1.72 KM",
        score: 135,
        photo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
        menuCallback: "menu_9",
     
    },
    {
        name: "Restaurant R12",
        distance: "2.4 KM",
        score: 98,
        photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
        menuCallback: "menu_9",
    }
];

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
                inline_keyboard: [
                    [{ text: `🏪 ${item.restaurant}`, callback_data: item.restaurantCallback }],
                    [
                        { text: "🛒 Order", callback_data: item.orderCallback },
                        { text: "➕ Add to Cart", callback_data: item.cartCallback }
                    ]
                ]
            }
        });

        // optional small delay between items
        await delay(300);
    }
}
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
                [{ text: "🛒 Order", callback_data: "order_cart" }]
            ]
        }
    });
}
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
}

function sendMessage(messageObj, messageText){
    return axiosInstance.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
        reply_markup: {
            remove_keyboard: true
        }
    });
}

// function handleMessage(messageObj) {

//     // ✅ HANDLE CONTACT FIRST
//     if (messageObj.contact) {
//         const phone = messageObj.contact.phone_number;

//         console.log("User phone:", phone);

//         return sendMessage(
//             messageObj,
//             `✅ Phone received: ${phone}`
//         );
//     }

//     const messageText = messageObj?.text || '';

//     if (messageText.startsWith("/")) {
//         const command = messageText.slice(1);

//         switch (command) {
//             case 'start':
//                 return sendMessage(messageObj, "Hi! I'm a bot. I can help you get started");

//             case 'food':
//                 return sendFoodList(messageObj);

//             case 'res':
//                 return sendRestaurantList(messageObj);

//             default:
//                 return sendMessage(messageObj, "Unknown command");
//         }
//     } else {
//         return sendMessage(messageObj, messageText || "Send a command 🙂");
//     }
// }
function handleMessage(messageObj) {

    // ❌ Ignore non-text messages (like contact, photo, etc.)
    if (!messageObj.text) {
        console.log("Non-text message ignored");
        return; // do nothing
    }

    const messageText = messageObj.text;

    if (messageText.startsWith("/")) {
        const command = messageText.slice(1);

        switch (command) {
            case 'start':
                return sendMessage(messageObj, "Hi! I'm a bot. I can help you get started");

            case 'food':
                return sendFoodList(messageObj);

            case 'res':
                return sendRestaurantList(messageObj);
            case 'cart':
                return sendCartList(messageObj);

            default:
                return sendMessage(messageObj, "Unknown command");
        }
    } else {
        return sendMessage(messageObj, "Please use commands like /start, /food, /res");
    }
}
module.exports = { handleMessage };