import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter.png';
import reload_icon from '../Assets/reload.png';
import copy_icon from '../Assets/copy.png';

const RandomQuote = () => {

    // Initialize state with default values
    const [quote, setQuote] = useState({ q: "", a: "" });

    // Function to load a single quote from the API
    async function loadQuote() {
        let categName = document.getElementById("category").value.trim().toLowerCase(); // Get selected category
    
        try {
            const response = await fetch(`https://api.quotable.io/random?tags=${categName}`);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const quoteData = await response.json(); // Get the quote object
    
            setQuote({
                q: quoteData.content, // Quote text
                a: "- " + quoteData.author // Author
            });
        } catch (error) {
            console.error("Failed to fetch quotes: ", error.message);
    
            setQuote({
                q: "Error fetching quote. Please try again later.",
                a: ""
            });
        }
    }  

    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.q} ${quote.a}`);
    }

    // Load a quote when the component mounts
    useEffect(() => {
        loadQuote();
    }, []);

    return (
        <div className='container'>
            <div className='category-select'>
                <p>Category  <i>&#x25B6;</i> </p>
                <select id="category">
                    <option value="inspirational" selected>Inspirational</option>
                    <option value="happiness">Happiness</option>
                    <option value="love">Love</option>
                    <option value="success">Success</option>
                    <option value="friendship">Friendship</option>
                    <option value="wisdom">Wisdom</option>
                    <option value="education">Education</option>
                </select>
            </div>
            <div className="quote">{quote.q}</div>
            <div>
                <div className="author">{quote.a}</div>
                <div className="line"></div>
                <div className="bottom">
                    <img src={copy_icon} onClick={() => navigator.clipboard.writeText(`${quote.q} ${quote.a}`)} alt="Copy to Clipboard" />
                    <img className="reload-btn" src={reload_icon} onClick={() => loadQuote()} alt="Reload Icon" />
                    <img src={twitter_icon} onClick={() => twitter()} alt="Tweet it" />
                </div>
            </div>
        </div>
    );
}

export default RandomQuote;
