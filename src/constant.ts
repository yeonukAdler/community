export const Path = {
  home: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
} as const;

type PathType = keyof typeof Path;

type HeaderPathType = Omit<PathType, 'home'>;
