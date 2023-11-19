import React from 'react';

const useDisableAfter = (ms = 2000) => {
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (disabled) {
      timer = setTimeout(() => setDisabled(false), ms);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [disabled, ms]);

  return { disabled, setDisabled };
};

export { useDisableAfter };
