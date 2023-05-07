import { useModal } from '@lib/contexts/Modal';
import { Button } from '../index';

export const App = () => {
  const { openDeleteModal } = useModal();
  return (
    <>
      <Button onClick={() => openDeleteModal()}>Open Modal</Button>
    </>
  );
};
