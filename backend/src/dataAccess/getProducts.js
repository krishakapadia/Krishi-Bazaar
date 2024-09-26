const prisma = require('../config/prismaConfig');

async function getProducts(req, res) {
    let { searchQuery, page, limit } = req.body;

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { productName: { contains: searchQuery, mode: 'insensitive' } },
                { customProductName: { contains: searchQuery, mode: 'insensitive' } },
            ]
        },
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        include: {
            Farmer: {
                select: {
                    farmerId: true,
                    name: true,
                    phone: true,
                    email: true,
                    address: true,
                    profileImage: true
                }
            },
            Review: {  // Changed from 'review' to 'Review' to match the schema
                select: {
                    rating: true,
                    comment: true,
                    customerId: true
                }
            }
        }
    });

    return products;
}

module.exports = getProducts;