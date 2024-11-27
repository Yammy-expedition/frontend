declare module 'js-cookie' {
  const Cookies: {
    get: (key: string) => string | undefined;
    set: (
      key: string,
      value: string,
      options?: {
        expires?: number | Date;
        secure?: boolean;
        path?: string;
        sameSite?: 'Strict' | 'Lax' | 'None';
      }
    ) => void;
    remove: (key: string, options?: { path?: string }) => void;
  };
  export default Cookies;
}
