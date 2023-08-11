import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import "./MenuItem.scss";
import { BasicModal } from "../../../Shared";
import { MenuForm } from "../MenuForm";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuItem(props) {
  const { menu, onReload } = props;
  const { accessToken } = useAuth();

  const [titleModal, setTitleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      menu.active
        ? `Desactivar menu: ${menu.title}`
        : `Activar menu: ${menu.title};`
    );
    onOpenCloseConfirm();
  };

  const openUpdateMenu = () => {
    setTitleModal(`Actualizar menú: ${menu.title}`);
    onOpenCloseModal();
  };

  const onActivateDesactivate = async () => {
    try {
      await menuController.updateMenu(accessToken, menu._id, {
        active: !menu.active,
      });
      onOpenCloseConfirm();
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar menú: ${menu.title}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await menuController.deleteMenu(accessToken, menu._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <div>
            <p>{menu.title}</p>
            <p>{menu.path}</p>
          </div>
        </div>
        <div>
          <Button icon primary onClick={openUpdateMenu}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={menu.active ? "orange" : "teal"}
            onClick={openDesactivateActivateConfirm}
          >
            <Icon name={menu.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <BasicModal close={onOpenCloseModal} title={titleModal} show={showModal}>
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} menu={menu} />
      </BasicModal>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
