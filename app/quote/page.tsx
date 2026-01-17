
import type { Metadata } from "next"
import QuoteRequestForm from "@/app/components/QuoteRequestForm"
import { ClipboardList, CheckCircle, Package } from "lucide-react"
import Navbar from "../components/Navbar"

export const metadata: Metadata = {
    title: "Request a Quote | BioGex Pharmaceuticals",
    description: "Get a personalized quote for pharmaceutical products. Access our catalog of over 1000 items.",
}

export default function QuotePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Navbar />
            
            {/* Header Section */}
            <section className="bg-[#2e7d32] text-white pt-24 pb-12 sm:pt-32 sm:pb-20 relative overflow-hidden">
                {/* <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div> */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                        <Package className="w-5 h-5 mr-2 text-green-200" />
                        <span className="text-green-100 font-medium text-sm">Wholesale & Bulk Orders</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        Request a <span className="text-green-200">Quote</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
                        Select from our extensive catalog of over 1,000 pharmaceutical products.
                        Detailed pricing and availability delivered directly to your inbox.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="flex-grow -mt-10 sm:-mt-16 pb-20 px-4 sm:px-6 relative z-20">
                <div className="max-w-5xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Select Products</h3>
                                <p className="text-sm text-gray-600">Search through our comprehensive list of medications and supplies.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Specify Quantity</h3>
                                <p className="text-sm text-gray-600">Indicate the exact amount you need for each item.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-lg text-green-600">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Fast Response</h3>
                                <p className="text-sm text-gray-600">Our team will review your request and send a formal quote promptly.</p>
                            </div>
                        </div>
                    </div>

                    <QuoteRequestForm />

                </div>
            </main>
        </div>
    )
}
