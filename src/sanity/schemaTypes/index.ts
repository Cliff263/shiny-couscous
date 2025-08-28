import { product } from './schemas/product'
import { productCategory } from './schemas/product-category'
import { SchemaTypeDefinition } from 'sanity'
import { promotionCampaign } from './schemas/promotion-campaign'
import { promotionCode } from './schemas/promotion-codes'
import { order, orderItem, shippingAddress } from './schemas/order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,
    productCategory,
    product,
    shippingAddress,
    orderItem,
    order,
  ],
}
