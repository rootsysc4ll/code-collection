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

export interface DeliveryOptionType {
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

export interface OrderProductType {
    productId              : string
    quantity               : number
    estimatedDeliveryTimeMs: number
    product                : ProductType
}

export interface OrderType {
    id            : string
    orderTimeMs   : number 
    totalCostCents: number
    products      : OrderProductType[]
    createdAt     : string
    updatedAt     : string
}