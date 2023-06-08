import React from 'react';
import { FaTimes } from 'react-icons/fa';

export interface IModalOptions {
  large?: boolean;
  title?: string;

  hideHeader?: boolean;
  hideFooter?: boolean;

  body?: string | JSX.Element;

  hideCancel?: boolean;
  cancelText?: string;
  actionCancel?: () => void;

  hideConfirm?: boolean;
  confirmText?: string;
  actionConfirm?: () => void;

  hideBorder?: boolean;
  noSpacing?: boolean;
  showFullPage?: boolean;
}

export type IModalProps = {
  options?: IModalOptions;
  dailogRef?: React.RefObject<HTMLDialogElement>;
  resetDefault?: () => void;
};
export const Modal: React.FC<IModalProps> = (props) => {
  //
  const ref = React.useRef<HTMLDialogElement>(null);
  const { options = {}, dailogRef = ref, resetDefault = () => null } = props;

  const {
    large,
    title,
    hideHeader,
    hideFooter,
    body,
    hideCancel,
    cancelText,
    actionCancel,
    hideConfirm,
    confirmText,
    actionConfirm,
    hideBorder,
    noSpacing,
    showFullPage = false,
  } = options;

  const handleClose = () => {
    closeModal();
    actionCancel?.();
  };

  const handleConfirm = () => {
    closeModal();
    actionConfirm?.();
  };

  const closeModal = () => {
    if (!dailogRef?.current?.open) return;
    dailogRef?.current?.close();
  };

  return (
    <dialog
      onClose={resetDefault}
      ref={dailogRef}
      className={`dailog-modal  ${large && 'dailog-modal--large'} ${
        noSpacing && 'dailog-modal--nospacing'
      }`}
    >
      {!hideHeader && (
        <header className='dailog-modal--header '>
          <h2 className='dailog-modal--title '>{title}</h2>
          <FaTimes onClick={closeModal} className='dailog-modal--icon ' />
        </header>
      )}

      <main
        className={`dailog-modal--body overflow-auto ${
          showFullPage && 'dailog-modal--body--full-page'
        }`}
      >
        {body}
      </main>
      {!hideFooter && (
        <footer className={`dailog-modal--footer ${hideBorder && ' !border-0'}`}>
          {!hideCancel && (
            <button className='dailog-modal--cancel ' onClick={handleClose}>
              {cancelText}
            </button>
          )}
          {!hideConfirm && (
            <button className='dailog-modal--cta ' onClick={handleConfirm}>
              {confirmText}
            </button>
          )}
        </footer>
      )}
    </dialog>
  );
};
