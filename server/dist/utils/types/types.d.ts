import { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        token?: string;
    };
}
export declare enum Categories {
    MOBILES = "Mobiles",
    ESSENTIALS = "Essentials",
    APPLIANCES = "Appliances",
    BOOKS = "Books",
    FASHION = "Fashion"
}
