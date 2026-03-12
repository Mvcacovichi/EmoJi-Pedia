import React, { useState, useEffect } from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";
import EmojiBackground from "./EmojiBackground";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [copyMessage, setCopyMessage] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    { id: "todos", label: "Todos", icon: "🌐" },
    { id: "carinhas", label: "Carinhas", icon: "😊" },
    { id: "animais", label: "Animais", icon: "🐾" },
    { id: "comida", label: "Comida", icon: "🍕" },
    { id: "tech", label: "Tech", icon: "🚀" },
    { id: "simbolos", label: "Símbolos", icon: "✨" },
    { id: "bandeiras", label: "Bandeiras", icon: "🚩" },
    { id: "marcas", label: "Marcas", icon: "🏷️" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopyMessage(`Copiado: ${emoji}`);
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const handleSurprise = () => {
    const randomEmoji = emojipedia[Math.floor(Math.random() * emojipedia.length)];
    setSearchTerm(randomEmoji.name);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredEmojis = emojipedia.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emoji.includes(searchTerm);
    
    const matchesCategory = selectedCategory === "todos" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <EmojiBackground />
      
      {copyMessage && <div className="copy-toast">{copyMessage}</div>}

      {showScrollTop && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </div>
      )}

      <header>
        <h1>
          <span>emojipedia</span>
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar emoji (ex: fogo, rindo...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          
          <div className="category-filters">
            {categories.map(cat => (
              <button 
                key={cat.id}
                className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          <button className="surprise-btn" onClick={handleSurprise}>
            🎲 Me surpreenda!
          </button>
        </div>
      </header>

      <dl className="dictionary">
        {filteredEmojis.length > 0 ? (
          filteredEmojis.map((emojiTerm) => (
            <div key={emojiTerm.id} onClick={() => handleCopy(emojiTerm.emoji)} className="entry-wrapper">
              <Entry
                emoji={emojiTerm.emoji}
                name={emojiTerm.name}
                description={emojiTerm.meaning}
              />
            </div>
          ))
        ) : (
          <div className="no-results">
            <span role="img" aria-label="shrug">🤷‍♂️</span>
            <p>Nenhum emoji encontrado para "{searchTerm}"</p>
          </div>
        )}
      </dl>
      
    </div>
  );
}

export default App;
