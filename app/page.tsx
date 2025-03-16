"use client"

import { useState, useEffect } from "react"
import type { ProductData } from "@/lib/types"
import SearchBar from "@/components/search-bar"
import ProductChart from "@/components/product-chart"
import ProductTable from "@/components/product-table"
import MarketGapAnalysis from "@/components/market-gap-analysis"
import { processData, calculateGapScore } from "@/lib/data-utils"

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Try to fetch the data from the expected location
        let response
        try {
          response = await fetch("/data/products.json")

          // Check if we got HTML instead of JSON (common error on GitHub Pages)
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("text/html")) {
            throw new Error("Received HTML instead of JSON. Check file path.")
          }

          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          const processedData = processData(data)
          setProducts(processedData)
          setFilteredProducts(processedData)
        } catch (fetchError) {
          console.error("Error fetching JSON:", fetchError)

          // Fallback to sample data
          console.log("Using fallback sample data")
          const sampleData = getSampleData()
          const processedData = processData(sampleData)
          setProducts(processedData)
          setFilteredProducts(processedData)
        }
      } catch (err) {
        setError("Error loading product data. Please check console for details.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fallback sample data in case the JSON file can't be loaded
  const getSampleData = () => {
    return [
      {
        product_name: "Handmade Ceramic Mug",
        product_link: "https://example.com/product1",
        shop_name: "Artisan Ceramics",
        shop_link: "https://example.com/shop1",
        price: 24.99,
        est_mo_sales: 320,
        est_mo_revenue: 7996.8,
        est_total_sales: 2800,
        reviews: 156,
        listing_age: 90,
        favorites: 450,
        avg_reviews: 4.8,
        views: 12000,
        category: "Home & Kitchen",
        shop_age: 730,
        visibility_score: 92,
        conversion_rate: 2.7,
        total_shop_sales: 8500,
        tag_1: "ceramic",
        tag_2: "handmade",
        tag_3: "mug",
        tag_4: "coffee",
        tag_5: "gift",
      },
      {
        product_name: "Minimalist Wall Art Print",
        product_link: "https://example.com/product2",
        shop_name: "Modern Prints",
        shop_link: "https://example.com/shop2",
        price: 39.99,
        est_mo_sales: 280,
        est_mo_revenue: 11197.2,
        est_total_sales: 1950,
        reviews: 87,
        listing_age: 120,
        favorites: 320,
        avg_reviews: 4.6,
        views: 9500,
        category: "Home Decor",
        shop_age: 365,
        visibility_score: 85,
        conversion_rate: 2.9,
        total_shop_sales: 6200,
        tag_1: "wall art",
        tag_2: "minimalist",
        tag_3: "print",
        tag_4: "home decor",
        tag_5: "modern",
      },
      {
        product_name: "Handcrafted Wooden Cutting Board",
        product_link: "https://example.com/product3",
        shop_name: "Woodland Crafts",
        shop_link: "https://example.com/shop3",
        price: 49.99,
        est_mo_sales: 210,
        est_mo_revenue: 10497.9,
        est_total_sales: 1600,
        reviews: 132,
        listing_age: 180,
        favorites: 290,
        avg_reviews: 4.9,
        views: 7800,
        category: "Kitchen",
        shop_age: 540,
        visibility_score: 78,
        conversion_rate: 2.7,
        total_shop_sales: 4800,
        tag_1: "cutting board",
        tag_2: "wooden",
        tag_3: "kitchen",
        tag_4: "handcrafted",
        tag_5: "gift",
      },
      {
        product_name: "Personalized Leather Journal",
        product_link: "https://example.com/product4",
        shop_name: "Custom Leather Goods",
        shop_link: "https://example.com/shop4",
        price: 34.99,
        est_mo_sales: 190,
        est_mo_revenue: 6648.1,
        est_total_sales: 1400,
        reviews: 98,
        listing_age: 150,
        favorites: 270,
        avg_reviews: 4.7,
        views: 6900,
        category: "Stationery",
        shop_age: 420,
        visibility_score: 82,
        conversion_rate: 2.8,
        total_shop_sales: 5200,
        tag_1: "journal",
        tag_2: "leather",
        tag_3: "personalized",
        tag_4: "notebook",
        tag_5: "gift",
      },
      {
        product_name: "Macrame Wall Hanging",
        product_link: "https://example.com/product5",
        shop_name: "Boho Home Decor",
        shop_link: "https://example.com/shop5",
        price: 59.99,
        est_mo_sales: 170,
        est_mo_revenue: 10198.3,
        est_total_sales: 1200,
        reviews: 76,
        listing_age: 100,
        favorites: 310,
        avg_reviews: 4.5,
        views: 8200,
        category: "Home Decor",
        shop_age: 300,
        visibility_score: 79,
        conversion_rate: 2.1,
        total_shop_sales: 3800,
        tag_1: "macrame",
        tag_2: "wall hanging",
        tag_3: "boho",
        tag_4: "home decor",
        tag_5: "handmade",
      },
      {
        product_name: "Scented Soy Candle Set",
        product_link: "https://example.com/product6",
        shop_name: "Aroma Crafts",
        shop_link: "https://example.com/shop6",
        price: 29.99,
        est_mo_sales: 350,
        est_mo_revenue: 10496.5,
        est_total_sales: 2900,
        reviews: 215,
        listing_age: 75,
        favorites: 480,
        avg_reviews: 4.8,
        views: 13500,
        category: "Home Fragrance",
        shop_age: 480,
        visibility_score: 94,
        conversion_rate: 3.6,
        total_shop_sales: 9800,
        tag_1: "candle",
        tag_2: "soy",
        tag_3: "scented",
        tag_4: "gift set",
        tag_5: "home",
      },
      {
        product_name: "Handmade Soap Collection",
        product_link: "https://example.com/product7",
        shop_name: "Natural Bath Co.",
        shop_link: "https://example.com/shop7",
        price: 24.99,
        est_mo_sales: 290,
        est_mo_revenue: 7247.1,
        est_total_sales: 2400,
        reviews: 178,
        listing_age: 110,
        favorites: 340,
        avg_reviews: 4.7,
        views: 10200,
        category: "Bath & Beauty",
        shop_age: 390,
        visibility_score: 88,
        conversion_rate: 2.8,
        total_shop_sales: 7200,
        tag_1: "soap",
        tag_2: "handmade",
        tag_3: "natural",
        tag_4: "bath",
        tag_5: "gift",
      },
      {
        product_name: "Vintage Style Desk Lamp",
        product_link: "https://example.com/product8",
        shop_name: "Retro Lighting",
        shop_link: "https://example.com/shop8",
        price: 79.99,
        est_mo_sales: 130,
        est_mo_revenue: 10398.7,
        est_total_sales: 950,
        reviews: 68,
        listing_age: 200,
        favorites: 220,
        avg_reviews: 4.6,
        views: 5800,
        category: "Lighting",
        shop_age: 600,
        visibility_score: 76,
        conversion_rate: 2.2,
        total_shop_sales: 4100,
        tag_1: "lamp",
        tag_2: "desk lamp",
        tag_3: "vintage",
        tag_4: "lighting",
        tag_5: "home office",
      },
      {
        product_name: "Knitted Throw Blanket",
        product_link: "https://example.com/product9",
        shop_name: "Cozy Home Textiles",
        shop_link: "https://example.com/shop9",
        price: 69.99,
        est_mo_sales: 150,
        est_mo_revenue: 10498.5,
        est_total_sales: 1100,
        reviews: 92,
        listing_age: 130,
        favorites: 260,
        avg_reviews: 4.8,
        views: 6500,
        category: "Home Textiles",
        shop_age: 450,
        visibility_score: 81,
        conversion_rate: 2.3,
        total_shop_sales: 5600,
        tag_1: "blanket",
        tag_2: "throw",
        tag_3: "knitted",
        tag_4: "home decor",
        tag_5: "cozy",
      },
      {
        product_name: "Ceramic Plant Pot Set",
        product_link: "https://example.com/product10",
        shop_name: "Green Thumb Pottery",
        shop_link: "https://example.com/shop10",
        price: 44.99,
        est_mo_sales: 180,
        est_mo_revenue: 8098.2,
        est_total_sales: 1300,
        reviews: 104,
        listing_age: 95,
        favorites: 290,
        avg_reviews: 4.5,
        views: 7900,
        category: "Garden & Plants",
        shop_age: 330,
        visibility_score: 83,
        conversion_rate: 2.3,
        total_shop_sales: 4900,
        tag_1: "plant pot",
        tag_2: "ceramic",
        tag_3: "planter",
        tag_4: "garden",
        tag_5: "home decor",
      },
    ]
  }

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = products.filter((product) => {
      // Search in product name
      if (product.product_name.toLowerCase().includes(searchTermLower)) {
        return true
      }

      // Search in tags
      if (product.tags.some((tag) => tag.toLowerCase().includes(searchTermLower))) {
        return true
      }

      return false
    })

    setFilteredProducts(filtered)
  }

  // Get top 10 products by sales
  const topProducts = [...filteredProducts].sort((a, b) => b.est_mo_sales - a.est_mo_sales).slice(0, 10)

  // Calculate gap scores for market analysis
  const productsWithGapScores = filteredProducts.map((product) => ({
    ...product,
    gap_score: calculateGapScore(product),
  }))

  // Get product with highest gap score
  const topGapProduct =
    productsWithGapScores.length > 0
      ? productsWithGapScores.reduce((prev, current) => (current.gap_score > prev.gap_score ? current : prev))
      : null

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">{error}</div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Analysis Dashboard</h1>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top 10 Products by Monthly Sales</h2>
            <ProductChart products={topProducts} />
          </div>
        </div>

        <div>
          <div className="bg-card rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-semibold mb-4">Market Gap Analysis</h2>
            <MarketGapAnalysis product={topGapProduct} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Top Products Details</h2>
        <ProductTable products={topProducts} />
      </div>
    </main>
  )
}

