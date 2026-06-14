export interface ProductType {
    keywords: string[]
    id: string
    image: string
    name: string
    rating : {
        stars: number
        count: number
    }
    priceCents: number
    createdAt: string
    updatedAt: string
}

export interface CartItemType {
    id: number
    productId: string
    quantity: number
    deliveryOptionId: string
    createdAt: string
    updatedAt: string
    product: ProductType
}

export interface DeliveryOptionsType {
    id: string
    deliveryDays: number
    priceCents: number
    createdAt: string
    updatedAt: string
    estimatedDeliveryTimeMs: number
}

export interface PaymentSummaryType {
    totalItems	           : number
    productCostCents	   : number
    shippingCostCents	   : number
    totalCostBeforeTaxCents: number
    taxCents	           : number
    totalCostCents	       : number
}