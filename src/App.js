import { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [streak, setStreak] = useState("");
  const [streakLength, setStreakLength] = useState(0);

  // register the event listener for any keyboard event
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Backspace") {
        setText((prev) => prev.slice(0, -1));
      } else if (event.key === " " || /^[a-zA-Z]$/.test(event.key)) {
        setText((prev) => prev + event.key);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Handle fetching longest streak on every text change
  useEffect(() => {
    const abortController = new AbortController();

    fetch("/alph-a-row", {
      method: "POST",
      body: JSON.stringify({ text: text }),
      headers: new Headers({ "content-type": "application/json" }),
      signal: abortController.signal,
    })
      .then(async (res) => {
        if (!abortController.signal.aborted) {
          const data = await res.json();
          setStreak(data.streak);
          setStreakLength(data.streak_length);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("HTTP fetch error: ", error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [text]);

  const renderHighlightedText = useMemo(() => {
    const index = text.indexOf(streak);
    if (index === -1) {
      return text;
    }
    return (
      <>
        <span>{text.slice(0, index)}</span>
        <span style={{ backgroundColor: "yellow" }}>{streak}</span>
        <span>{text.slice(index + streak.length)}</span>
      </>
    );
  }, [text, streak]);

  return (
    <div className="container">
      <div className="text-container">
        {text === "" && <div className="placeholder-text">Start typing...</div>}
        {renderHighlightedText}
      </div>
      <div className="streak-info">
        Longest even or odd streak: {streakLength}
      </div>
    </div>
  );
}

export default App;
