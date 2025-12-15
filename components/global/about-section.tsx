// components/landing/about-section.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Clock, Award } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description:
        "To enhance democratic participation through transparent, accessible, and secure election processes in Nepal.",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Transparency",
      description:
        "Real-time result publication with verifiable audit trails for complete electoral transparency.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Efficiency",
      description:
        "Streamlined processes reducing election management time by 60% compared to traditional methods.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Recognition",
      description:
        "Award-winning system recognized for innovation in democratic technology by international bodies.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            About Nepal Election System
          </h2>
          <p className="text-xl text-gray-600">
            We are committed to strengthening democracy in Nepal through
            technology-driven election solutions that ensure fairness,
            accessibility, and integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Journey
              </h3>
              <p className="text-gray-700 mb-6">
                Established in 2017, the Nepal Election System has evolved from
                a basic voting platform to a comprehensive election management
                ecosystem serving millions of voters across all 77 districts.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>Successfully managed 3 national elections</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>Trained over 50,000 election officials</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>99.95% system uptime during elections</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700">
                {/* Placeholder for timeline/chart */}
                <div className="absolute inset-0 flex items-center justify-center text-white p-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">2017</div>
                    <div className="text-lg">System Launch</div>
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
