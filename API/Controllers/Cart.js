import { Cart } from "../Models/Cart.js";


// ADD TO CART
export const addToCart = async (req, res) => {
    const { productId, title, description, price, quantity, imageSRC } = req.body;

    const userId = req.user;
    console.log(userId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items:[] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price += price * quantity;
    } else {
        cart.items.push({ productId, title, description, price, quantity, imageSRC });
    }

    await cart.save();
    res.json({ message: "item added to cart", cart });

}

// gET USER SPECIFIC CART

export const userCart = async (req, res) => {

    const userId = req.user;

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json("Cart not found");

    res.json({message:"user cart", cart})
}

// REMOVE PRODUCT FROM CART

export const removeFromCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json("Cart not found");

    cart.items = cart.items.filter((item) => {
        return item.productId.toString() !== productId; // Include the return statement
    });

    await cart.save();

    res.json({ message: "Product removed" });
}


// CLEAR CART

export const clearCart = async (req, res) => {

    const userId = req.user;

    let cart = await Cart.findOne({userId});

    if(!cart){
        cart= new Cart({items:[]})
    }else{
        cart.items = [];
    }

    await cart.save();

    res.json({message: "Cart cleared"});
}


// DECREASE QUANTITY
export const decreaseQty = async (req, res) => {
    const { productId, quantity } = req.body;

    const userId = req.user;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

    if (itemIndex > -1) {

        const item = cart.items[itemIndex];
        if(item.quantity > quantity){
            const pricePerUnit = item.price/item.quantity;
            item.quantity -= quantity;
            item.price -= pricePerUnit*quantity;
        }else{
            cart.items.splice(itemIndex, 1);
        }
    } else {
        return res.json({message:"INVALID PRODUCTID"});
    }

    await cart.save();
    res.json({ message: "Quantity decreased", cart });

}