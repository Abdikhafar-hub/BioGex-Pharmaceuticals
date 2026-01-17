const fs = require('fs');

try {
    const rawText = fs.readFileSync('productlist.txt', 'utf8');
    const jsonContent = JSON.parse(fs.readFileSync('prods.json', 'utf8'));

    // Parse text file: split by newline, trim, remove empty lines
    const textItems = rawText.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && line !== 'Name'); // removing 'Name' header if present

    const jsonItems = jsonContent.options;

    console.log(`Text File Items: ${textItems.length}`);
    console.log(`JSON File Items: ${jsonItems.length}`);

    // Find differences
    const notInJson = textItems.filter(item => !jsonItems.includes(item));
    const notInText = jsonItems.filter(item => !textItems.includes(item));

    if (notInJson.length > 0) {
        console.log('\nItems in Text but NOT in JSON (First 10):');
        notInJson.slice(0, 10).forEach(i => console.log(`- "${i}"`));
    } else {
        console.log('\nAll text items are present in JSON.');
    }

    if (notInText.length > 0) {
        console.log('\nItems in JSON but NOT in Text (First 10):');
        notInText.slice(0, 10).forEach(i => console.log(`- "${i}"`));
    } else {
        console.log('\nAll JSON items are present in Text.');
    }

    const isMatch = notInJson.length === 0 && notInText.length === 0;
    console.log(isMatch ? '\nVERIFICATION SUCCESS: Lists match exactly.' : '\nVERIFICATION FAILED: Lists differ.');

} catch (err) {
    console.error('Error reading files:', err);
}
