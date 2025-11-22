import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import LightRays from './LightRays';

const LandingPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  const searchJobHandler = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  const handleProtectedNavigation = (route) => {
    if (user) {
      navigate(route);
    } else {
      navigate('/login');
    }
  };

  const features = [
    {
      icon: <Search className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: 'Smart Job Search',
      description: 'Find your perfect job with our advanced search filters and AI-powered recommendations.',
    },
    {
      icon: <Briefcase className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: 'Top Companies',
      description: 'Connect with leading companies and startups looking for talented professionals like you.',
    },
    {
      icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: 'Easy Applications',
      description: 'Apply to multiple jobs with one click. Track all your applications in one place.',
    },
    {
      icon: <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
      title: 'Career Growth',
      description: 'Get insights, tips, and resources to accelerate your career journey.',
    },
  ];

  const categories = [
    'Technology',
    'Marketing',
    'Design',
    'Sales',
    'Finance',
    'Healthcare',
    'Education',
    'Engineering',
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Hero Section with 3D Model Background */}
      <section 
        className="relative py-12 xs:py-14 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-3 xs:px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%)'
        }}
      >
        {/* 3D Model Background Layer */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 sm:opacity-40 md:opacity-50 lg:opacity-60"
          style={{ zIndex: 0 }}
        >
          <LightRays
            url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
            width="100%"
            height="100%"
            autoRotate={true}
            autoRotateSpeed={0.2}
            enableManualRotation={false}
            enableManualZoom={false}
            enableMouseParallax={true}
            environmentPreset="sunset"
            showScreenshotButton={false}
            fadeIn={true}
            ambientIntensity={0.5}
            autoFrame={true}
          />
        </div>

        {/* Gradient Overlay for Better Text Readability */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
            zIndex: 1
          }}
        />

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6"
              style={{ 
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--accent-primary)'
              }}
            >
              <span className="text-purple-600">🎉 No. 1 Job Search Platform</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight px-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Find Your Dream Job{' '}
              <br className="hidden xs:block" />
              <span className="text-purple-600">Today</span>
            </h1>

            {/* Subheading */}
            <p 
              className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-5 xs:mb-6 sm:mb-7 md:mb-8 max-w-[280px] xs:max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-3 xs:px-4 leading-relaxed"
              style={{ color: 'var(--text-primary)' }}
            >
              Empowering Your Career Journey: Smarter Job Search, Faster Opportunities. 
              Connect with top employers and land your next role.
            </p>

            {/* Search Bar */}
            <div className="max-w-[320px] xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-5 xs:mb-6 sm:mb-7 md:mb-8 px-2">
              <div 
                className="flex flex-col sm:flex-row gap-2 w-full shadow-md sm:shadow-lg md:shadow-xl border rounded-2xl sm:rounded-full p-2"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                  className="flex-1 outline-none border-none px-3 xs:px-4 py-2.5 sm:py-3 md:py-3.5 rounded-xl sm:rounded-full bg-transparent text-sm sm:text-base md:text-lg"
                  style={{ 
                    color: 'var(--text-primary)',
                  }}
                />
                <Button
                  onClick={searchJobHandler}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl sm:rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 font-semibold text-sm sm:text-base md:text-lg w-full sm:w-auto min-h-[44px]"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span>Search Jobs</span>
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-stretch sm:items-center px-2 max-w-md sm:max-w-2xl mx-auto">
              <Button
                onClick={() => handleProtectedNavigation('/home')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-semibold rounded-lg w-full sm:flex-1 min-h-[44px]"
              >
                Browse All Jobs
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                onClick={() => navigate('/signup')}
                variant="outline"
                className="px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-semibold rounded-lg border-2 w-full sm:flex-1 min-h-[44px]"
                style={{ 
                  borderColor: 'var(--border-color)',
                }}
              >
                Upload Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section 
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Popular <span className="text-purple-600">Categories</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => {
                  if (user) {
                    dispatch(setSearchedQuery(category));
                    navigate('/browse');
                  } else {
                    navigate('/login');
                  }
                }}
                className="rounded-lg sm:rounded-xl p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6 text-center hover:shadow-md sm:hover:shadow-lg transition-all duration-300 cursor-pointer border hover:scale-105 active:scale-95 min-h-[60px] xs:min-h-[70px] sm:min-h-[80px] flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h3 
                  className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 px-2"
              style={{ color: 'var(--text-primary)' }}
            >
              Why Choose <span className="text-purple-600">JobPortal</span>?
            </h2>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-2xl mx-auto px-3 xs:px-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Everything you need to find your next opportunity and advance your career
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 shadow-sm sm:shadow-md md:shadow-lg hover:shadow-xl transition-all border hover:scale-105 duration-300"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div 
                  className="rounded-lg w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 sm:mb-4"
                  style={{ 
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-xs sm:text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section 
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <h2 
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 xs:mb-3 sm:mb-4 px-2"
              style={{ color: 'var(--text-primary)' }}
            >
              How It <span className="text-purple-600">Works</span>
            </h2>
            <p 
              className="text-sm sm:text-base md:text-lg lg:text-xl px-3 xs:px-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Sign up and build your professional profile with your resume and skills.',
              },
              {
                step: '02',
                title: 'Search & Apply',
                description: 'Browse thousands of jobs and apply to positions that match your skills.',
              },
              {
                step: '03',
                title: 'Get Hired',
                description: 'Connect with employers, ace your interviews, and land your dream job.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 text-center shadow-sm sm:shadow-md md:shadow-lg border"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <div 
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4"
                  style={{ 
                    color: 'var(--accent-primary)',
                    opacity: 0.3
                  }}
                >
                  {item.step}
                </div>
                <h3 
                  className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-xs sm:text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 px-2 leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Ready to Start Your Journey?
          </h2>
          <p 
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-5 xs:mb-6 sm:mb-7 md:mb-8 px-3 xs:px-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Join thousands of job seekers who found their dream careers through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-2 max-w-md sm:max-w-2xl mx-auto">
            <Button
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-semibold rounded-lg w-full sm:flex-1 min-h-[44px]"
            >
              Get Started Free
            </Button>
            <Button
              onClick={() => handleProtectedNavigation('/jobs')}
              variant="outline"
              className="px-5 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-3.5 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg font-semibold rounded-lg border-2 w-full sm:flex-1 min-h-[44px]"
              style={{ 
                borderColor: 'var(--border-color)',
              }}
            >
              Explore Jobs
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
