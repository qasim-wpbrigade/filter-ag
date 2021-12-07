/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const columnDefs = [
  { headerName: "Id", field: "id" },
  { headerName: "Name", field: "name" },
];

const rowData = [
  { id: 1, name: "Celica" },
  { id: 2, name: "Mondeo" },
  { id: 3, name: "Boxter" }
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
      f_name: "",
      f_iprice: "",
      filtering: false
    };
  }
  componentDidUpdate() {
    if (this.state.filtering) {
      const fd = this.state.data.filter((i) => {
        return (
          i.name.toLowerCase().includes(this.state.id_name) &&
          i.id.toString().includes(this.state.f_id.toString())
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
        Id:&nbsp;
        <input
          type="number"
          name="f_id"
          id="f_id"
          value={this.state.f_id}
          onChange={this.handlefilter}
        />
        Name:&nbsp;
        <input
          type="text"
          name="f_name"
          id="f_name"
          value={this.state.f_name}
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
