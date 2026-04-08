const { axiosInstance } = require("./axios");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function sendMainKeyboardBelow(chatId) {
    return axiosInstance.post("sendMessage", {
        chat_id: chatId,
        // text: "\u200B",
        text: ".", 
        reply_markup: getMainKeyboard()
    });
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
const orderList = [
    {
        restaurant: "Restaurant R9 New2",
        distance: "0.86 KM",
        delivery: 40,
        items: [
            { name: "Food Test r9", price: 412, qty: 1 },
            { name: "Food Test r7", price: 412, qty: 5 },
            { name: "Food Test r2", price: 412, qty: 2 }
        ]
    },
    {
        restaurant: "Restaurant R16",
        distance: "0.86 KM",
        delivery: 60,
        items: [
            { name: "Food Test r16", price: 444, qty: 2 }
        ]
    },
    {
        restaurant: "Restaurant R2",
        distance: "0.86 KM",
        delivery: 40,
        items: [
            { name: "Food Test r2", price: 412, qty: 1 }
        ]
    }
];


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
async function sendFavFoodList(messageObj) {
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
                        { text: "❌ Remove Favorite", callback_data: `fav_${item.orderCallback}` }
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

// function sendMessage(messageObj, messageText){
//     return axiosInstance.post("sendMessage", {
//         chat_id: messageObj.chat.id,
//         text: messageText,
//         reply_markup: {
//             remove_keyboard: true
//         }
//     });
// }
function sendMessage(messageObj, messageText){
    return axiosInstance.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
        reply_markup: getMainKeyboard()   
    });
}


function sendMessageWithKeyboard(messageObj, messageText, keyboard) {
    return axiosInstance.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
        reply_markup: keyboard
    });
}
function getOthersKeyboard() {
    return {
        keyboard: [
            [
                { text: "🧾 Order History" },
                { text: "🔍 Search" }
            ],
            [
                { text: "👤 View Profile" },
                { text: "✏️ Edit Profile" }
            ],
            [
                { text: "⬅️ Back" }
            ]
        ],
        resize_keyboard: true,
        is_persistent: true
    };
}
function sendOthersPage(messageObj) {
    return sendMessageWithKeyboard(
        messageObj,
        ".",
        // "⚙️ *Other Options*\nChoose what you want:",
        getOthersKeyboard()
    );
}
function getMainKeyboard() {
    return {
        keyboard: [
            [
                { text: "🏪 Restaurants" },
                { text: "🍽 Food" },
           { text: "❤️ Favorite" },

            ],[
                { text: "🛒 Cart" },
                { text: "📦 Orders" },
                { text: "⚙️ others" },
            ]
        ],
        resize_keyboard: true,   // makes buttons fit nicely
        is_persistent: true      // keeps it always visible
    };
}
function handleMessage(messageObj) {

    if (!messageObj.text) return;

    const messageText = messageObj.text;

    // 🔹 MAIN MENU BUTTONS
    if (messageText === "🍽 Food") {
        return sendFoodList(messageObj);
    }

    if (messageText === "🏪 Restaurants") {
        return sendRestaurantList(messageObj);
    }
    if (messageText === "❤️ Favorite") {
        return sendFavFoodList(messageObj);
    }

    if (messageText === "🛒 Cart") {
        return sendCartList(messageObj);
    }

    if (messageText === "⚙️ others") {
        return sendOthersPage(messageObj);
    }

    // 🔹 OTHERS PAGE BUTTONS
    if (messageText === "📦 Orders") {
           return sendOrderList(messageObj);
        // return sendMessageWithKeyboard(
        //     messageObj,
        //     "📦 Your current orders...",
        //     getOthersKeyboard()
        // );
    }

    if (messageText === "🧾 Order History") {
        return sendMessageWithKeyboard(
            messageObj,
            "🧾 Your past orders...",
            getOthersKeyboard()
        );
    }

    if (messageText === "👤 View Profile") {
        return sendMessageWithKeyboard(
            messageObj,
            "👤 Profile info:\nName: John Doe\nPhone: 09xxxxxxx",
            getOthersKeyboard()
        );
    }

    if (messageText === "✏️ Edit Profile") {
        return sendMessageWithKeyboard(
            messageObj,
            "✏️ Send new name or phone to update profile",
            getOthersKeyboard()
        );
    }

    // 🔙 BACK BUTTON
    if (messageText === "⬅️ Back") {
        // return sendMessageWithKeyboard(
        //     messageObj,
        //     "🏠 Back to main menu",
        //     getMainKeyboard()
        // );
        return sendRestaurantList(messageObj);
    }

    // 🔹 COMMANDS
    if (messageText.startsWith("/")) {
        const command = messageText.slice(1);

        if (command === "start") {
            return sendMessageWithKeyboard(
                messageObj,
                "Welcome! Use buttons below 👇",
                getMainKeyboard()
            );
        }
    }

    return sendMessageWithKeyboard(
        messageObj,
        "Use the buttons below 👇",
        getMainKeyboard()
    );
}
module.exports = { handleMessage };