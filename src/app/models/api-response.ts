import { HttpHeaders } from "@angular/common/http";

export class ApiResponse {
    data: any;
    httpStatus: string;
    httpCode: number;
    message: string;
    totalPages?: number;
    totalElements?: number;
}