import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Contact, Blog, Post } from "../pages/web";
import { ClientLayout } from "../layouts"

export function WebRouter() {
  const loadLayaout = (Layout , Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayaout(ClientLayout, Home)} />
      <Route path="/contact" element={loadLayaout(ClientLayout, Contact)} />
      <Route path="/blog" element={loadLayaout(ClientLayout, Blog)} />
      <Route path="/blog/:path" element={loadLayaout(ClientLayout, Post)} />
    </Routes>
  );
}
