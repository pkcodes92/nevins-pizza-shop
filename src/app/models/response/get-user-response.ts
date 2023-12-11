import { User } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetUserResponse extends ApiResponse {
    user: User;
}