export interface UpdateCouponRequest {
    id: number;
    code: string;
    description: string;
    typeCode: string;
    actionCode: string;
    appName: string;
}