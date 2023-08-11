import React from "react";
import "./AdminLayout.scss";
import { AdminMenu, Logout } from "../../components/Admin/AdminLayout";
import { Link } from "react-router-dom";

export function AdminLayout(props) {
  const { children } = props;
  return (
    <div className="admin-layout">
      <div className="admin-layout__left">
      <Link to="/">
        <p as={Link} to="/" className="logo">Draquio</p>
        </Link>
        <AdminMenu />
      </div>
      <div className="admin-layout__right">
        <div className="admin-layout__right-header">
          <Logout />
        </div>
        <div className="admin-layout__right-content">{children}</div>
      </div>
    </div>
  );
}
