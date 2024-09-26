const prisma = require('../config/prismaConfig.js');

async function addBid(req, res) {
    
    let { customerId, farmerId, productId, requiredQuantity, offerPrice } = req.body;

    requiredQuantity = parseFloat(requiredQuantity);
    offerPrice = parseFloat(offerPrice);

    try {
        const result = await prisma.bid.create({
            data: {
                customerId,
                farmerId,
                productId,
                requiredQuantity,
                offerPrice
            }
        });
        console.log("Bid created successfully:", result);

        res.json({ message: 'Bid created successfully' });

    } catch (err) {
        console.error("Error creating bid:", err);
    }

}

module.exports = addBid;
