const dev = process.env.PLATFORM !== 'prod';

export const server = dev ? 'http://localhost:3000' : 'https://remy-nyc.vercel.app';