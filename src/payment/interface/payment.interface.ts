export interface PaystackInitializeRequest {
  email: string;
  amount: number;
  callback_url: string;
  metadata?: {
    [key: string]: any;
  };
}
