import React, { PureComponent } from "react";
import { getAllItems, getAllPromotions } from "./database";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listPage: true,
      items: getAllItems(),
      promotions: getAllPromotions(),
      cart: []
    };
  }
  render() {
    if (this.state.listPage) {
      return (
        <div>
          <ItemList items={this.state.items} />
        </div>
      );
    }
    return (
      <div>
        <ShoppingCart items={this.state.cart} />
      </div>
    );
  }
}

class ItemList extends PureComponent {
  render() {
    return <div>list</div>;
  }
}

class ShoppingCart extends PureComponent {
  render() {
    return <div>cart</div>;
  }
}

export default App;
