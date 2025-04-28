import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Target, Users, Award } from "lucide-react"

export const ValueProposition = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className='py-20 bg-fost-bg' ref={ref}>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold text-fost-primary mb-6'>
            Why Choose Fost Plus?
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            We help municipalities and waste management organisations reduce
            residual waste through innovative solutions and clear guidance.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='space-y-8'
          >
            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <Target className='w-8 h-8 text-fost-secondary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Clear Classification System
                </h3>
                <p className='text-gray-600'>
                  Our legislation-driven approach ensures straightforward
                  packaging requirements, making waste sorting intuitive and
                  efficient.
                </p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <Users className='w-8 h-8 text-fost-secondary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Financial Incentives
                </h3>
                <p className='text-gray-600'>
                  Government-funded recycling machines provide tangible rewards
                  for proper waste sorting, encouraging consistent
                  participation.
                </p>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='flex-shrink-0'>
                <Award className='w-8 h-8 text-fost-secondary' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  Accessible Education
                </h3>
                <p className='text-gray-600'>
                  Our platform simplifies waste education, making it easy for
                  everyone to understand and implement proper recycling
                  practices.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-white p-8 rounded-2xl shadow-xl'
          >
            <h3 className='text-2xl font-bold text-fost-primary mb-6'>
              Our Impact
            </h3>
            <div className='space-y-6'>
              <div className='border-l-4 border-fost-primary pl-4'>
                <p className='text-4xl font-bold text-fost-primary'>79%</p>
                <p className='text-gray-600'>Correct waste sorting rate</p>
              </div>
              <div className='border-l-4 border-fost-secondary pl-4'>
                <p className='text-4xl font-bold text-fost-secondary'>1000+</p>
                <p className='text-gray-600'>Municipalities supported</p>
              </div>
              <div className='border-l-4 border-fost-primary pl-4'>
                <p className='text-4xl font-bold text-fost-primary'>24/7</p>
                <p className='text-gray-600'>Educational resources available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
