import React, { useEffect, useState } from "react";

const emojis = ["✨", "🌈", "🔥", "🚀", "🦄", "🍕", "💡", "🎨", "💎", "🌟", "🎈", "🍭"];

function FallingEmoji({ left, speed, delay, emoji }) {
  return (
    <div
      className="falling-emoji"
      style={{
        left: `${left}%`,
        animationDuration: `${speed}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {emoji}
    </div>
  );
}

function EmojiBackground() {
  const [fallingItems, setFallingItems] = useState([]);

  useEffect(() => {
    const allEmojis = ["😀", "😂", "🥰", "😍", "🤩", "😜", "😎", "🥳", "😭", "🤯", "🐱", "🐶", "🦁", "🦄", "🦋", "🍎", "🥑", "🍔", "🍕", "🍣", "🚀", "💡", "💎", "❤️", "🔥", "✨", "🌈", "🎮", "⚽", "🎸"];
    
    // Generate 60 falling emojis for a denser "rain" effect
    const items = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      speed: 8 + Math.random() * 12, // slightly faster: 8s to 20s
      delay: Math.random() * -20, // Negative delay so they start at different points in the loop immediately
      emoji: allEmojis[Math.floor(Math.random() * allEmojis.length)],
      size: 1 + Math.random() * 1.5, // Random sizes for depth
    }));
    setFallingItems(items);
  }, []);

  return (
    <div className="emoji-bg-container">
      {fallingItems.map((item) => (
        <div
          key={item.id}
          className="falling-emoji"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.speed}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.size}rem`,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

export default EmojiBackground;
