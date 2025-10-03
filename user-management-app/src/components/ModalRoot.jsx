import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import UserForm from "./UserForm";
import { closeAddModal } from "../redux/uiSlice";

export default function ModalRoot(){
  const open = useSelector(s => s.ui.addModalOpen);
  const dispatch = useDispatch();

  if (!open) return null;

  return (
    <Modal onClose={() => dispatch(closeAddModal())}>
      <UserForm onClose={() => dispatch(closeAddModal())} />
    </Modal>
  );
}
