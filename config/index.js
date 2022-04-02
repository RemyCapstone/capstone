const dev = process.env.NODE_ENV !== 'prod';

export const server = dev ? 'http://localhost:3000' : 'https://remy.nyc';