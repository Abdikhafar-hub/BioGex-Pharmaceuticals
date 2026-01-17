
const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local manually since we might not have dotenv installed
const envPath = path.resolve(__dirname, '../.env.local');
let envVars = {};
try {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.error("Could not read .env.local");
}

const token = envVars.GHL_ACCESS_TOKEN || process.env.GHL_ACCESS_TOKEN;
const locationId = envVars.GHL_LOCATION_ID || process.env.GHL_LOCATION_ID;

if (!token || !locationId) {
    console.error("Missing GHL_ACCESS_TOKEN or GHL_LOCATION_ID in .env.local");
    process.exit(1);
}

const options = {
    hostname: 'services.leadconnectorhq.com',
    path: `/opportunities/pipelines?locationId=${locationId}`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.pipelines) {
                console.log("--- FOUND PIPELINES ---");
                response.pipelines.forEach(p => {
                    console.log(`Pipeline: "${p.name}" (ID: ${p.id})`);
                    if (p.stages) {
                        p.stages.forEach(s => {
                            console.log(`  - Stage: "${s.name}" (ID: ${s.id})`);
                        });
                    }
                });
                console.log("-----------------------");
            } else {
                console.log("No pipelines found or error in response:", response);
            }
        } catch (e) {
            console.error("Error parsing response:", e);
            console.log("Raw Output:", data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
