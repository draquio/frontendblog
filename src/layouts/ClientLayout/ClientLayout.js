import React from "react";
import { Container } from "semantic-ui-react";
import "./ClientLayout.scss";
import { TopBar, Footer } from "../../components/Web";


export function ClientLayout(props) {
  const { children } = props;
  return (
    <div className="client-layout">
      <div className="client-layout__header">
        <TopBar />
      </div>
      <div className="container_blog">
      {children}
      </div>
      <div className="client-layout__footer">
        <Container className="footer_content">
          <Footer.Info />
          <Footer.Newsletter />
        </Container>
        <Container className="text-centered copyright-text">
          <span>© Sergio Mercado (Draquio) | Fullstack Developer</span>
        </Container>
      </div>
    </div>
  );
}
