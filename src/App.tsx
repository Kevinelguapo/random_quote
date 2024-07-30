import { useState, useEffect } from 'react'

import './App.css'
import { FaTwitter, FaFacebook, FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css";






interface Quote {
  text: string;
  author: string;

}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null)

  // Fetch a random quote from the API 


  const fetchQuote = async () => {
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      const data = await response.json();
      // Assuming the API response has the structure { quote: string, author: string }
      console.log(data)
      setQuote({
        text: data.quote,
        author: data.author
      });
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };



  useEffect(() => {
    fetchQuote();
  }, [])

  const handleNewQuote = () => {
    fetchQuote();
  };

  if (quote === null) {
    return <h1>Loading...</h1>;
  }

  const tweetUrl = "https://twitter.com/intent/tweet?text=" + quote.text + " By " + quote.author;
  
  // this should be fixed to this actual webpage link with the params
  // const hostLink = "https://kevinelguapo.github.io/kevinelguapo.io/"

  // const encodedQuote = encodeURIComponent(`${quote.text} - ${quote.author}`);
  // const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${hostLink}`)}&quote=${encodedQuote}`;


  return (
    <div className='background bg-dark text-light'>
      <h1 id='title'>Random Quote Generator</h1>
      <div id='quote-box' className='bg-secondary mx-4 p-4 rounded'>
        <div className='quote-content '>
          <FaQuoteLeft size={26} className="me-2 pb-2" />
          <h2 id='text' className='d-inline'> {quote?.text}</h2>
          <FaQuoteRight size={26} className='ms-3 pb-2' />
          <h6 id='author' className='my-4 text-end'>- {quote?.author}</h6>

        </div>
        <div className='buttons d-flex justify-content-between'>
          <div>
            <a href={tweetUrl}
              target="_blank"
              id="tweet-quote"
              className='btn btn-light me-2 '><FaTwitter size={32} /></a>
            {/* this should be ubdate to share in facebook whe webpage with the current quote in the url to load the page with conditional url params (displaying the quote in the url params) */}
            {/* <a
              href={facebookUrl}
              target="_blank"
              id="facebook-quote"
             className='btn btn-light '><FaFacebook size={32} /></a> */}
          </div>
          <button id='new-quote' className='btn btn-light d-flex align-items-end' onClick={handleNewQuote}>
            <h6>New Quote</h6>
          </button>
        </div>
      </div>
      <p className='text-secondary position-absolute bottom-0'>By Kevin</p>

    </div>
  )
}

export default App
