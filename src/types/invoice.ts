
export type PaymentMode = 'CASH' | 'MOBILE_MONEY';

export type InvoiceStatus = 'INIT' | 'PAID' | 'CANCELLED' | 'FAILED';


export interface InvoiceDto {
id: number;

orderId: number;

amount: number;

paymentMode: PaymentMode;

status: InvoiceStatus;

createdAt: Date;

}

export interface CreateInvoiceDto {
orderId: number;

amount: number;

paymentMode: PaymentMode;

}

export interface UpdateInvoiceDto {
status: InvoiceStatus;
}
