# Google Sheets Setup Guide

## Current Issue
The Google Sheets is showing "You need access" because the service account doesn't have permission to access the spreadsheet.

## Solution Steps

### 1. Share the Google Sheet with Service Account

1. **Open your Google Sheet**: `https://docs.google.com/spreadsheets/d/1_r8QwxsXfs-wJh-AgX2mF1YnwqxSQPFD_Jdy8mK-10A`

2. **Click the "Share" button** in the top right corner

3. **Add the service account email**:
   - Email: `biogex@biogexsheets.iam.gserviceaccount.com`
   - Role: **Viewer** (or Editor if you want to write data)
   - Uncheck "Notify people" (optional)

4. **Click "Share"**

### 2. Alternative: Make Sheet Public (for testing)

If you want to test quickly, you can make the sheet public:

1. Click "Share" → "Change to anyone with the link"
2. Set to "Viewer"
3. Click "Done"

### 3. Verify Sheet Structure

Your Google Sheet should have headers in the first row. Example structure:

| Name | Category | Manufacturer | Strength | Pack Size | Price | Description |
|------|----------|--------------|----------|-----------|-------|-------------|
| Product 1 | Generic | Company A | 500mg | 30 tablets | 25.99 | Description here |
| Product 2 | Branded | Company B | 1000mg | 60 capsules | 45.50 | Description here |

### 4. Test the API

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit the test page**: `http://localhost:3000/test-api`

3. **Click "Test API Connection"** to verify everything is working

### 5. Access the Products Page

Once the API is working, you can access the products catalog at:
- `http://localhost:3000/products`

## Troubleshooting

### Common Issues:

1. **"Failed to fetch products" error**:
   - Check that the service account email has access to the sheet
   - Verify the spreadsheet ID is correct
   - Ensure the sheet name is correct (default: "Sheet1")

2. **"No data found" error**:
   - Make sure your sheet has data (not just headers)
   - Check that the sheet name matches exactly

3. **Authentication errors**:
   - Verify the private key in `.env.local` is correct
   - Ensure the private key includes the full `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts

### Environment Variables Check:

Make sure your `.env.local` file contains:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=biogex@biogexsheets.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
SPREADSHEET_ID=1_r8QwxsXfs-wJh-AgX2mF1YnwqxSQPFD_Jdy8mK-10A
SHEET_NAME=Sheet1
```

## Next Steps

Once the basic setup is working, you can:

1. **Customize the product display** in `app/components/ProductsCatalog.tsx`
2. **Add more filtering options** (price range, manufacturer, etc.)
3. **Add product images** by including image URLs in your Google Sheet
4. **Add pagination** for large product catalogs
5. **Add sorting options** (by name, price, category, etc.)

## Security Notes

- The service account should only have **Viewer** access unless you need to write data
- Consider implementing rate limiting for the API
- For production, consider caching the Google Sheets data to avoid hitting API limits 