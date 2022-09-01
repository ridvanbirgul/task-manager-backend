export interface ApiResponse {
    Code: number;
    Message: string;
    LastCreatedId: number;
    IsSuccess: boolean;
}

export interface ApiListResponse<T> extends ApiResponse {
    Data: Array<T>;
}
