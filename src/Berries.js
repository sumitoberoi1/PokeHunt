import React from "react";
import { getBerriesForPage } from "./network";
import { Link, navigate } from "@reach/router";
import Page404 from "./404";
import Card from "./Card";
import Pagination from "./Pagination";

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
        <div className="container">
          {berries.map(berry => {
            const berryStringToArray = berry.url.split("/");
            const berryID = berryStringToArray[berryStringToArray.length - 2];
            return (
              <Card
                key={berryID}
                name={berry.name}
                url={`/berries/${berryID}`}
              />
            );
          })}
          <Pagination
            page={page}
            prevButtonTapped={this.prevButtonTapped}
            numberOfPages={numberOfPages}
            nextButtonTapped={this.nextButtonTapped}
          />
        </div>
      );
    }
  }
}

export default Berries;
