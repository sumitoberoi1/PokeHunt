import React from "react";
import { getBerriesForPage } from "./network";
import { Link, navigate } from "@reach/router";
import Page404 from "./404";

class Berries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: 0,
      page: parseInt(props.id),
      berries: [],
      isLoading: true,
      error: false
    };
    this.prevButtonTapped = this.prevButtonTapped.bind(this);
    this.nextButtonTapped = this.nextButtonTapped.bind(this);
  }
  async componentDidMount() {
    const { page } = this.state;
    const berryData = await getBerriesForPage(page);
    let stateData = { ...berryData, isLoading: false };
    this.setState(stateData);
  }

  async prevButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page - 1;
    let berryData = await getBerriesForPage(page);
    navigate(`/berries/page/${page}`);
    this.setState({ ...berryData, isLoading: false });
  }

  async nextButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page + 1;
    let berryData = await getBerriesForPage(page);
    navigate(`/berries/page/${page}`);
    this.setState({ ...berryData, isLoading: false });
  }

  render() {
    const { berries, numberOfPages, isLoading, page, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    }
    if (isNaN(page) || page < 0 || page > numberOfPages) {
      return <Page404 />;
    }
    if (error) {
      return <Page404 />;
    }
    if (berries.length === 0) {
      return <Page404 />;
    } else {
      return (
        <React.Fragment>
          {berries.map(berry => {
            const berryStringToArray = berry.url.split("/");
            const berryID = berryStringToArray[berryStringToArray.length - 2];
            return (
              <div key={berryID}>
                <Link to={`/berries/${berryID}`}>{berry.name}</Link>
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

export default Berries;
