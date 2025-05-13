import FeatureCard from "@/components/feature-card"
import { Clock, Star, Truck } from "lucide-react"

const features = [
  {
    icon: <Truck className="h-8 w-8 text-green-600" />,
    title: "Pengiriman Cepat",
    description: "Kami mengirimkan pesanan Anda dalam waktu 24 jam untuk memastikan buah tetap segar saat sampai.",
  },
  {
    icon: <Star className="h-8 w-8 text-green-600" />,
    title: "Kualitas Premium",
    description: "Setiap buah dipilih dengan teliti untuk memastikan kualitas terbaik sampai ke tangan Anda.",
  },
  {
    icon: <Clock className="h-8 w-8 text-green-600" />,
    title: "Selalu Segar",
    description: "Buah dipanen pada waktu yang tepat dan disimpan dengan baik untuk menjaga kesegaran.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="tentang" className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mengapa Memilih Kami?</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Kami berkomitmen untuk memberikan buah terbaik dengan layanan yang memuaskan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
