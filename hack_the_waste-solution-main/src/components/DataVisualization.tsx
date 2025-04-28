import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { wasteErrors } from "../data"
import { errorExamples } from "../data"

export const DataVisualization = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [expandedItems, setExpandedItems] = useState({})

  const toggleItem = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  return (
    <section className='py-16 bg-white' ref={ref}>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-12 text-fost-primary'>
          Composition of Errors
        </h2>
        <div className='grid gap-4'>
          {wasteErrors.map((error, index) => (
            <div
              key={error.item}
              className='bg-fost-bg rounded-lg overflow-hidden'
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className='p-4 cursor-pointer'
                onClick={() => toggleItem(error.item)}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <span
                      className={`mr-2 transform transition-transform ${
                        expandedItems[error.item] ? "rotate-90" : ""
                      }`}
                    >
                      ▶
                    </span>
                    <span className='text-gray-800 font-medium'>
                      {error.item}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${error.percentage * 10}%` } : {}
                      }
                      transition={{ duration: 1, ease: "easeOut" }}
                      className='h-4 bg-fost-secondary rounded w-32 max-w-full'
                    />
                    <span className='ml-3 text-fost-primary font-semibold min-w-16 text-right'>
                      {error.percentage}%
                    </span>
                  </div>
                </div>
              </motion.div>

              {expandedItems[error.item] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='px-4 pb-4 pt-0 bg-gray-50'
                >
                  <div className='pl-6 border-l-2 border-fost-secondary'>
                    {error.item === "Big plastic objects" && (
                      <div className='text-sm text-gray-600 italic mb-3'>
                        Note: This category includes plastic bottles larger than
                        8L
                      </div>
                    )}
                    <h4 className='text-sm font-medium text-gray-600 mb-3'>
                      Examples:
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {errorExamples[error.item].map((example, i) => (
                        <div
                          key={i}
                          className='flex flex-col items-center bg-white rounded-lg shadow-sm p-3'
                        >
                          <img
                            src={example.image}
                            alt={example.text}
                            className='w-full h-32 object-cover rounded-lg mb-2'
                          />
                          <span className='text-sm text-center text-gray-700'>
                            {example.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
