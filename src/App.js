/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import W3cFilter from './W3C_Filter';
import W3cEdit from './W3C_Edit';

const columnDefs = [
  { headerName: "Id", field: "id" },
  { headerName: "Name", field: "name" },
  { headerName: "email", field: "email", sort: "desc" },
  { headerName: "body", field: "body" }
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
      sname: "",
      sid: "",
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
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log(resp);
        this.setState({
          data: [...resp],
          filterData: [...resp]
        });
        //console.log(this.state.rowData);
      });
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
    const t = document.querySelectorAll(".ag-filter-icon");
    t.forEach((e) => {
      e.style.display = "";
    })
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
        {
          this.state.filterd ? <W3cEdit /> : ''
        }
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
