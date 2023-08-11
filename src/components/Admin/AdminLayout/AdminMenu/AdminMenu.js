import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./AdminMenu.scss";
import { useAuth } from "../../../../hooks";

export function AdminMenu() {
  const { pathname } = useLocation();

  // Permisos
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role === "admin";

  // Selector
  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };
  return (
    <Menu fluid vertical icon text className="admin-menu">
      { isAdmin && (
        <>
      <Menu.Item className="menu_item" as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
        <Icon name="user outline" />
        <span>Usuario</span>
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
        <Icon name="bars" />
        <span>Menu</span>
      </Menu.Item>

      <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}>
        <Icon name="mail" />
        <span>Newsletter</span>
      </Menu.Item>
      </>
      )}
      <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
        <Icon name="comment alternate outline" />
        <span>Blog</span>
      </Menu.Item>
    </Menu>
  );
}
