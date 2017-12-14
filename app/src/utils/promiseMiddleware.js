/* eslint-disable */
export function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action;
    if (!promise) return next(action);
    const REQUEST = type + '_REQUEST';
    const SUCCESS = type + '_SUCCESS';
    const FAILURE = type + '_FAILURE';
    next({ ...rest, type: REQUEST });
    return promise
      .then(req => {
        next({ ...rest, req, type: SUCCESS, status: { success: true, failed: false } });
        return Promise.resolve(...rest, req);
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE, status: { success: false, failed: true } });
        return Promise.reject(error);
      })
  };
}
/* eslint-enable */
