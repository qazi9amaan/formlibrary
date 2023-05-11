import { useContext } from 'react';
import { IModal, ModalContext } from '../contexts/Modal/Context';

/**
 *  Hook to get the Modal context
 * @returns {ILoader} Modal context
 */
export const useModal = (): IModal => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context as IModal;
};
