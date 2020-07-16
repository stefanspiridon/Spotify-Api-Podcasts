import React from "react";
 
import "./Track.css";
 
class Track extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.show.name}</h3>
            <p>
              {this.props.show.description}
            </p>
        </div>
      </div>
    );
  }
}
 
export default Track;
