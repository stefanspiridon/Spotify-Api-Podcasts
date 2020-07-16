import React from "react";
 
import "./Show.css";
 
class Show extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div className="Show">
        <div className="Show-information">
          <h3>{this.props.show.name}</h3>
            <p>
              {this.props.show.description}
            </p>
        </div>
      </div>
    );
  }
}
 
export default Show;
