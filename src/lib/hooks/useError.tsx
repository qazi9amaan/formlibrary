import { Alert } from '@lib/components/atoms/Alert';
import { useCallback, useEffect, useState } from 'react';

export type useError = {
  showError: (error: string | Error) => void;

  isVisible: boolean;
  errorMsg: string;
  AlertBox: () => JSX.Element;
};

export const useError = (): useError => {
  const [errorMsg, setErrorMsg] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const showError = (error: string | Error) => {
    const message = typeof error === 'string' ? error : error?.message;
    setErrorMsg(message);
    setIsVisible(true);
  };

  useEffect(() => {
    //
    let timer: NodeJS.Timeout;
    const hide = () => setIsVisible(false);

    if (isVisible) timer = setTimeout(hide, 6000);
    return () => timer && clearTimeout(timer);
  }, [isVisible]);

  const AlertComponent = () => <Alert message={errorMsg} show={isVisible} />;
  const AlertBox = useCallback(AlertComponent, [errorMsg, isVisible]);

  return { isVisible, errorMsg, showError, AlertBox };
};
