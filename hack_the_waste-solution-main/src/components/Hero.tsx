import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, ArrowDown, ArrowLeft, Send, X } from "lucide-react"
import { useChat } from "../useChat"

export const Hero = () => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAISubmit,
    isLoading,
  } = useChat()
  const [chatActive, setChatActive] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Add this function to handle suggested queries
  const handleSuggestionClick = (suggestion: string) => {
    handleInputChange({ target: { value: suggestion } } as any)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Lock/unlock scrolling based on chat state
  useEffect(() => {
    if (chatActive) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [chatActive])

  // Focus search input when chat becomes active
  useEffect(() => {
    if (chatActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [chatActive])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const activateChat = () => {
    setChatActive(true)
  }

  const deactivateChat = () => {
    setChatActive(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    handleAISubmit(e)
  }

  return (
    <section className='min-h-screen bg-gradient-to-b from-fost-bg to-white flex items-center justify-center relative overflow-hidden'>
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className='absolute inset-0 pointer-events-none'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Hero content */}
      <AnimatePresence>
        {!chatActive && (
          <motion.div
            className='container mx-auto px-4 py-16 z-10'
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center max-w-4xl mx-auto'
            >
              <h1 className='text-5xl md:text-7xl font-bold text-fost-primary mb-6'>
                Transforming Recycling in Belgium
              </h1>
              <div className='flex items-center justify-center gap-4 mb-8'>
                <AlertCircle className='w-12 h-12 text-red-500' />
                <p className='text-3xl md:text-4xl font-semibold text-red-500'>
                  21% incorrect waste
                </p>
              </div>
              <p className='text-xl text-gray-600 mb-8'>
                Of all items collected in the blue bag, 21% shouldn't be there.
                We're changing that through innovative solutions and clear
                guidance.
              </p>
              <div className='grid md:grid-cols-3 gap-6 mb-12'>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='bg-white p-6 rounded-xl shadow-md'
                >
                  <h3 className='text-lg font-semibold text-fost-primary mb-2'>
                    Legislation-Driven
                  </h3>
                  <p className='text-gray-600'>
                    Clear packaging requirements that simplify waste
                    classification
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className='bg-white p-6 rounded-xl shadow-md'
                >
                  <h3 className='text-lg font-semibold text-fost-primary mb-2'>
                    Government-Funded
                  </h3>
                  <p className='text-gray-600'>
                    Advanced recycling machines with financial incentives for
                    proper sorting
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className='bg-white p-6 rounded-xl shadow-md'
                >
                  <h3 className='text-lg font-semibold text-fost-primary mb-2'>
                    Educational Platform
                  </h3>
                  <p className='text-gray-600'>
                    Accessible waste education that makes recycling simple and
                    rewarding
                  </p>
                </motion.div>
              </div>

              {/* Search bar replacing the button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='relative max-w-xl mx-auto'
              >
                <input
                  type='text'
                  placeholder='Ask about recycling in Belgium...'
                  className='w-full px-6 py-3 bg-white text-gray-800 rounded-full text-lg border-2 border-fost-primary focus:outline-none focus:ring-2 focus:ring-fost-primary shadow-md'
                  onClick={activateChat}
                  readOnly
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-fost-primary text-white p-2 rounded-full'>
                  <Send size={18} />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
            >
              <ArrowDown className='w-8 h-8 text-fost-primary animate-bounce' />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat interface */}
      <AnimatePresence>
        {chatActive && (
          <motion.div
            className='fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className='p-4 border-b border-gray-200 flex items-center'>
              <button
                onClick={deactivateChat}
                className='flex items-center text-gray-700 hover:text-fost-primary transition-colors'
              >
                <ArrowLeft className='w-5 h-5' />
                <span>Back to Home</span>
              </button>
              <img
                src='/raccon-logo.png'
                className='text-xl font-semibold text-fost-primary mx-auto max-h-14'
              />
            </div>

            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className='flex-1 overflow-y-auto p-4 space-y-4'
            >
              {messages.length === 0 ? (
                <div className='text-center py-12'>
                  <h3 className='text-2xl font-semibold text-fost-primary mb-3'>
                    Welcome to our Recycling Assistant
                  </h3>
                  <p className='text-gray-600 mb-6'>
                    Ask any question about recycling in Belgium
                  </p>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto'>
                    {[
                      "What goes in the blue bag?",
                      "How do I recycle electronics?",
                      "Where can I dispose of hazardous waste?",
                      "What are the recycling rates in Belgium?",
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        className='bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-3 text-left transition-colors'
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[80%] p-4 rounded-xl ${
                        message.role === "user"
                          ? "bg-fost-primary text-white ml-auto rounded-tr-none"
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='bg-gray-100 text-gray-800 max-w-[80%] p-4 rounded-xl rounded-tl-none'
                    >
                      <div className='flex space-x-2'>
                        <div
                          className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className='w-2 h-2 rounded-full bg-gray-400 animate-bounce'
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Chat input */}
            <div className='p-4 border-t border-gray-200'>
              <form onSubmit={handleSubmit} className='flex items-center gap-2'>
                <input
                  ref={searchInputRef}
                  type='text'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Ask about recycling in Belgium...'
                  className='flex-1 px-4 py-3 bg-white text-gray-800 rounded-full border-2 border-fost-primary focus:outline-none focus:ring-2 focus:ring-fost-primary'
                />
                {input && (
                  <button
                    type='button'
                    onClick={() =>
                      handleInputChange({ target: { value: "" } } as any)
                    }
                    className='p-2 text-gray-500 hover:text-gray-700'
                  >
                    <X size={20} />
                  </button>
                )}
                <button
                  type='submit'
                  disabled={isLoading || !input.trim()}
                  className='p-3 bg-fost-primary text-white rounded-full hover:bg-fost-secondary transition-colors disabled:opacity-50'
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
