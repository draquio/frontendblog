import React from "react";
import "./ListPostItem.scss";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ENV } from "../../../../utils";
export function ListPostItem(props) {
  const { post } = props;
  const date = new Date(post.create_at);
  return (
    <Link className="list-post-item" to={`/blog/${post.path}`}>
      <Image src={`${ENV.BASE_PATH}/${post.miniature}`} fluid />
      <span className="date-post">
        {DateTime.fromISO(date.toISOString())
          .setLocale("es")
          .toFormat("dd 'de' LLLL 'del' yyyy")}
      </span>
      <h2>{post.title}</h2>
    </Link>
  );
}
