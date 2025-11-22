import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Job from './Job'
import { Button } from './ui/button'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const { allJobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  
  // Get 6 featured jobs
  const featuredJobs = allJobs.slice(0, 6);
  
  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      
      {/* Featured Jobs Section */}
      {user && featuredJobs.length > 0 && (
        <section className="py-8 sm:py-10 md:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
              <div className="w-full sm:w-auto">
                <h2 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Featured <span className="text-purple-600">Jobs</span>
                </h2>
                <p 
                  className="text-sm sm:text-base md:text-lg"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Hand-picked opportunities just for you
                </p>
              </div>
              
              {/* Desktop View All Button */}
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="hidden sm:flex whitespace-nowrap px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base"
                style={{ borderColor: 'var(--border-color)' }}
              >
                View All Jobs
              </Button>
            </div>
            
            {/* Jobs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {featuredJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
            
            {/* Mobile View All Button */}
            <div className="text-center mt-6 sm:mt-8 sm:hidden">
              <Button
                onClick={() => navigate('/jobs')}
                className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto px-6 py-3 text-sm font-semibold"
              >
                View All Jobs
              </Button>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  )
}

export default Home
