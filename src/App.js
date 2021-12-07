/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import W3cFilter from './W3C_Filter';

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
      name: "",
      id: "",
      filtering: false,
      filtered: false,
    };
    this.setState = this.setState.bind(this);
  }
  componentDidUpdate() {
    if (this.state.filtering) {
      let filterd = false;
      if(this.state.name !== '' || this.state.id !== ''){
        filterd = true
      }
      const fd = this.state.data.filter((i) => {
        return (
          i.name.toLowerCase().includes(this.state.name) &&
          i.id.toString().includes(this.state.id.toString())
        );
      });
      this.setState({ filterData: fd, filtering: false,filterd:filterd });
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

  clearFilter = () => {
    this.setState({
      id: '',
      name: '',
      filtering: true
    })
  }

  render() {
    return (
      <div className="App">
        <W3cFilter setState={this.setState} clearFilter={this.clearFilter} handlefilter={this.handlefilter} state={this.state} />
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
