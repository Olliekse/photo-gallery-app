import { HTTPMethod } from 'lib/shared/types/HTTPMethod';

export const withHTTPMethodRequired = (method: HTTPMethod) => (handler) => {
  return async (req, res) => {
    if (req.method !== method) {
      console.log(
        `HTTP method ${method} is required for this endpoint, received ${req.method} instead`
      );
      return res.status(400).end();
    }
    return handler(req, res);
  };
};

export default withHTTPMethodRequired;
