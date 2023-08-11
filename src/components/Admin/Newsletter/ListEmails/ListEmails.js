import React, { useState, useEffect } from "react";
import { Newsletter } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { Loader, Pagination } from "semantic-ui-react";
import { EmailItem } from "../EmailItem";
import { map, size } from "lodash";
import "./ListEmais.scss";

export function ListEmails() {
  
  const { accessToken } = useAuth();
  const [pagination, setPagination] = useState(null);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  const [emails, setEmails] = useState(null);
  const onReload = () => setReload((prevState) => !prevState)
  useEffect(() => {
    (async () => {
      try {
        let newsletterController = new Newsletter();
        const response = await newsletterController.getEmails(accessToken, page);
        setEmails(response.docs);
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
  }, [accessToken, page, reload]);
  const changePage = (_, data) => {
    setPage(data.activePage);
  }

  if (!emails) return <Loader active className="loader-size" inline="centered" />;
  if (size(emails) === 0) return "no hay emails registrados";

  return (
    <div className="list-emails">
      {map(emails, (email) => (
        <EmailItem key={email._id} email={email} onReload={onReload} />
      ))}
      <div className="list-emails__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={false}
          firstItem={false}
          lastItem={false}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
