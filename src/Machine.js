import React from "react";
import { getMachineWithID } from "./network";
import Page404 from "./404";
import Media from "./Media";
class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(props.id),
      machineDara: {},
      isLoading: true,
      error: false
    };
  }
  async componentDidMount() {
    const { id } = this.state;
    if (id && !isNaN(id)) {
      const machineData = await getMachineWithID(id);
      if (!machineData) {
        this.setState({ isLoading: false, error: "machine not found" });
      }
      if (machineData.error) {
        this.setState({ isLoading: false, error: machineData.error });
      } else {
        this.setState({
          isLoading: false,
          machineData: machineData,
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
    const { isLoading, id, machineData, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    } else {
      if (!id || isNaN(id)) {
        return <Page404 />;
      }
      if (error) {
        return <Page404 />;
      } else {
        if (machineData) {
          return <Media data={machineData} />;
        } else {
          return <Page404 />;
        }
      }
    }
  }
}
export default Machine;
