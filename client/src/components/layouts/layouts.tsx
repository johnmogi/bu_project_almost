import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./main";
import { Footer } from "./footer";
import { Header } from "./header";
import { ToastContainer, toast } from "react-toastify";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export class Layouts extends Component {
  notify = () => toast("Wow so easy !");

  public render() {
    return (
      <Container fluid className="layout bgfull">
        <BrowserRouter>
          <header>
            <Header />
          </header>
          <Main />

          <Card bg="dark">
            <Footer />
          </Card>
          <ToastContainer pauseOnFocusLoss={false} />
        </BrowserRouter>
      </Container>
    );
  }
}
