import React, { useState, useEffect } from "react";
import "./TopBar.scss";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Menu } from "../../../api";
import { socialData } from "../../../utils";

export function TopBar() {
  const [menu, setMenu] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        let menuController = new Menu();
        const response = await menuController.getMenus(true);
        setMenu(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            <p className="logo-title">Blog</p>
          </Link>
          <div className="menu">
            {map(menu, (item) => (
              <a key={item._id} href={item.path}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          {map(socialData, (social) => (
            <Button key={social.type} as="a" target="_blank" href={social.link} color={social.type} icon={social.type} />
          ))}
        </div>
      </Container>
    </div>
  );
}
