import React, { Component, PureComponent } from "react";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      cart: []
    };
  }
  render() {
    return (
      <div>
        <h1>Item List</h1>
      </div>
    );
  }
}

export default App;
