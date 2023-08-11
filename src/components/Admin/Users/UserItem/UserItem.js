import React, { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import "./UserItem.scss";
import { ENV } from "../../../../utils";
import { UserForm } from "../UserForm";
import { BasicModal } from "../../../Shared";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function UserItem(props) {
  // Variables
  const { accessToken } = useAuth();
  const { user, onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  // Funciones
  // Abrir modal edit usuario
  const openUpdateUser = () => {
    setTitleModal(`Actualizar - ${user.username}`);
    onOpenCloseModal();
  };

  // Abrir menu activar desactivar
  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Desactivar usuario: ${user.username}`
        : `Activar usuario: ${user.username}`
    );
    onOpenCloseConfirm();
  };

  // Activar Desactivar Usuarios
  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  // Modal de Eliminar usuario
  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar usuario: ${user.username}`);
    onOpenCloseConfirm();
  };

  //Eliminar Usuario
  const onDelete = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onOpenCloseConfirm();
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noavatar
            }
          />
          <div>
            <p>{user.username}</p>
            <p>
              {user.firstname} {user.lastname}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <Button icon primary onClick={openUpdateUser}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={openDesactivateActivateConfirm}
          >
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <BasicModal close={onOpenCloseModal} title={titleModal} show={showModal}>
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
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
