import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import UserForm from './UserForm';
import { closeEditModal } from '../redux/uiSlice';

export default function EditModalRoot(){
  const user = useSelector(s => s.ui.editUser);
  const open = useSelector(s => s.ui.editModalOpen);
  const dispatch = useDispatch();

  if (!open || !user) return null;

  return (
    <Modal onClose={() => dispatch(closeEditModal())}>
      <UserForm initialData={user} onClose={() => dispatch(closeEditModal())} />
    </Modal>
  );
}
