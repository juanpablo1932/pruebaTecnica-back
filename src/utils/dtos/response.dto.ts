export class ApiResponse {
  statusCode: number;
  message: string;
  data?: object[];
}

export class ApiResponseError extends ApiResponse {
  error: string;
  timestamp: string;
}
