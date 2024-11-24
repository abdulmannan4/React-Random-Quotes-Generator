import axios from 'axios';
import { useEffect, useState } from 'react';

const Quotes = () => {
  const [data,setData]= useState([]);
  const [random,RandomQuote]=useState(null);
  useEffect(() => {
    // If data has changed, show a random quote
    if (data.length > 0) {
      showRandomQuote();
    }
  }, [data]); // This effect runs whenever `data` changes

  const showRandomQuote = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length); // Randomly pick an index
      RandomQuote(data[randomIndex]); // Set the random quote to state
    }
  };
  const fetchQuotes = async () => {
    
    
    await axios.get('https://dummyjson.com/quotes')
      .then((response) => {
        console.log('Data:', response.data);

        setData(response.data.quotes)
        showRandomQuote(); // Handle the successful response
        console.log('Data:', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Handle errors
      });
  };

  return (
<div className="flex justify-center items-center h-screen">
  <div className="text-white h-[600px] bg-zinc-500 w-[600px] border border-white rounded flex flex-col justify-between">

    <div className="m-6 px-6 py-2 bg-green-500 h-[40vh] text-white rounded-lg hover:bg-green-600 flex justify-center items-center">
      <div className=" overflow-hidden flex justify-center items-center h-full w-full">
      {/* {data.map((index) => (
  <div key={index.id}>{index.quote}</div>  // Using `key` prop for efficient rendering
))} */}
{random ? (
              <div>
                <h2 className="text-xl">{random.quote}</h2>
               
              </div>
            ) : (
              <div>Click the button to see a quote!</div>
            )}
      </div>
    </div>

    <button
       onClick={
        fetchQuotes} // Fetch quotes
         // Show a random quote
 
      className="m-2 px-6 py-2 bg-blue-500 text-white text-2xl rounded-lg hover:bg-blue-600"
    >
      Get Quote
    </button>
  </div>
</div>



  );
};

export default Quotes;
