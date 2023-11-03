import { OrderDetail } from "../dto";

export interface AddOrderRequest {
    email: string;
    name: string;
    orderDetails: OrderDetail[];
}