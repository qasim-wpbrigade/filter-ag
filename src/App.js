/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const columnDefs = [
  { headerName: "Make", field: "make" },
  { headerName: "Model", field: "model", sort: "desc" },
  { headerName: "Price", field: "price" }
];

const rowData = [
  { make: "Toyota", model: "Celica", price: 35000 },
  { make: "Ford", model: "Mondeo", price: 32000 },
  { make: "Porsche", model: "Boxter", price: 72000 }
];

const defaultColDef = {
  editable: false,
  flex: 1,
  filter: false,
  sortable: false
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterData: [],
      make: "",
      model: "",
      price: "",
      filtering: false
    };
  }
  componentDidUpdate() {
    if (this.state.filtering) {
      const fd = this.state.data.filter((i) => {
        return (
          i.make.toLowerCase().includes(this.state.make) &&
          i.model.toLowerCase().includes(this.state.model) &&
          i?.price.toString().includes(this.state.price.toString())
        );
      });
      this.setState({ filterData: fd, filtering: false });
    }
  }

  componentDidMount() {
    this.setState({ data: rowData, filterData: rowData });
  }

  handlefilter = (e) => {
    this.setState({
      [e.target.name]: e.target.value.toLowerCase(),
      filtering: true
    });
    var w = document.querySelector(`[col-id="${e.target.name}"]`);
    const t = w.querySelector(".ag-filter-icon");
    if (e.target.value !== "") {
      t.style = "display:block !important";
    } else {
      t.style.display = "";
    }
  };

  render() {
    return (
      <div className="App">
        Make:&nbsp;
        <input
          type="text"
          name="make"
          id="make"
          value={this.state.make}
          onChange={this.handlefilter}
        />
        Model:&nbsp;
        <input
          type="text"
          name="model"
          id="model"
          value={this.state.model}
          onChange={this.handlefilter}
        />
        Price:&nbsp;
        <input
          type="number"
          name="price"
          id="price"
          value={this.state.price}
          onChange={this.handlefilter}
        />
        <br></br>
        <br></br>
        <div
          className="ag-theme-balham margin10"
          style={{ height: "200px", width: "600px" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={this.state.filterData}
            defaultColDef={defaultColDef}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default App;
