import { User } from "../dto";
import { ApiResponse } from "./api-response";

export interface GetUsersResponse extends ApiResponse {
    users: User[];
}