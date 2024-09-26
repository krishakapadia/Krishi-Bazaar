async function getProducts(req, res) {

    try {
        let { searchQuery, page, limit } = req.body;

        const products = await prisma.product.findMany({
            where: {
                OR: [

                    { productName: { contains: searchQuery, mode: 'insensitive' } },
                    { customProductName: {contains: searchQuery, mode: 'insensitive'}},
                ]
            },
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            include: {
                farmer: {
                    select: {
                        farmerId: true,
                        name: true,
                        phone: true,
                        email: true,
                        address: true,
                        profileImage: true
                    }
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        customerId: true
                    }
                }
            }
        });

        return products;
	

    } catch (error) {
        console.error('Error getting products:', error);
        return { status: 'error', message: 'Error getting products' };
    }
}

module.exports = getProducts;