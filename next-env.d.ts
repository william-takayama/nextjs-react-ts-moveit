/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'clsx' {
  const cn: (
    ...args: (string | undefined | Record<string, boolean | undefined>)[]
  ) => string;
  export default cn;
}
