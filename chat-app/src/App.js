import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  const [count, setCount] = useState(0);
  let components = [];
  for (let i = 0; i< 5; i++) {
    components.push(
      <Example key={i} count={count + i} />
    );
  }
  return (
  
    <div className="App"><h1>{props.a}</h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload - Done.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        {components}
        <p>
        Random parent: {Math.random()}
        </p>
      </header>
    </div>
  );
}

function Example({count}) {
  // Declare a new state variable, which we'll call "count"
  const [message, setMessage] = useState("lol");
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000 + Math.random() * 10000);
    return <div> Loading... </div>
  }
  return (
    <div>
      <p>
        {message}
        <br/>
        Count: {count}
        <br/>
        Random child: {Math.random()}
      </p>
      <textarea onChange={evt => setMessage(evt.target.value)} />
    </div>
  );
}

export default App;
