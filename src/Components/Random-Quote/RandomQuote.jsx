import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter.png';
import reload_icon from '../Assets/reload.png';
import copy_icon from '../Assets/copy.png';

const RandomQuote = () => {

    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({ q: "Quote quote qutoe quote", a: "Mr Quote" });
    //const [quote, setQuote] = useState({ q: "Selfishness and greed, individual or national, cause most of our troubles", a: "Harry S. Truman" });

    // Function to load quotes from API
    async function loadQuotes() {
        let categName = document.getElementById("category").value;
        try {
            const response = await fetch("https://api.api-ninjas.com/v1/quotes?category="+categName, {
                headers: {
                    'X-Api-Key': process.env.REACT_APP_API_KEY 
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const quotesData = await response.json();
            setQuotes(quotesData);
            setRandomQuote(quotesData);
        } catch (error) {
            console.error("Failed to fetch quotes: ", error.message);
            // You can display an error message to the user here if needed
        }
    }
    

    // Function to select a random quote
    const setRandomQuote = (quotesArray) => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const select = quotesArray[randomIndex];
        setQuote({
            q: select.quote,
            a: select.author.split(',')[0]
        });
    }

    const twitter =() => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.q} - ${quote.a}`);
    }

    // Load quotes once when the component mounts
    useEffect(() => {
        loadQuotes();
    }, []);

    return (
        <div className='container'>
            <select id="category">
                <option value="happiness" selected>Happiness</option>
                <option value="change">Change</option>
                <option value="courage">Courage</option>
                <option value="dating" >Dating</option>
                <option value="dreams" >Dreams</option>
                <option value="equality" >Equality</option>
                <option value="family" >Family</option>
            </select>
            <div className="quote">{quote.q}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">- {quote.a}</div>
                    <img className="reload-btn" src={reload_icon} onClick={() => loadQuotes()} alt="Reload Icon" />
                    <div className="icons">
                        <img src={copy_icon} onClick={() =>  navigator.clipboard.writeText(`${quote.q} - ${quote.a}`)} alt="Copy to Clipboard" />
                        <img src={twitter_icon} onClick={() => twitter()} alt="Tweet it" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuote;