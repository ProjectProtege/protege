module.exports = {
  images: {
    domains: [
      'static.files-simplefileupload.com',
      'avatars.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
    ],
  },
  env: {
    CONVERTKIT_KEY: process.env.CONVERTKIT_KEY,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    BASIC_PLAN: process.env.BASIC_PLAN,
    ADVANCED_PLAN: process.env.ADVANCED_PLAN,
    PREMIUM_PLAN: process.env.PREMIUM_PLAN,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    BASE_URL: process.env.BASE_URL,
    SIMPLE_FILE_API_KEY: process.env.SIMPLE_FILE_API_KEY,
    FB_TYPE: process.env.FB_TYPE,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_PRIVATE_KEY_ID: process.env.FB_PRIVATE_KEY_ID,
    FB_PRIVATE_KEY: process.env.FB_PRIVATE_KEY,
    FB_CLIENT_EMAIL: process.env.FB_CLIENT_EMAIL,
    FB_CLIENT_ID: process.env.FB_CLIENT_ID,
    FB_AUTH_URI: process.env.FB_AUTH_URI,
    FB_TOKEN_URI: process.env.FB_TOKEN_URI,
    FB_AUTH_PROVIDER_X509_CERT_URL: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
    FB_CLIENT_X509_CERT_URL: process.env.FB_CLIENT_X509_CERT_URL,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
