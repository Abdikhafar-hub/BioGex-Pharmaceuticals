require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

const ACCESS_TOKEN = process.env.GHL_ACCESS_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;

const API_URL = `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`;

async function listCustomFields() {
    try {
        console.log('Fetching custom fields...');
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Version': '2021-07-28'
            }
        });

        const fields = response.data.customFields;
        console.log(`\nFound ${fields.length} custom fields:\n`);
        
        fields.forEach(f => {
            console.log(`Name: "${f.name}"`);
            console.log(`ID:   ${f.id}`);
            console.log(`Key:  ${f.fieldKey}`);
            console.log('---');
        });

    } catch (error) {
        console.error('❌ Error fetching fields:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

listCustomFields();
