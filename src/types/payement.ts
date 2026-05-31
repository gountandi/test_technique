export interface PaymentDto {
id: number;

invoiceId: number;

amount: number;

provider?: string;

reference?: string;

createdAt: Date;

}

export interface CreatePaymentDto {
invoiceId: number;

amount: number;

provider?: string;

reference?: string;

}
