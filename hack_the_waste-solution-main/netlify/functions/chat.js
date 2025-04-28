const { OpenAI } = require("openai")

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
})

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: {
        Allow: "POST",
        "Content-Type": "application/json",
      },
    }
  }

  try {
    // Parse the request body
    const { messages } = JSON.parse(event.body)

    // Add system message to guide the AI's responses
    const systemMessage = {
      role: "system",
      content: `You are a recycling assistant for Belgium, specifically knowledgeable about:
- PMD (blue bag) recycling rules
- Sorting guidelines for different types of waste
- Local recycling facilities and collection points
- Belgian recycling regulations and best practices
- Fost Plus recycling programs and initiatives

Keep your responses focused on Belgian recycling context. If you're not sure about specific local details, say so and provide general recycling guidance instead.

Respond in a clear, concise manner. If relevant, structure complex information in bullet points.`,
    }

    // Create the chat completion with the system message
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7, // Adjust for creativity vs consistency
      max_tokens: 500, // Limit response length
    })

    // Return the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: completion.choices[0].message.content,
        usage: completion.usage,
      }),
      headers: { "Content-Type": "application/json" },
    }
  } catch (error) {
    console.error("Error processing chat request:", error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error processing your request",
        details: error.message,
      }),
      headers: { "Content-Type": "application/json" },
    }
  }
}
