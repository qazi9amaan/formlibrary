// eslint-disable-next-line no-undef
module.exports = {
  '*.{js,jsx,ts,tsx}': ['yarn lint:fix', 'git add'],
  '*.{js,jsx,ts,tsx,json,md}': ['yarn format', 'git add'],
};
