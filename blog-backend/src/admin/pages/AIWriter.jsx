import React, { useState } from "react";

export default function AIWriter() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateBlog = async () => {
    if (!topic.trim()) {
      setMessage("Please enter a topic.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate blog");
      }

      setMessage("Blog generated successfully! Draft created in Strapi.");
      setTopic("");

      console.log("Generated article:", result);
    } catch (error) {
      console.error(error);
      //setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Blog Generator</h1>

      <p>
        Enter a topic and generate a blog article with Gemini.
      </p>

      <input
        type="text"
        placeholder="Enter blog topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={loading}
        style={{
          width: "400px",
          padding: "12px",
          marginTop: "20px",
        }}
      />

      <br />

      <button
        onClick={generateBlog}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}
    </div>
  );
}