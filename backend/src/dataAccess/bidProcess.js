const prisma = require('../config/prismaConfig.js')

async function bidProcess(req, res) {

    const { id, accept } = req.body;

    if(accept){
        //remove that bid from the database and all other bids for that productid
        //store the removed data in server memory
        //add the removed data to the transaction table

        const bid = await prisma.bid.findUnique({
            where: {
                id: id
            },
            include: {
                product: true,
                customer: true,
                farmer: true
            }  
        });

        const product = bid.product;
        const customer = bid.customer;
        const farmer = bid.farmer;

        const transaction = await prisma.transaction.create({
            data: {
                customerId: customer.customerId,
                farmerId: farmer.farmerId,
                productId: product.productId,
                quantity: bid.requiredQuantity,
                totalAmount: bid.offerPrice * bid.requiredQuantity
            }
        });

        //remove all bids for that product
        await prisma.bid.deleteMany({
            where: {
                productId: product.id
            }
        });

        return res.json({ message: 'Bid accepted successfully' });

    }

}

module.exports = bidProcess;