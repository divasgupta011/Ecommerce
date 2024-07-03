import { Products } from "../Models/Products.js";


// ADD PRODUCT
export const addProduct = async (req, res) => {
    const { title, price, category, quantity, imageSRC }  = req.body;
    try {
        let product = await Products.create({
            title, price, category, quantity, imageSRC
        });
        res.json({message:"Product added successfully", product});
    } catch (error) {
        res.json(error.message);
    }
}

// GET PRODUCT
export const getProducts = async (req, res) => {
    const product = await Products.find().sort({createdAt:-1});
    res.json({message:"All products", product});
}


// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    const id = req.params.id;
    let product = await Products.findById(id);
    if(!product) return res.json({message:"Invalid id"});
    res.json({message:"Product", product});
}

// UPDATE PRODUCT BY ID
export const updateProductById = async (req, res) => {
    const id = req.params.id;
    let product = await Products.findByIdAndUpdate(id, req.body, {new:true});
    if(!product) return res.json({message:"Invalid id"});
    res.json({message:"Product updated successfully", product});
}

// DELETE PRODUCT BY ID
export const deleteProductById = async (req, res) => {
    const id = req.params.id;
    let product = await Products.findByIdAndDelete(id);
    if(!product) return res.json({message:"Invalid id"});
    res.json({message:"Product deleted successfully", product});
}