
import { useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Abre el modal y opcionalmente recibe datos (para editar)
  const openModal = (data = null) => {
    setModalData(data);
    setIsOpen(true);
  };

  // Cierra el modal y limpia los datos
  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
  };
}