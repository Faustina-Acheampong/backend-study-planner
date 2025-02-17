import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URL = process.env.MONGODB_URL;
export const SECRET = process.env.SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;
