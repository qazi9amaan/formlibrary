type IClassName = (string | number | boolean | Record<string, boolean>)[];

/**
 * Concatenates class names into a space-separated string.
 *
 * @param {...(string|number|boolean|Record<string, boolean>)} args - The class names to concatenate.
 * @returns {string} The concatenated class names.
 *
 * @example
 * cn('foo', 'bar', 'baz'); // => 'foo bar baz'
 *
 * @example
 * cn('foo', 42, true, false); // => 'foo 42 true'
 *
 * @example
 * cn('foo', { 'bar': true, 'baz': false }, 'qux'); // => 'foo bar qux'
 */
export const cn = (...args: IClassName) => {
  return args
    .map((arg) => {
      if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      } else {
        return String(arg);
      }
    })
    .filter(Boolean)
    .join(' ');
};
