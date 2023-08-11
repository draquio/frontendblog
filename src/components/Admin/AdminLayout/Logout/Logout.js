import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";

export function Logout() {
  const { logout } = useAuth();
  const navegate = useNavigate();
  const onLogout = () => {
    logout();
    navegate("/admin");
  };

  return (
    <Button icon onClick={onLogout}>
      <Icon name="power off" /> Cerrar sesión
    </Button>
  );
}
