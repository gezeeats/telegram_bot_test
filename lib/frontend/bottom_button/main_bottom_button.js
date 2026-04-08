function getMainKeyboard() {
    return {
        keyboard: [
            [
                { text: "🏪 Restaurants" },
                { text: "🍽 Foods" },
           { text: "❤️ Favorite" },

            ],[
                { text: "🛒 Cart" },
                { text: "📦 Orders" },
                { text: "⚙️ Others" },
            ]
        ],
        resize_keyboard: true,   // makes buttons fit nicely
        is_persistent: true      // keeps it always visible
    };
}
module.exports = { getMainKeyboard };
