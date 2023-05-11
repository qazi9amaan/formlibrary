import { useContext } from 'react';
import { ILoader, LoaderContext } from '../contexts/Loader/Context';

/**
 *  Hook to get the Loader context
 * @returns {ILoader} Loader context
 */
export const useLoader = (): ILoader => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context as ILoader;
};
