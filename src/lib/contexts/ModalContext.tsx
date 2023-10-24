import { IModalOptions, Modal } from '@lib/components/atoms/Modal';
import React, { createContext, useState, useCallback } from 'react';

export interface IModal {
  closeModal: () => void;
  openModal: (options?: IModalOptions) => void;
  openDeleteModal: (callback?: () => void, options?: IModalOptions) => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<IModal | null>(null);

/**
 * @description ModalProvider
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * @example
 * import { ModalProvider } from '@lib/contexts/ModalContext';
 *
 * const App = () => {
 *  return (
 *   <ModalProvider>
 *   <App />
 *  </ModalProvider>
 */
const defaultOptions: IModalOptions = {
  large: false,
  title: '',
  hideHeader: false,
  hideFooter: false,
  body: '',
  hideCancel: false,
  cancelText: 'Cancel',
  actionCancel: () => null,
  hideConfirm: false,
  confirmText: 'Ok',
  actionConfirm: () => null,
  hideBorder: true,
};

const deleteOptions = {
  body: 'Are you sure you want to delete this item?. This action cannot be undone.',
  title: 'Deleting ...',
  confirmText: 'Delete',
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  //

  const [options, setOptions] = useState<IModalOptions>(defaultOptions);
  const dailogRef = React.useRef<HTMLDialogElement>(null);

  const resetDefault = useCallback(() => setOptions(defaultOptions), []);

  const closeModal = useCallback(() => {
    if (!dailogRef?.current?.open) return;
    dailogRef?.current?.close();
  }, [dailogRef]);

  const openModal = useCallback(
    (options?: IModalOptions) => {
      options && setOptions((prev) => ({ ...prev, ...options }));
      if (dailogRef?.current?.open) return;
      dailogRef?.current?.showModal();
    },
    [dailogRef],
  );
  /**
   * This function is used to open delete modal
   * @param {() => void} cb - callback function
   * @param _options - options for modal
   */
  const openDeleteModal = useCallback(
    (cb?: () => void, _options?: IModalOptions) => {
      openModal({ ...deleteOptions, ..._options, actionConfirm: cb || (() => null) });
    },
    [openModal],
  );

  return (
    <ModalContext.Provider value={{ openDeleteModal, openModal, closeModal }}>
      {/* adding Modal */}
      <Modal dailogRef={dailogRef} options={options} resetDefault={resetDefault} />
      {/* Other children */}
      {children}
    </ModalContext.Provider>
  );
};
