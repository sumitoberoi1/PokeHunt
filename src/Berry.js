import React from "react";
import { getBerryWithID } from "./network";
import Page404 from "./404";
import Media from "./Media";
class Berry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(props.id),
      berryData: {},
      isLoading: true,
      error: false
    };
  }
  async componentDidMount() {
    const { id } = this.state;
    if (id && !isNaN(id)) {
      const berryData = await getBerryWithID(id);
      if (!berryData) {
        this.setState({ isLoading: false, error: "Berry not found" });
      }
      if (berryData.error) {
        this.setState({ isLoading: false, error: berryData.error });
      } else {
        this.setState({
          isLoading: false,
          berryData: berryData,
          error: false
        });
      }
    } else {
      this.setState({
        isLoading: false,
        error: "Invalid input"
      });
    }
  }
  render() {
    const { isLoading, id, berryData, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    } else {
      if (!id || isNaN(id)) {
        return <Page404 />;
      }
      if (error) {
        return <Page404 />;
      } else {
        if (berryData) {
          return <Media data={berryData} />;
        } else {
          return <Page404 />;
        }
      }
    }
  }
}
export default Berry;
