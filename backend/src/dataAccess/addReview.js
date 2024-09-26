const prisma = require('../config/prismaConfig.js');

async function addReview(req, res) {
    let { rating, comment, productId, customerId, farmerId } = req.body;
    
    rating = parseFloat(rating);

    try {
        // Check if the user has bought the product
        const hasBought = await prisma.transaction.findFirst({
            where: {
                productId,
                customerId
            }
        });

        if (!hasBought || hasBought.paymentStatus === "INESECROW") {
            return res.status(400).json({
                message: "You have not bought this product"
            });
        }

        // Add the review
        const reviewAdded = await prisma.review.create({
            data: {
                rating,
                comment,
                productId,
                customerId,
                farmerId
            }
        });

        // Increase the review count for the product
        await prisma.product.update({
            where: { productId },
            data: {
                ratingCount: { increment: 1 } // Increment the rating count by 1
            }
        });

        res.json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Review not added', error: error.message });
    }
}

module.exports = addReview;