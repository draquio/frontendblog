import React, { useState, useEffect } from "react";
import "./ListPost.scss";
import { Post } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { ListPostItem } from "../ListPostItem";
import { useNavigate, useSearchParams } from "react-router-dom";

export function ListPost() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);
  useEffect(() => {
    (async () => {
      try {
        let postController = new Post();
        const response = await postController.getPost(page, 6);
        setPosts(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.pages,
          total: response.total,
        });
        window.scrollTo(0, 0)
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const changePage = (_, data) => {
    const newPage = data.activePage;
    setPage(newPage);
    navigate(`?page=${newPage}`)
  };

  if (!posts) return <Loader className="loader-size" active inline="centered" />;

  return (
    <div className="list-post-web">
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <ListPostItem post={post} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
