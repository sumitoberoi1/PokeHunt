import React from "react";
import { getMachinesforPage } from "./network";
import { Link, navigate } from "@reach/router";
import Page404 from "./404";

class Machines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: 0,
      page: parseInt(props.id),
      machines: [],
      isLoading: true,
      error: false
    };
    this.prevButtonTapped = this.prevButtonTapped.bind(this);
    this.nextButtonTapped = this.nextButtonTapped.bind(this);
  }
  async componentDidMount() {
    const { page } = this.state;
    const machineData = await getMachinesforPage(page);
    let stateData = { ...machineData, isLoading: false };
    this.setState(stateData);
  }

  async prevButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page - 1;
    let machineData = await getMachinesforPage(page);
    navigate(`/machines/page/${page}`);
    this.setState({ ...machineData, isLoading: false });
  }

  async nextButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page + 1;
    let machineData = await getMachinesforPage(page);
    navigate(`/machines/page/${page}`);
    this.setState({ ...machineData, isLoading: false });
  }

  render() {
    const { machines, numberOfPages, isLoading, page, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    }
    if (isNaN(page) || page < 0 || page > numberOfPages) {
      return <Page404 />;
    }
    if (error) {
      return <Page404 />;
    }
    if (machines.length === 0) {
      return <Page404 />;
    } else {
      return (
        <React.Fragment>
          {machines.map(machine => {
            const machineStringToArray = machine.url.split("/");
            const machineID =
              machineStringToArray[machineStringToArray.length - 2];
            return (
              <div key={machineID}>
                <Link to={`/machines/${machineID}`}>{machine.url}</Link>
              </div>
            );
          })}
          {page !== 0 && <button onClick={this.prevButtonTapped}>Prev</button>}
          <span>{page}</span>
          {page < numberOfPages && (
            <button onClick={this.nextButtonTapped}>Next</button>
          )}
        </React.Fragment>
      );
    }
  }
}

export default Machines;
