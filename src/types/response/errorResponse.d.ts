export interface ErrorResponse {
  response: {
    data: {
      resultCode: string;
    };
    status: number;
  };
}
