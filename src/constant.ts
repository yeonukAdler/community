// 추후 변경할 것
export const Path = {
  home: '/',
  signUp: '/signup',
  logIn: '/login',
} as const;

// type PathType = keyof typeof Path;

// type HeaderPathType = Omit<PathType, 'home'>;
