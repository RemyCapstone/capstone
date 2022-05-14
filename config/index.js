const dev = process.env.MY_CURRENT_PLATFORM !== 'prod';
console.log("here in config/index.js", process.env.GMAIL_PASSWORD, process.env.MY_CURRENT_PLATFORM, process.env.PLATFORM, process.env.VERCEL_ENV);

export const server = dev ? 'http://localhost:3000' : 'https://remy-nyc.vercel.app';