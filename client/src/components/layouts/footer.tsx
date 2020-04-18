import React, { Component } from "react";
import "./footer.css";
interface yearState {
  year: number;
}
export class Footer extends Component<any, yearState> {
  public constructor(props: any) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    };
  }

  public render() {
    return (
      <div className="footer">
        <p className="text-center mt-4 mb-4">
          All rights reserved &copy;
          <a
            href="https://johnmogi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            JohnMogi.com &nbsp;
          </a>
          {this.state.year}
        </p>

        <br />
        <div className="justify-content-center">
          <h6>Credits:</h6>
          <ul>
            <li> Photo by VisionPic .net from Pexels</li>
            <li>
              <a
                href="https://www.freepik.com/free-photos-vectors/logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Logo vector created by freepik - www.freepik.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
