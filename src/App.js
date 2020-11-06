import React, { Component } from "react";
import { stockArray } from "./stocks.js";

const localStocks = stockArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { buying: [], selling: [], sArray: localStocks };
    this.buyButton = this.buyButton.bind(this);
    this.sellButton = this.sellButton.bind(this);
  } // end constructor

  /************* buyButton/Basket STARTS *************/
  buyButton(itemID) {
    //this finds the obj in the array that matches the
    //itemID of the obj we click on, and assigns it to var name buyObj.
    let buyObj = this.state.sArray.filter(this.buyObjBySymbol(itemID));
    //now that obj is found concat to the buy array.
    //**avoids mutation errors */
    this.setState({ buying: this.state.buying.concat(buyObj) });
  }
  //filter function now used to find matches  Exact matches
  // of Symbol property
  buyObjBySymbol(symbolToFind) {
    return function (stockObject) {
      return stockObject.Symbol === symbolToFind;
    };
  }
  /************* buyButton/Basket ENDS *************/

  /************* sellButton/Basket STARTS *************/
  //see buyButton above for comments
  sellButton(itemID) {
    let sellObj = this.state.sArray.filter(this.sellObjBySymbol(itemID));
    this.setState({ selling: this.state.selling.concat(sellObj) });
  }
  //filter same as buy
  sellObjBySymbol(symbolToFind) {
    return function (stockObject) {
      return stockObject.Symbol === symbolToFind;
    };
  }
  /************* sellButton/Basket ENDS *************/

  render() {
    return (
      <div className="App">
        <h1>CS385 Stocks and Shares</h1>
        <ul>
          {this.state.sArray.map((s) => (
            <li key={s.Symbol}>
              <b>{s.Symbol}</b>, <i>{s.Company}</i> ${s.Price}&nbsp;&nbsp;
              <button onClick={() => this.buyButton(s.Symbol)}>Buy</button>
              &nbsp;&nbsp;
              <button onClick={() => this.sellButton(s.Symbol)}>Sell</button>
            </li>
          ))}
        </ul>

        <hr />
        <p>
          Total stock objects (BUY): {this.state.buying.length}
          <br />
          Total stock objects (SELL): {this.state.selling.length}
        </p>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default App;
