const { OpenAI } = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY,
})

exports.handler = async (event, context) => {
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

  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  }

  try {
    const { messages } = JSON.parse(event.body)

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

    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    })

    // Transform the stream into a string of SSE events
    let responseText = ""
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ""
      if (content) {
        responseText += `data: ${content}\n\n`
      }
    }
    responseText += "data: [DONE]\n\n"

    return {
      statusCode: 200,
      body: responseText,
      headers,
      isBase64Encoded: false,
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
