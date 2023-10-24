import debounce from 'lodash.debounce';

const avoidMultipleClick = (callback: () => void, delay = 300) => {
  return debounce(callback, delay, {
    leading: true,
    trailing: false,
  });
};

export default avoidMultipleClick;
