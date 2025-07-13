import {
  Brain,
  Users,
  Workflow,
  Target,
  TrendingUp,
  Shield,
  Mic,
  ImageIcon,
  Link2,
  Timer,
  Layers,
  Sparkles,
} from "lucide-react"

const AdvancedFeaturesSection = () => {
  const primaryFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get intelligent suggestions, auto-categorization, and smart content recommendations based on your writing patterns.",
      highlight: "Smart AI",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Real-time collaborative editing, comments, and shared workspaces for seamless team productivity.",
      highlight: "Collaborate",
    },
    {
      icon: Workflow,
      title: "Automation Workflows",
      description: "Create custom workflows and templates that automatically organize and process your notes.",
      highlight: "Automate",
    },
  ]

  const secondaryFeatures = [
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Set and track goals directly within your notes with progress visualization.",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Insights into your writing habits, productivity patterns, and note usage.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Multi-factor authentication, audit logs, and enterprise-grade security.",
    },
    {
      icon: Mic,
      title: "Voice Notes",
      description: "Record voice memos and convert speech to text with high accuracy.",
    },
    {
      icon: ImageIcon,
      title: "Visual Content",
      description: "Embed images, diagrams, and multimedia content seamlessly.",
    },
    {
      icon: Link2,
      title: "Smart Linking",
      description: "Automatic cross-referencing and intelligent note connections.",
    },
    {
      icon: Timer,
      title: "Time Tracking",
      description: "Built-in time tracking for projects and focused writing sessions.",
    },
    {
      icon: Layers,
      title: "Version History",
      description: "Complete version control with branching and merge capabilities.",
    },
    {
      icon: Sparkles,
      title: "Custom Integrations",
      description: "Connect with your favorite tools through our extensive API.",
    },
  ]

  return (
    <div className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-8">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Advanced Features for
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Power Users
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take your productivity to the next level with professional-grade features designed for serious note-takers
            and teams.
          </p>
        </div>

        {/* Primary Features - Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {primaryFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Highlight Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {feature.highlight}
              </div>

              <div className="relative z-10">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>

                {/* Learn More Link */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer">
                    Learn more →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Features - Compact Grid */}
        <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need & More</h3>
            <p className="text-lg text-gray-600">Comprehensive tools for every aspect of your note-taking workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-3 rounded-xl group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-300">
                    <feature.icon className="h-5 w-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join professionals who've revolutionized their workflow with our advanced features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                Start 14-Day Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedFeaturesSection
