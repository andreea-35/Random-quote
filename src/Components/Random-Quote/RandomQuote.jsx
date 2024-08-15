import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter.png';
import reload_icon from '../Assets/reload.png';

const RandomQuote = () => {

    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({ q: "", a: "" });
    //const [quote, setQuote] = useState({ q: "Selfishness and greed, individual or national, cause most of our troubles", a: "Harry S. Truman" });

    // Function to load quotes from API
    async function loadQuotes() {
        const response = await fetch("https://type.fit/api/quotes");
        const quotesData = await response.json();
        setQuotes(quotesData);
        setRandomQuote(quotesData);
    }

    // Function to select a random quote
    const setRandomQuote = (quotesArray) => {
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        const select = quotesArray[randomIndex];
        setQuote({
            q: select.text,
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
            <div className="quote">{quote.q}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">{quote.a}</div>
                    <div className="icons">
                        <img src={reload_icon} onClick={() => setRandomQuote(quotes)} alt="Reload Icon" />
                        <img src={twitter_icon} onClick={() => twitter()} alt="Twitter Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuote;