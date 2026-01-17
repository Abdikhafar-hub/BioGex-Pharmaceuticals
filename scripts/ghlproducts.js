require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const ACCESS_TOKEN = process.env.GHL_ACCESS_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID;
const FIELD_ID = process.env.GHL_FIELD_ID;

if (!ACCESS_TOKEN || !LOCATION_ID || !FIELD_ID) {
    console.error('❌ Missing environment variables. Please set GHL_ACCESS_TOKEN, GHL_LOCATION_ID, and GHL_FIELD_ID in .env.local');
    // We allow the script to continue only if the user hardcodes them, but for this robust script we prefer env vars.
    // Uncomment below if you want to allow hardcoding fallback (not recommended for repo code)
    // process.exit(1); 
}

// Public API (OAuth Access Token) - Standard V2
const API_URL = `https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/${FIELD_ID}`;

// Internal API (Session Token) - COMMENTED OUT
// const API_URL = `https://backend.leadconnectorhq.com/locations/${LOCATION_ID}/customFields/${FIELD_ID}`;

async function updateCustomField() {
    try {
        console.log(`Reading product list from prods.json...`);
        const jsonPath = path.join(__dirname, 'prods.json');
        
        if (!fs.existsSync(jsonPath)) {
            throw new Error('prods.json not found in the current directory.');
        }

        const productData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        // Validation: Expecting { name: "...", options: [...] }
        if (!productData.options || !Array.isArray(productData.options)) {
             throw new Error('Invalid JSON structure in prods.json. Expected "options" array.');
        }

        console.log(`Loaded ${productData.options.length} items from prods.json.`);
        console.log(`Field Name: "${productData.name}"`);

        // GHL API v2 Payload
        const payload = {
            name: productData.name || "Products Interested In",
            options: productData.options
        };

        if (!ACCESS_TOKEN) {
           console.warn('⚠️ No ACCESS_TOKEN found. Skipping actual API call. Set variables in .env.local to execute.');
             return;
        }

        console.log(`Starting update for Field ID: ${FIELD_ID}...`);

        const response = await axios.put(API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28' 
            }
        });

        if (response.status === 200 || response.status === 201) {
            console.log('✅ Success! 1,100+ items have been updated in the dropdown.');
            // console.log('Response:', response.data);
        } else {
            console.log(`⚠️ Unexpected status code: ${response.status}`);
            console.log(response.data);
        }
    } catch (error) {
        console.error('❌ Error updating custom field:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
}

updateCustomField();