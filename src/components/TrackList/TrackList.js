import React from "react";
 
import "./TrackList.css";
 
import Track from "../Track/Track";
 
class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.shows.map(show => {
          return (
            <Track
              show={show}
            />
          );
        })}
      </div>
    );
  }
}
 
export default TrackList;