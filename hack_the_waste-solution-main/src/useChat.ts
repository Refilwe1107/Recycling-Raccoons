import { useState, useCallback, useRef, useEffect } from "react"

interface ChatMessage {
  id: number
  role: "user" | "assistant" | "system"
  content: string
}

export function useChat(options = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const CHAT_API_ENDPOINT =
    import.meta.env.VITE_APP_ENV === "production"
      ? "/api/chat-stream"
      : "/.netlify/functions/chat-stream"

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value)
  }, [])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault()

      if (!input.trim() || isLoading) return

      const userMessage: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: input,
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setIsLoading(true)

      const assistantMessageId = Date.now() + 1
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ])

      const messageHistory = [...messages, userMessage].slice(-5)
      const apiMessages = messageHistory.map(({ role, content }) => ({
        role,
        content,
      }))

      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      try {
        const response = await fetch(CHAT_API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: abortControllerRef.current?.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error("No reader available")

        let accumulatedContent = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // Convert the chunk to text
          const chunk = new TextDecoder().decode(value)
          const lines = chunk.split("\n")
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const content = line.slice(6) // Remove 'data: ' prefix
              if (content === "[DONE]") break
              accumulatedContent += content
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              )
            }
          }
        }

        reader.releaseLock()
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error in chat submission:", error)
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content: `Sorry, there was an error: ${error.message}`,
                  }
                : msg
            )
          )
        }
      } finally {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    },
    [input, isLoading, messages, CHAT_API_ENDPOINT]
  )

  const stop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
    setIsLoading(false)
  }, [])

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
  }
}
