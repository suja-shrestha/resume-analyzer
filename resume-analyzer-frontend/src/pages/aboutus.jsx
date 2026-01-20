import React from 'react';
import { Brain, Target, Zap, Users, GraduationCap, Code, Database, Cpu, Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Your Name',
      role: 'Full Stack Developer',
      image: '👨‍💻',
      bio: 'Specialized in React and Node.js development',
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourprofile',
      email: 'your.email@example.com'
    },
    {
      name: 'Team Member 2',
      role: 'AI/ML Engineer',
      image: '👩‍💻',
      bio: 'Expert in natural language processing and AI',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/profile',
      email: 'email@example.com'
    },
    {
      name: 'Team Member 3',
      role: 'UI/UX Designer',
      image: '🎨',
      bio: 'Passionate about creating intuitive user experiences',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/profile',
      email: 'email@example.com'
    },
    {
      name: 'Team Member 4',
      role: 'Backend Developer',
      image: '⚙️',
      bio: 'Focused on scalable architecture and APIs',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/profile',
      email: 'email@example.com'
    }
  ];

  const technologies = [
    { name: 'React', icon: <Code className="text-blue-600" size={24} />, description: 'Frontend framework' },
    { name: 'Node.js', icon: <Cpu className="text-green-600" size={24} />, description: 'Backend runtime' },
    { name: 'Python', icon: <Code className="text-yellow-600" size={24} />, description: 'AI/ML processing' },
    { name: 'MongoDB', icon: <Database className="text-green-600" size={24} />, description: 'Database' },
    { name: 'OpenAI API', icon: <Brain className="text-purple-600" size={24} />, description: 'AI analysis' },
    { name: 'Tailwind CSS', icon: <Zap className="text-cyan-600" size={24} />, description: 'Styling' }
  ];

  const features = [
    {
      icon: <Brain className="text-blue-600" size={32} />,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze resumes with high accuracy and precision.'
    },
    {
      icon: <Target className="text-green-600" size={32} />,
      title: 'Skill Matching',
      description: 'Intelligent skill extraction and matching against job requirements for optimal candidate selection.'
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      title: 'Fast Processing',
      description: 'Instant analysis and results, processing hundreds of resumes in minutes instead of hours.'
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: 'User-Friendly',
      description: 'Clean, intuitive interface designed for recruiters with minimal learning curve.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap size={18} />
              BCSIT 5th Semester Project
            </div>
            <h1 className="text-5xl font-bold mb-6">About SkillSight</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              An AI-powered resume analysis platform designed to revolutionize the recruitment process by automating candidate evaluation and skill matching.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="text-blue-600" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To streamline the hiring process by providing recruiters with intelligent, unbiased, and efficient tools for resume analysis. We aim to reduce hiring time, minimize bias, and help organizations find the best talent faster.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Brain className="text-purple-600" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To become the leading AI-powered recruitment assistant, making fair and efficient hiring accessible to organizations of all sizes. We envision a future where technology eliminates bias and focuses purely on skills and qualifications.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Key Features</h2>
            <p className="text-lg text-slate-600">What makes SkillSight special</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Technology Stack</h2>
          <p className="text-lg text-slate-600">Built with modern, cutting-edge technologies</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{tech.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{tech.name}</h3>
              <p className="text-xs text-slate-500">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-600">The minds behind SkillSight</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                <div className="flex items-center justify-center gap-3">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">
                    <Github size={18} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href={`mailto:${member.email}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-12 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap size={18} />
            Academic Project
          </div>
          <h2 className="text-3xl font-bold mb-4">BCSIT 5th Semester Project</h2>
          <p className="text-lg text-blue-100 mb-2">Pokhara University</p>
          <p className="text-blue-100 mb-6">Academic Year 2024-2025</p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div>
              <p className="text-blue-200 mb-1">Supervisor</p>
              <p className="font-semibold">Prof. [Name]</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-blue-200 mb-1">Department</p>
              <p className="font-semibold">Computer Science & IT</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="text-blue-200 mb-1">Duration</p>
              <p className="font-semibold">6 Months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Have questions about the project or interested in collaboration? We'd love to hear from you!
          </p>
          <a 
            href="mailto:contact@skillsight.edu" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Mail size={20} />
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}