import React from "react";
import { Link } from "@reach/router";

const Card = props => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        {props.name && (
          <h2 className="card-title text-capitalize">{props.name}</h2>
        )}
        <Link to={props.url}>{props.name ? `More info` : props.url}</Link>
      </div>
    </div>
  );
};

export default Card;
