const prisma = require('../config/prismaConfig.js');

async function getBid(req, res) {
    
    let { farmerId } = req.body;

    try {
        const result = await prisma.bid.findMany({
            where: {
                farmerId: farmerId
            },
            include: {
                customer: true,
                farmer: true,
                product: true
            }
        });
        console.log("Bid found successfully:", result);

        res.json({ message: 'Bid found successfully', result });

    } catch (err) {
        console.error("Error finding bid:", err);
    }

}

module.exports = getBid;