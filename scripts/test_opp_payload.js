
const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local
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

const token = envVars.GHL_ACCESS_TOKEN;
const locationId = envVars.GHL_LOCATION_ID;
const pipelineId = envVars.GHL_PIPELINE_ID;
const stageId = envVars.GHL_STAGE_ID;

if (!token || !locationId || !pipelineId || !stageId) {
    console.error("Missing env vars. Please check .env.local");
    process.exit(1);
}

// 1. First, search for ANY contact to attach the opportunity to
const searchOptions = {
    hostname: 'services.leadconnectorhq.com',
    path: `/contacts/search?locationId=${locationId}&limit=1`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
    }
};

console.log("Searching for a contact...");
const searchReq = https.request(searchOptions, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const json = JSON.parse(data);
        if (!json.contacts || json.contacts.length === 0) {
            console.error("No contacts found to test with.");
            return;
        }
        const contactId = json.contacts[0].id;
        console.log(`Found Contact ID: ${contactId}`);
        
        // 2. Try to Create Opportunity with "Corrected" Keys
        // Hypothesis: title -> REMOVE, stageId -> pipelineStageId, notes -> ???
        testOpportunityCreation(contactId);
    });
});
searchReq.end();

function testOpportunityCreation(contactId) {
    const payload = {
        locationId: locationId,
        contactId: contactId,
        pipelineId: pipelineId,
        // CHANGED: stageId -> pipelineStageId (Common V2 key)
        pipelineStageId: stageId, 
        name: "Test Opportunity Schema Check " + new Date().toISOString(),
        status: "open",
        // REMOVED: title (Error said it shouldn't exist)
        // TESTING: notes - Error said it shouldn't exist. trying 'description' or omitting to see success first.
        // Let's try minimal first, but I'll add 'monetaryValue' just to be real.
    };

    console.log("Testing Minimal Payload (using pipelineStageId)...");
    
    const postOptions = {
        hostname: 'services.leadconnectorhq.com',
        path: `/opportunities/`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const req = https.request(postOptions, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
             console.log(`Status: ${res.statusCode}`);
             console.log("Response:", data);
        });
    });

    req.write(JSON.stringify(payload));
    req.end();
}
