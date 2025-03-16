import type { RawProductData, ProductData } from "./types"

export function processData(data: RawProductData[]): ProductData[] {
  return data.map((item) => {
    // Extract all tags from tag_1 through tag_13
    const tags: string[] = []
    for (let i = 1; i <= 13; i++) {
      const tagKey = `tag_${i}` as keyof RawProductData
      const tagValue = item[tagKey] as string | undefined
      if (tagValue) {
        tags.push(tagValue)
      }
    }

    // Create a new object without the individual tag fields
    const { tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9, tag_10, tag_11, tag_12, tag_13, ...rest } =
      item

    // Return the processed product data
    return {
      ...rest,
      tags,
    }
  })
}

export function calculateGapScore(product: ProductData): number {
  // A simple heuristic to identify market gaps:
  // High sales + low competition (inferred from listing age and total shop sales)
  // Normalize each factor to a 0-1 scale and combine them

  // Sales factor (higher is better)
  const salesFactor = Math.min(product.est_mo_sales / 1000, 1)

  // Inverse of listing age (newer listings might indicate less saturated markets)
  // Assuming listing_age is in days, cap at 365 days (1 year)
  const listingAgeFactor = 1 - Math.min(product.listing_age / 365, 1)

  // Inverse of shop's total sales (smaller shops might indicate less competition)
  // Assuming a cap of 10,000 for total shop sales
  const shopSalesFactor = 1 - Math.min(product.total_shop_sales / 10000, 1)

  // Combine factors with weights
  // 50% sales, 25% listing age, 25% shop sales
  return salesFactor * 0.5 + listingAgeFactor * 0.25 + shopSalesFactor * 0.25
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}


