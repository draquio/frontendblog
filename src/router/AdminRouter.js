import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Users, Blog, Newsletter, Menu } from "../pages/admin";
import { AdminLayout } from "../layouts";
import { useAuth } from "../hooks";
import { ProtectedRoute } from "../contexts/ProtectedRoute";


export function AdminRouter() {
  const { user } = useAuth();
  // const { role } = user;
  const loadLayaout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      {!user ? (
        <Route path="/admin/*" element={<Auth />} />
      ) : (
        <>
          {["/admin", "/admin/blog"].map((path) => (
            <Route element={<ProtectedRoute role={user.role} />}>
            <Route
              key={path}
              path={path}
              element={loadLayaout(AdminLayout, Blog)}
            />
            </Route>
          ))}
          <Route element={<ProtectedRoute role={user.role} />}>
            <Route path="/admin/users*" element={loadLayaout(AdminLayout, Users)} />
            <Route path="/admin/menu*" element={loadLayaout(AdminLayout, Menu)} />
            <Route path="/admin/newsletter*" element={loadLayaout(AdminLayout, Newsletter)} />
          </Route>
        </>
      )}
    </Routes>
  );
}
