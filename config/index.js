const dev = process.env.VERCEL_ENV !== 'production';
console.log("here in config/index.js", process.env.PLATFORM, process.env.VERCEL_ENV);

export const server = dev ? 'http://localhost:3000' : 'https://remy-nyc.vercel.app';