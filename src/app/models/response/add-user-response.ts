import { User } from "../dto";
import { ApiResponse } from "./api-response";

export interface AddUserResponse extends ApiResponse {
    user: User;
}