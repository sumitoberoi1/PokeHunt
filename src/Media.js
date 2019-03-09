import React from "react";

const Media = props => {
  const { data } = props;
  return (
    <div className="media container">
      {data.image && (
        <img
          className="d-flex mr-3"
          src={data.image}
          alt="Generic placeholder image"
        />
      )}
      <div className="media-body">
        {data["name"] && <h2 className="text-capitalize">{data["name"]}</h2>}
        <ul className="list-group">
          {Object.keys(data).map(key => {
            if (key === "name" || key === "image") {
              return;
            }
            return (
              <li className="list-group-item" key={key}>
                <span className="font-weight-bold">{key}</span>: {data[key]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Media;
