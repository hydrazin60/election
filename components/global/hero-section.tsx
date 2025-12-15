"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Users,
  BarChart3,
  Globe,
  Loader2,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Secure & Transparent Elections
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Modernizing
              <span className="text-blue-600 block">Nepal{"`"}s Democracy</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              A private and secure platform that allows voters to easily search
              their own details, check their designated voting locations, and
              view election results. Designed to simplify access to personal
              voter information and promote transparency in Nepal’s democratic
              process.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 gap-2"
                onClick={() => alert("Upcoming feature")}
              >
                Explore System
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => alert("Upcoming feature")}
              >
                View Live Results
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">4k+</div>
                <div className="text-sm text-gray-600">Registered Voters</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">228</div>
                <div className="text-sm text-gray-600">pollingCenter</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-600">99.8%</div>
                <div className="text-sm text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <Globe className="h-20 w-20 mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-bold mb-4">
                      Live Election Dashboard
                    </h3>
                    <p className="opacity-90">
                      Real-time results and analytics
                    </p>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="gap-2 hover:bg-transparent hover:text-white"
                      onClick={() => alert("Upcoming feature")}
                    >
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Voting Information</div>
                  <div className="text-sm text-gray-600">
                    Easy & Secure Process
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Election Data</div>
                  <div className="text-sm text-gray-600">
                    Check voter info easily
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
