import React from "react";
import {
  StickyNote,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Cloud,
  Users,
  Search,
  Smartphone,
} from "lucide-react";

import BasicButtons from "../../Utils/ContainedButton";
import OutlinedButtons from "../../Utils/OutlinedButton";

const NotesAppHero = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant search and quick note creation",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "End-to-end encryption for your data",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Access your notes from anywhere",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and collaborate in real-time",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any note instantly with AI-powered search",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Works on desktop, mobile, and tablet",
    },
  ];

  const benefits = [
    "Unlimited notes and notebooks",
    "Real-time collaboration",
    "Advanced formatting options",
    "Offline access",
    "Export to multiple formats",
    "24/7 customer support",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Main Hero Content */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <StickyNote className="h-4 w-4 mr-2" />
                The Future of Note-Taking is Here
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Capture Ideas <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Organize Life
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your thoughts into organized, searchable notes.
                Collaborate with your team, sync across devices, and never lose
                an idea again.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <BasicButtons />
                <OutlinedButtons />
              </div>

              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>5 minutes setup</span>
                </div>
              </div>
            </div>

            {/* App Preview */}
            <div className="relative max-w-5xl mx-auto mb-20">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="ml-4 text-sm text-gray-600">
                      NotesApp - Dashboard
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div
                        key={item}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <StickyNote className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-gray-800">
                            Project Note {item}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Quick note about project ideas and implementation
                          details...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto mb-20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Powerful features for
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {' '}modern teams
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to capture, organize, and collaborate on your ideas. 
                  Built for individuals and teams who value productivity and simplicity.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                      
                      {/* Decorative element */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional stats or trust indicators */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                  <div className="text-gray-600">Notes Created</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Why choose NotesApp?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesAppHero;
