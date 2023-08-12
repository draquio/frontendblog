import React, { useState, useEffect } from "react";
import "./Post.scss";
import { Post as PostController } from "../../../api";
import { useParams } from "react-router-dom";
import { Container, Loader, Image } from "semantic-ui-react";
import { ENV } from "../../../utils";
import { DateTime } from "luxon";

export function Post() {
  const [post, setPost] = useState(null);
  const { path } = useParams();
  useEffect(() => {
    (async () => {
      try {
        let postController = new PostController();
        const response = await postController.insidePost(path);
        const date = new Date(response.create_at);
        const newdate = DateTime.fromISO(date.toISOString())
          .setLocale("es")
          .toFormat("LLLL dd, yyyy");
          response.create_at = newdate;
        setPost(response);
        window.scrollTo(0, 0)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [path]);

  if (!post) return <Loader className="loader-size" active inline="centered" />;

  return (
    <Container className="post">
      <h1 className="title">{post.title}</h1>
      <p className="date-post">{post.create_at} por Draquio</p>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Image
        centered
        rounded
        size="big"
        src={`${ENV.BASE_PATH}/${post.miniature}`}
        alt={post.title}
      />
    </Container>
  );
}
