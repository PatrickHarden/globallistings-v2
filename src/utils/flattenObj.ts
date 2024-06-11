const flattenObject = (obj: object): object => {
  return Object.keys(obj).reduce((prev, key) => {
    const value = obj[key];
    if (typeof value === 'object' && !Array.isArray(value)) {
      return { ...prev, ...flattenObject(value) };
    }

    return { ...prev, ...{ [key]: value } };
  }, {});
};

export default flattenObject;
