import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { useAuth } from "../../../../hooks";
import { Menu } from "../../../../api"
import { MenuItem } from "../MenuItem"


const menuController = new Menu();
export function ListMenu(props) {
  const { menusActive, reload, onReload } = props;
  const [menus, setMenus] = useState(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const response = await menuController.getMenus(menusActive);
        setMenus(response);
      } catch (error) {
        
      }
    })()
  }, [menusActive, reload, accessToken])

  if (!menus) return <Loader active  className="loader-size" inline="centered" />;
  if (size(menus) === 0) return "No hay ningún menú";
  return map(menus, (menu) => <MenuItem key={menu._id} menu={menu} onReload={onReload} />)
}
