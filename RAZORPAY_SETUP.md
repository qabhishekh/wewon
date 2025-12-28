# Razorpay Payment Integration Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rwgxe5AML0pUS4

# API URL (adjust based on your backend server)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Backend Setup

The backend should have the following environment variables in its `.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_Rwgxe5AML0pUS4
RAZORPAY_KEY_SECRET=4Hl2gxgxekCaT4zb6ueHfqkl
```

## Important Notes

### Predictor Products in Database

The payment system expects predictor products to be stored in your database. You need to:

1. **Create Predictor Products**: Add predictor entries to your `CounsellingProduct` collection (or create a separate `PredictorProduct` model) with IDs matching those in `src/data/predictors.ts`:

   - `jee-mains-predictor`
   - `jee-advanced-predictor`
   - `uptac-predictor`

2. **Backend Modification Required**: The current backend expects `productId` to be a MongoDB ObjectId, but our predictors use string IDs. You have two options:

   **Option A: Use MongoDB ObjectIds**

   - Update `src/data/predictors.ts` to use actual MongoDB ObjectIds for predictor IDs
   - Create predictor products in database first, then use their `_id` values

   **Option B: Modify Backend** (Recommended)

   - Update the backend payment controller to handle both ObjectId and string-based product IDs
   - Add a field like `productSlug` or `productCode` to identify products by string ID

### Example Product Document

```javascript
{
  _id: ObjectId("..."),
  productCode: "jee-mains-predictor", // Add this field
  title: "JEE Mains College Predictor",
  description: "Predict your college based on JEE Mains rank",
  price: 499,
  discountPrice: 299,
  validityInDays: 365,
  isActive: true,
  productType: "predictor" // Add this to differentiate from counseling products
}
```

## Testing Payment Flow

1. Start your backend server
2. Start the Next.js dev server: `npm run dev`
3. Navigate to `/predictor`
4. Click "Buy Now" on any predictor card
5. Razorpay test checkout will open
6. Use Razorpay test cards for payment:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## Payment Flow

1. User clicks "Buy Now" → `PredictorCard.handleBuyNow()`
2. Frontend creates order → `POST /api/payment/create-order`
3. Backend creates Razorpay order and saves to database
4. Razorpay checkout modal opens
5. User completes payment
6. Payment response sent to handler
7. Frontend verifies payment → `POST /api/payment/verify`
8. Backend verifies signature and updates order status
9. User redirected to predictor page

## Security Notes

- Never commit `.env.local` or `.env` files to version control
- The test credentials provided are for testing only
- Replace with production credentials before going live
- Always verify payments on the backend
