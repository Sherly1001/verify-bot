import { config } from "dotenv";
config();

export const token = process.env.TOKEN || "";
export const memberRole = process.env.MEMBER || "";
export const welcomeChannel = process.env.WELCOME_CHANNEL || "";
export const verifyChannel = process.env.VERIFY_CHANNEL || "";
export const welcomeMessage = process.env.WELCOME_MESSAGE || "";
