export const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
