import React from 'react';
import { Sparkles, Brain, Target, Zap, ArrowRight, CheckCircle, Users, FileText, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI-Powered Resume Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Find the Perfect Candidate
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Match resumes against job requirements with intelligent AI analysis. Save time, reduce bias, and hire the best talent faster.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="http://localhost:5173/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight size={20} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors border border-slate-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Feature Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
  <div className="p-8">
    <video
      src="/demo.mp4"
      controls
      className="w-full aspect-video rounded-xl"
    />
  </div>
</div>

      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose SkillSight?</h2>
          <p className="text-xl text-slate-600">Powerful features designed for modern recruiters</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Brain className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">AI-Powered Analysis</h3>
            <p className="text-slate-600">
              Advanced algorithms analyze resumes against job requirements with precision, identifying skill matches and gaps instantly.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Accurate Matching</h3>
            <p className="text-slate-600">
              Get precise match scores showing exactly how well candidates align with your job requirements and skill needs.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
            <p className="text-slate-600">
              Process hundreds of resumes in minutes. Save countless hours of manual screening and focus on the best candidates.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-orange-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Job Library</h3>
            <p className="text-slate-600">
              Save job profiles and reuse them for multiple candidates. Streamline your hiring process with organized configurations.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Detailed Insights</h3>
            <p className="text-slate-600">
              See matched and missing skills at a glance. Make informed decisions backed by comprehensive skill analysis.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="text-pink-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Fair & Unbiased</h3>
            <p className="text-slate-600">
              Reduce unconscious bias with objective, skill-based evaluations. Focus purely on qualifications and competencies.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple, fast, and effective</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Define Job Requirements</h3>
              <p className="text-slate-600">
                Create a job profile with the role title and required skills. Save it to your library for reuse.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Upload Resume</h3>
              <p className="text-slate-600">
                Upload candidate resumes in PDF format. Our AI extracts and analyzes the content automatically.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Get Instant Results</h3>
              <p className="text-slate-600">
                Receive detailed match scores, skill breakdowns, and hiring recommendations in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted by Recruiters</h2>
          <p className="text-blue-100 mb-12 text-lg">Making hiring faster and smarter</p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10x</div>
              <div className="text-blue-100">Faster Screening</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Start analyzing resumes with AI precision today. No credit card required.
          </p>
          <a
            href="http://localhost:5173/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Analyzing Now
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center border-t border-slate-200">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm mb-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          BCSIT 5th Semester Project • Pokhara University • 2025
        </div>
        <p className="text-slate-500 text-sm">
          Built with ❤️ for smarter recruitment
        </p>
      </footer>
    </div>
  );
}