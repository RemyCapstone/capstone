const dev = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'prod';
console.log("here in config/index.js", process.env.PLATFORM);

export const server = dev ? 'http://localhost:3000' : 'https://remy-nyc.vercel.app';