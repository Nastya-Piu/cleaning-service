import React from 'react';
import Header from './shared/Header';

class App extends React.Component {

  render() {
    return (
      <>
      <Header />
      <div className="container">Hello!</div>
      </>
    );
  };
}

export default App;