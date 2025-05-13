import type React from "react"
import { Card } from "@/components/ui/card"

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode
    title: string
    description: string
  }
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="text-center p-6">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-green-100 p-3">{feature.icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </Card>
  )
}
