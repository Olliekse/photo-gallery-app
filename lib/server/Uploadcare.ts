import crypto from 'crypto';

const { UPLOADCARE_PUBLIC_KEY, UPLOADCARE_SECRET_KEY } = process.env;

export const uploadcareConfig = {
  publicKey: UPLOADCARE_PUBLIC_KEY,
  secretKey: UPLOADCARE_SECRET_KEY,
};

export function generateUploadcareSignature(expireUnixSeconds: number): string {
  if (!uploadcareConfig.publicKey || !uploadcareConfig.secretKey) {
    throw new Error(
      'Missing Uploadcare configuration. Please set UPLOADCARE_PUBLIC_KEY and UPLOADCARE_SECRET_KEY in your environment.'
    );
  }
  // Per Uploadcare secure uploads, the signature is an HMAC-SHA256 over the string of parameters.
  // For minimal secure uploads, we sign only the expire parameter: `expire=TIMESTAMP`.
  const stringToSign = `expire=${expireUnixSeconds}`;
  return crypto
    .createHmac('sha256', uploadcareConfig.secretKey as string)
    .update(stringToSign)
    .digest('hex');
}

export function getUploadcareAuthHeader(): string {
  if (!uploadcareConfig.publicKey || !uploadcareConfig.secretKey) {
    throw new Error(
      'Missing Uploadcare configuration. Please set UPLOADCARE_PUBLIC_KEY and UPLOADCARE_SECRET_KEY in your environment.'
    );
  }
  const base64 = Buffer.from(
    `${uploadcareConfig.publicKey}:${uploadcareConfig.secretKey}`
  ).toString('base64');
  return `Uploadcare.Simple ${base64}`;
}
