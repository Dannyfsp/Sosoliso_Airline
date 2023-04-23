import axios, { AxiosResponse } from "axios";
import { PaystackInitializeRequest } from "../payment/interface/payment.interface";

export const paystackInstance = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
    "Content-Type": "application/json",
  },
});

export async function initializeTransaction(
  request: PaystackInitializeRequest
): Promise<AxiosResponse> {
  const url = "/transaction/initialize";

  return await paystackInstance.post(url, request);
}

export async function verifyTransaction(paymentRef: string) {
  const url = `/transaction/verify/${paymentRef}`;

  return await paystackInstance.get(url);
}
