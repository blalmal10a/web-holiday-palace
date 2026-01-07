import { serialize } from "object-to-formdata";

type ApiResponse<T> = Promise<T>;

interface SanctumRequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any;
}

async function sanctumRequest<T = any>(
  path: string,
  data: any = {},
  options: SanctumRequestOptions = {},
  method: string
): ApiResponse<T> {
  const sanctumClient = useSanctumClient();

  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  path = `api/${path}`;

  const body = serialize(data, {
    indices: true,
    allowEmptyArrays: true,
    booleansAsIntegers: true
  });

  const res = await sanctumClient<T>(path, {
    body,
    ...options,
    method,
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    }
  } as any);

  return res;
}

const api = {
  request: async <T = any>(
    path: string,
    options: SanctumRequestOptions = {},
    method: string = 'GET',
  ): ApiResponse<T> => {

    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    path = `api/${path}`;
    const sanctumClient = useSanctumClient();

    return await sanctumClient<T>(path, {
      method,
      ...options
    } as any);
  },
  get: async <T = any>(
    path: string,
    options: SanctumRequestOptions = {}
  ): ApiResponse<T> => {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    path = `api/${path}`;
    const sanctumClient = useSanctumClient();

    return await sanctumClient<T>(path, {
      method: 'GET',
      ...options
    } as any);
  },

  post: <T = any>(
    path: string,
    data: any = {},
    options: SanctumRequestOptions = {}
  ): ApiResponse<T> =>
    sanctumRequest<T>(path, data, options, 'POST'),

  patch: <T = any>(
    path: string,
    data: any = {},
    options: SanctumRequestOptions = {}
  ): ApiResponse<T> =>
    sanctumRequest<T>(path, data, options, 'PATCH'),

  put: <T = any>(
    path: string,
    data: any = {},
    options: SanctumRequestOptions = {}
  ): ApiResponse<T> =>
    sanctumRequest<T>(path, data, options, 'PUT'),

  delete: <T = any>(
    path: string,
    data: any = {},
    options: SanctumRequestOptions = {}
  ): ApiResponse<T> =>
    sanctumRequest<T>(path, data, options, 'DELETE'),
};

export default api;
