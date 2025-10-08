console.log("ENV TEST:", process.env.REACT_APP_OPENROUTER_API_KEY);

export async function sendMsgToOpenAI(message) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // ✅ penting untuk OpenRouter
        "X-Title": "My ChatGPT Clone",           // ✅ nama aplikasi kamu
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // atau bisa coba ganti: "openai/gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("OpenRouter response:", data);

    if (data?.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else if (data?.error?.message) {
      return `⚠️ API Error: ${data.error.message}`;
    } else {
      return "⚠️ Sorry, I couldn’t get a response from the AI.";
    }
  } catch (error) {
    console.error("OpenRouter API Error:", error);
    return "❌ Connection error. Please try again.";
  }
}