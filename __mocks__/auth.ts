export const nextAuthResult = {
  handlers: {
    GET: async () => {},
    POST: async () => {},
  },
  auth: {},
  signIn: async () => {},
  signOut: async () => {},
};

type NextAuthResultKey = keyof typeof nextAuthResult;

export function __setNextAuthResult<T extends NextAuthResultKey>(
  key: T,
  callback: (prev: (typeof nextAuthResult)[T]) => (typeof nextAuthResult)[T],
) {
  console.log("executed");
  nextAuthResult[key] = callback(nextAuthResult[key]);
}

export class AuthError {
  type: string;

  constructor(type: string) {
    this.type = type;
  }
}
