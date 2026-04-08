// helpers/messages.js
const { axiosInstance } = require("./axios");
const { getMainKeyboard } = require("./frontend/bottom_button/main_bottom_button");
const { getOthersKeyboard } = require("./frontend/bottom_button/others_bottom_button");

// ---- Delay Utility ----
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- Unified Send Message ----
function sendMessage(messageObj, messageText, options = {}) {
    const { keyboard = getMainKeyboard(), parseMode = "Markdown" } = options;
    return axiosInstance.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
        parse_mode: parseMode,
        reply_markup: keyboard
    });
}

// ---- Send message with a custom keyboard ----
function sendMessageWithKeyboard(messageObj, messageText, keyboard, parseMode = "Markdown") {
    return axiosInstance.post("sendMessage", {
        chat_id: messageObj.chat.id,
        text: messageText,
        parse_mode: parseMode,
        reply_markup: keyboard
    });
}

// ---- Convenience Functions ----
function sendMainKeyboardBelow(chatId) {
    return axiosInstance.post("sendMessage", {
        chat_id: chatId,
        text: ".", 
        reply_markup: getMainKeyboard()
    });
}

function sendOthersPage(messageObj) {
    return sendMessageWithKeyboard(
        messageObj,
        ".",
        getOthersKeyboard()
    );
}

module.exports = { delay, sendMainKeyboardBelow, sendMessage, sendMessageWithKeyboard, sendOthersPage };