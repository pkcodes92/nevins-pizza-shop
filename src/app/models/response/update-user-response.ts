import { User } from "../dto";
import { ApiResponse } from "./api-response";

export interface UpdateUserResponse extends ApiResponse {
    user: User;
}