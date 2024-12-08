export type IConvertOptions = {
  isString?: boolean;
  isNumber?: boolean;
  isBoolean?: boolean;
  isObject?: boolean;
  isArray?: boolean;
  isFunction?: boolean;
  isNull?: boolean;
  isUndefined?: boolean;
  skipFormik?: boolean;
};

const valueConverter = (value: any, options?: IConvertOptions) => {
  if (!options) return value;
  const { isString, isNumber, isBoolean, isObject, isArray, isFunction, isNull, isUndefined } =
    options;
  if (isString) return String(value);
  if (isNumber) return Number(value);
  if (isBoolean) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return Boolean(value);
  }
  if (isObject) return Object(value);
  if (isArray) return Array(value);
  if (isFunction) return Function(value);
  if (isNull) return null;
  if (isUndefined) return undefined;
  return value;
};

export default valueConverter;
