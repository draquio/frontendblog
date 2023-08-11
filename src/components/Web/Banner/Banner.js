import React from "react";
import "./Banner.scss";
import { Container } from "semantic-ui-react";

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>Conoce recursos web para webmasters</h1>
        <br />
        <h2>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip
        </h2>
      </Container>
      <div className="banner__dark"></div>
    </div>
  );
}
