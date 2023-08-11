import React from "react";
import "./Info.scss";
import { Button } from "semantic-ui-react";
import { map } from "lodash";
import { socialData } from "../../../../utils";

export function Info() {
  return (
    <div className="footer-block">
      <span className="footer-block__NameBlog">MERN stack Blog</span>
      <p>Blog hecho con MongoDB, ExpressJS, ReactJS y NodeJS (MERN stack)</p>
    </div>

  );
}
