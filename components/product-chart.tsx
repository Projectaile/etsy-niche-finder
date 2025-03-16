"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import type { ProductData } from "@/lib/types"
import { formatNumber } from "@/lib/data-utils"

Chart.register(...registerables)

interface ProductChartProps {
  products: ProductData[]
}

export default function ProductChart({ products }: ProductChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Prepare data for the chart
    const labels = products.map((p) => {
      // Truncate long product names
      const maxLength = 20
      return p.product_name.length > maxLength ? p.product_name.substring(0, maxLength) + "..." : p.product_name
    })

    const data = products.map((p) => p.est_mo_sales)

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Estimated Monthly Sales",
            data,
            backgroundColor: "rgba(99, 102, 241, 0.7)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `Sales: ${formatNumber(context.parsed.y)}`,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Monthly Sales",
            },
            ticks: {
              callback: (value) => formatNumber(value as number),
            },
          },
          x: {
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
      },
    })

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [products])

  return (
    <div className="w-full h-[400px]">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}

