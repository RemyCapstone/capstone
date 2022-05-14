const dev = process.env.NEXT_PUBLIC_PLATFORM !== 'prod';
console.log("here in config/index.js", process.env.NEXT_PUBLIC_PLATFORM);

export const server = dev ? 'http://localhost:3000' : 'https://remy-nyc.vercel.app';