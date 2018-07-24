import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Renderer from "react-test-renderer";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("Application", () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render App correctly", () => {
    const tree = Renderer.create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should add item to cart correctly", () => {
    const app = mount(<App />);
    const itemSelector = "div[barcode*='001']";

    let log;
    console.log = jest.fn(content => (log = content));

    expect(
      app
        .find(itemSelector)
        .childAt(1)
        .text()
    ).toEqual("ADD");

    app.find(`${itemSelector} input`).instance().value = 1;
    app.find(`${itemSelector} button`).simulate("click");
    app.find(".btn-block").simulate("click");
    expect(app.find("div.col-2").text()).toEqual("3元");

    app.find(".btn-success").simulate("click");
    expect(log).toEqual(["ITEM000001-1"]);
  });
});
