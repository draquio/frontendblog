import React, { useState, useEffect } from "react";
import "./ListPost.scss";
import { Post } from "../../../../api";
import { PostItem } from "../PostItem";
import { Loader, Pagination } from "semantic-ui-react";
import { map, size } from "lodash";

export function ListPost(props) {
  
  const { reload, onReload } = props;
  const [post, setPost] = useState();
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        let postController = new Post();
        const response = await postController.getPost(page, 10);
        setPost(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page,reload,pagination]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };
  if (!post) return <Loader active className="loader-size" inline="centered" />;
  if (size(post) === 0) return "No hay ningún Post";
  return (
    <div className="list-post">
      {map(post, (post) => (
        <PostItem key={post._id} post={post} onReload={onReload} />
      ))}
      <div className="list-post__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
