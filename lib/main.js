const { axiosInstance } = require("./axios");
const { sendFoodList } = require("./frontend/screens/foods");
const { sendRestaurantList } = require("./frontend/screens/restaurants");
const { sendFavFoodList } = require("./frontend/screens/favorite");
const { sendCartList } = require("./frontend/screens/cart");
const { sendOthersPage } = require("./utils");
const { sendOrderList } = require("./frontend/screens/orders");
const { sendMessageWithKeyboard } = require("./utils");
const { getMainKeyboard } = require("./frontend/bottom_button/main_bottom_button");
const { getOthersKeyboard } = require("./frontend/bottom_button/others_bottom_button");
function handleMessage(messageObj) {

    if (!messageObj.text) return;

    const messageText = messageObj.text;

    // 🔹 MAIN MENU BUTTONS
    if (messageText === "🍽 Foods") {
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

    if (messageText === "⚙️ Others") {
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
        return sendFoodList(messageObj);
    }

    // 🔹 COMMANDS
    if (messageText.startsWith("/")) {
        const command = messageText.slice(1);

        if (command === "start") {
            // return sendMessageWithKeyboard(
            //     messageObj,
            //     "Welcome! Use buttons below 👇",
            //     getMainKeyboard()
            // );
           return sendFoodList(messageObj);
        }
    }

    return sendMessageWithKeyboard(
        messageObj,
        "Use the buttons below 👇",
        getMainKeyboard()
    );
}
module.exports = { handleMessage };