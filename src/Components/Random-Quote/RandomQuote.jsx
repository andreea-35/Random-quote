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
        let categName = document.getElementById("category").value;
        try {
            const response = await fetch("https://api.api-ninjas.com/v1/quotes?category=" + categName, {
                headers: {
                    'X-Api-Key': process.env.REACT_APP_API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const [quoteData] = await response.json(); // Destructure to get the first (and only) object from the array
            setQuote({
                q: quoteData.quote,
                a: "- "+quoteData.author
            });
        } catch (error) {
            console.error("Failed to fetch quotes: ", error.message);
            // Display an error message to the user if needed
            setQuote({
                q: "Error fetching quote. Please try again later.",
                a: ""
            });
        }
    }

    const twitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.q} - ${quote.a}`);
    }

    // Load a quote when the component mounts
    useEffect(() => {
        loadQuote();
    }, []);

    return (
        <div className='container'>
            <div className='category-select'>
                <p>Category  <i>&#x25B6;</i>  </p>
                <select id="category">
                    <option value="happiness" selected>Happiness</option>
                    <option value="change">Change</option>
                    <option value="courage">Courage</option>
                    <option value="dating">Dating</option>
                    <option value="dreams">Dreams</option>
                    <option value="equality">Equality</option>
                    <option value="family">Family</option>
                </select>
            </div>
            <div className="quote">{quote.q}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">{quote.a}</div>
                    <img className="reload-btn" src={reload_icon} onClick={() => loadQuote()} alt="Reload Icon" />
                    <div className="icons">
                        <img src={copy_icon} onClick={() => navigator.clipboard.writeText(`${quote.q} - ${quote.a}`)} alt="Copy to Clipboard" />
                        <img src={twitter_icon} onClick={() => twitter()} alt="Tweet it" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuote;
