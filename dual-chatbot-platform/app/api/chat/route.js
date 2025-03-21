export async function POST(req) {
  try {
    const { message, mode } = await req.json();

    if (!message || !mode) {
      console.error("Error: Missing message or mode", { message, mode });
      return new Response(JSON.stringify({ error: "Message and mode are required" }), { status: 400 });
    }

    const token = req.headers.get("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
      console.error("Error: Missing or invalid token");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    console.log("Sending API request:", { query: message, mode });

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message, // Make sure it matches FastAPI expected format
        mode: mode,
      }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      return new Response(JSON.stringify({ error: "Failed to get response from chatbot" }), { status: response.status });
    }

    return new Response(JSON.stringify({ response: data.response }), { status: 200 });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
