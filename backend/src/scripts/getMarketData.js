const axios = require('axios');

async function myScript() {
    let offset = 0;
    const apiUrl = 'https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24';
    const apiKey = '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b';
    const format = 'json';
    const limit = 99;
    const stateFilter = 'Maharashtra';

    const uniqueProducts = new Map();

    while (uniqueProducts.size < 50) {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    'api-key': apiKey,
                    format,
                    limit,
                    offset,
                    'filters[State.keyword]': stateFilter
                }
            });

            const newRecords = response.data.records;

            if (newRecords.length === 0) {
                console.log("No more data available from the API.");
                break;
            }

            for (const record of newRecords) {
                const commodityKey = record.Commodity.trim();

                if (!uniqueProducts.has(commodityKey) && uniqueProducts.size < 50) {
                    uniqueProducts.set(commodityKey, record);
                    console.log(`Added new product: ${commodityKey}. Total unique products: ${uniqueProducts.size}`);
                }

                if (uniqueProducts.size >= 50) {
                    break;
                }
            }

            offset += newRecords.length;
            console.log(`Processed ${newRecords.length} records. Total unique products: ${uniqueProducts.size}`);

        } catch (error) {
            console.error('Error fetching data:', error.message);
            break;
        }
    }

    const uniqueProductsArray = Array.from(uniqueProducts.values());
    console.log("Final unique products:", JSON.stringify(uniqueProductsArray, null, 2));
    console.log(`Total unique products fetched: ${uniqueProductsArray.length}`);

    return uniqueProductsArray;

}

module.exports = myScript;