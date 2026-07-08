import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';

const B2 = new AWS.S3({
  endpoint: process.env.B2_ENDPOINT || 'https://s3.us-east-005.backblazeb2.com',
  accessKeyId: process.env.B2_KEY_ID || '005cf1b808adb9e0000000003',
  secretAccessKey: process.env.B2_APPLICATION_KEY || process.env.B2_S3_APPLICATION_KEY || 'K005ihmXwbZ1jKF9lXkdBKOI+QGHnuM',
  region: process.env.B2_REGION || 'us-east-005',
  signatureVersion: 'v4',
});

const BUCKET_NAME = process.env.B2_S3_BUCKET || process.env.B2_BUCKET_NAME || 'HighlandersFitness';

export async function GET() {
  try {
    // List of sports with their corresponding sport IDs in highlandersfitness.store
    const categoriesList = [
      { id: 'cricket', sportId: '6a44c2f1a27d52f06e9018c4' },
      { id: 'fitness', sportId: '6a44cc12a27d52f06e9018d2' },
      { id: 'combat', sportId: '6a44c851a27d52f06e9018cd' },
      { id: 'football', sportId: '6a44c49ca27d52f06e9018c6' }
    ];

    const results = await Promise.all(
      categoriesList.map(async (cat) => {
        try {
          const res = await fetch(`https://highlandersfitness.store/api/products?sport=${cat.sportId}`, {
            // Cache proxy request for 1 hour
            next: { revalidate: 3600 }
          });

          if (!res.ok) {
            console.error(`Failed to fetch sport category ${cat.id}: ${res.status}`);
            return { id: cat.id, products: [] };
          }

          const data = await res.json();

          // Generate Backblaze signed URLs for all products in this sport category in parallel
          const signedProducts = await Promise.all(
            (data || []).map(async (product: any) => {
              let signedImageUrl = null;
              if (product.featureImageKey) {
                try {
                  const decodedKey = decodeURIComponent(product.featureImageKey);
                  signedImageUrl = await B2.getSignedUrlPromise('getObject', {
                    Bucket: BUCKET_NAME,
                    Key: decodedKey,
                    Expires: 3600
                  });
                } catch (b2Err) {
                  console.warn(`B2 Signing failed for key: ${product.featureImageKey}`, b2Err);
                }
              }
              return {
                ...product,
                signedImageUrl
              };
            })
          );

          return { id: cat.id, products: signedProducts };
        } catch (catErr) {
          console.error(`Error querying products for category ${cat.id}:`, catErr);
          return { id: cat.id, products: [] };
        }
      })
    );

    // Group products by sport category ID
    const productsByCategory = results.reduce((acc: any, item) => {
      acc[item.id] = item.products;
      return acc;
    }, {});

    return NextResponse.json({ success: true, data: productsByCategory });
  } catch (err: any) {
    console.error('Error in store-products proxy API:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
