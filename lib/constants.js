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
module.exports = {
    foodItems,
    restaurants,
    orderList
};