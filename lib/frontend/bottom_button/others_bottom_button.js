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
module.exports = { getOthersKeyboard };
