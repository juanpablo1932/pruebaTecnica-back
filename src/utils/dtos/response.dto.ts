export class ApiResp {
  statusCode: number;
  message: string;
  data?: object[];
}

export class ApiResponseError extends ApiResp {
  error: string;
  timestamp: string;
}
