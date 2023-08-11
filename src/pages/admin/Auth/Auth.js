import React, { useState } from 'react';
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Tab } from "semantic-ui-react";

export function Auth() {
  const [activeIndex, setactiveIndex] = useState(0);
  const openLogin = () => setactiveIndex(0);
  const panes = [
    { menuItem: "Login", render: () => <Tab.Pane><LoginForm /></Tab.Pane> },
    { menuItem: "Registro", render: () => <Tab.Pane><RegisterForm openLogin={openLogin} /></Tab.Pane> },
  ];
  return (
    <div className='auth'>
      <span className='logo_login'>Draquio</span>
      <Tab panes={panes} className="auth__forms" activeIndex={activeIndex} onTabChange={(_, data) => setactiveIndex(data.activeIndex)} />
    </div>
  )
}

