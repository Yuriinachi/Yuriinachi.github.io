// Create a react component that inputs a text area message then performs a fetch request to localhost:3001 and gets back a response as data.message and dispalys that message in a box below
import React, {useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1>Virtual Bill Gates</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          placeholder= "What do you wish to ask Bill Gates?"
          onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit">Submit</button>
      </form>
      {response && <div><b>Bill Gates: </b> {response} </div> }
    </div>
  );
}

export default App