import React, { PureComponent } from "react";
import { getAllItems, getAllPromotions } from "./database";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: getAllItems(),
      promotions: getAllPromotions(),
      listPage: true,
      cart: []
    };
  }

  goToCartView = () => {
    this.setState({ listPage: false });
  };

  goToListView = () => {
    this.setState({ listPage: true });
  };

  addToCart = item => {
    this.setState({ cart: [...this.state.cart, item] });
  };

  logCart = () => {
    const result = [];
    this.state.cart.forEach(item => {
      result.push(`${item.barcode}-${item.amount}`);
    });
    console.log(result);
  };

  render() {
    if (this.state.listPage) {
      return (
        <ItemList
          items={this.state.items}
          promotions={this.state.promotions}
          changePage={this.goToCartView}
          addToCart={this.addToCart}
        />
      );
    }
    return (
      <div>
        <ShoppingCart
          items={this.state.cart}
          changePage={this.goToListView}
          logCart={this.logCart}
        />
      </div>
    );
  }
}

class ItemList extends PureComponent {
  getItemByCode = code => {
    return this.props.items.find(item => item.barcode === code);
  };

  onAdd = event => {
    const barcode = event.currentTarget.parentElement.parentElement.getAttribute(
      "barcode"
    );
    const amount = parseInt(
      event.currentTarget.parentElement.parentElement.firstChild.value,
      10
    );
    if (amount > 0) {
      this.props.addToCart({
        ...this.getItemByCode(barcode),
        amount: amount
      });
      event.currentTarget.parentElement.parentElement.firstChild.value = 0;
      this.setOkStyle(event.currentTarget);
    }
  };

  setOkStyle = button => {
    const originalStyle = button.className;
    const originalText = button.textContent;
    button.className = "btn btn-success btn-sm";
    button.textContent = "OK !";

    setTimeout(() => {
      button.className = originalStyle;
      button.textContent = originalText;
    }, 1000);
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-lg btn-block btn-outline-info"
          onClick={this.props.changePage}
        >
          GO TO SHOPPING CART
        </button>
        <h3 className="bg-light mb-0">ITEMS LIST</h3>
        <ul className="list-group">
          {this.props.items.map(item => (
            <li key={item.barcode}>
              <div className="list-group-item d-flex justify-content-between align-items-center row">
                <div className="col">{item.name}</div>
                <div className="badge badge-info col-1">
                  {item.price}元/{item.unit}
                </div>
                <div className="col-3 input-group" barcode={item.barcode}>
                  <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      onClick={this.onAdd}
                      className="btn btn-primary btn-sm"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <h3 className="bg-light mb-0">PROMOTIONS LIST</h3>
        <ul className="list-group">
          {this.props.promotions.map(item =>
            item.barcodes.map(barcode => (
              <li key={item.type + barcode}>
                <div className="list-group-item d-flex justify-content-between align-items-center row">
                  <div className="col">{this.getItemByCode(barcode).name}</div>
                  <div className="badge badge-success col-3">{item.type}</div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}

class ShoppingCart extends PureComponent {
  getTotalAmount = () => {
    let amount = 0;
    this.props.items.forEach(item => {
      amount += item.price * item.amount;
    });
    return amount;
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-lg btn-block btn-outline-info"
          onClick={this.props.changePage}
        >
          GO TO ITEM LIST
        </button>
        <h3>SHOPPING CART</h3>
        <ul className="list-group">
          {this.props.items.map(item => (
            <li key={item.barcode}>
              <div className="list-group-item d-flex justify-content-between align-items-center row">
                <div className="col-4">{item.name}</div>
                <div className="badge badge-info col-1">
                  {item.price}元/{item.unit}
                </div>
                <div className="col-4 text-right">
                  共 {item.amount} {item.unit}
                </div>
                <div className="col text-right">
                  小计： {item.amount * item.price} 元
                </div>
              </div>
            </li>
          ))}
          <li key="total">
            <div className="list-group-item d-flex justify-content-between align-items-center row">
              <div className="col">总计：</div>
              <div className="col-2 text-right">{this.getTotalAmount()}元</div>
            </div>
          </li>
        </ul>
        <button
          className="btn btn-lg btn-block btn-success"
          onClick={this.props.logCart}
        >
          CONFIRM
        </button>
      </div>
    );
  }
}

export default App;
