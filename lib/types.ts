export interface RawProductData {
  product_name: string
  product_link: string
  shop_name: string
  shop_link: string
  price: number
  est_mo_sales: number
  est_mo_revenue: number
  est_total_sales: number
  reviews: number
  listing_age: number
  favorites: number
  avg_reviews: number
  views: number
  category: string
  shop_age: number
  visibility_score: number
  conversion_rate: number
  total_shop_sales: number
  tag_1?: string
  tag_2?: string
  tag_3?: string
  tag_4?: string
  tag_5?: string
  tag_6?: string
  tag_7?: string
  tag_8?: string
  tag_9?: string
  tag_10?: string
  tag_11?: string
  tag_12?: string
  tag_13?: string
}

export interface ProductData
  extends Omit<
    RawProductData,
    | "tag_1"
    | "tag_2"
    | "tag_3"
    | "tag_4"
    | "tag_5"
    | "tag_6"
    | "tag_7"
    | "tag_8"
    | "tag_9"
    | "tag_10"
    | "tag_11"
    | "tag_12"
    | "tag_13"
  > {
  tags: string[]
  gap_score?: number
}


