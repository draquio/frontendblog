import React, { useState } from "react";
import "./PostInten.scss";
import { Button, Confirm, Icon /*Confirm*/ } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BasicModal } from "../../../Shared";
import { PostForm } from "../PostForm";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";

export function PostItem(props) {
  const { post, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const onOpenShowModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);
  const { accessToken } = useAuth();

  const onDelete = async () => {
    try {
      let postController = new Post();
      await postController.deletePost(accessToken, post._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{post.title}</span>
          {/* <span className="post-item__info-path">{post.path}</span> */}
          <span className="post-item__info-create_at">
            Fecha: {post.create_at}
          </span>
        </div>
        <div>
          <Button as={Link} icon to={`/blog/${post.path}`} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={onOpenShowModal}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <BasicModal
        show={showModal}
        close={onOpenShowModal}
        title={`Editar post: ${post.title}`}
        size="large"
      >
        <PostForm close={onOpenShowModal} onReload={onReload} post={post} />
      </BasicModal>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Eliminar ${post.title}?`}
        size="mini"
      />
    </>
  );
}
