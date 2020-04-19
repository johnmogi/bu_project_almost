import React, { Component } from "react";

export class NotFound extends Component {
  public render() {
    return (
      <div className="404">
        <p>You have arrived at an unknown location</p>
        <iframe
          width="100%"
          height="655"
          title="404"
          src="https://www.youtube.com/embed/PeRCDH_zUnU?start=12"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    );
  }
}
