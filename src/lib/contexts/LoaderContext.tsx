import { createContext, useState } from 'react';
import { Loader } from '@lib/components/atoms/Loader';

export interface ILoader {
  show: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

interface LoaderProviderProps {
  children: React.ReactNode;
}

export const LoaderContext = createContext<ILoader | null>(null);

/**
 * @description LoaderProvider
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * @example
 * import { LoaderProvider } from '@lib/contexts/LoaderContext';
 *
 * const App = () => {
 *  return (
 *   <LoaderProvider>
 *   <App />
 *  </LoaderProvider>
 */
export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [show, setShow] = useState(false);

  const showLoader = () => setShow(true);
  const hideLoader = () => setShow(false);

  return (
    <LoaderContext.Provider value={{ show, showLoader, hideLoader }}>
      {/* adding Loader */}
      <Loader show={show} />
      {/* Other children */}
      {children}
    </LoaderContext.Provider>
  );
};
