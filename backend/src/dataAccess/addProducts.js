const prisma = require('../config/prismaConfig.js');

async function addProducts(req, res) {
    let { customProductName, price, description, currentquantity, productName, productImage, farmerId, category } = req.body;

    // Parse numeric values
    price = parseFloat(price);
    currentquantity = parseFloat(currentquantity);


    try {
        const result = await prisma.product.create({

            data: {
                customProductName: customProductName,
                price: price,
                description: description,
                currentQuantity: currentquantity,
                productName: productName,
                productImage: productImage,
                farmerId: farmerId,
                category: category
            }

            // for postman write




        })
        console.log("Product created successfully:", result);
    } catch (err) {
        console.error("Error creating product:", err);
    }
}

module.exports = addProducts;
