import { atomWithStorage } from 'jotai/utils';
import { Token } from 'apis/user/types';
import { atom, Getter } from 'jotai';
import { getTokenUser } from 'apis/user/index';

/*
  TODO:
  
  함수의 이해 필요
*/
function atomWithRefresh<T>(fn: (get: Getter) => T) {
  const refreshCounter = atom(0);
  return atom(
    (get) => {
      get(refreshCounter);
      return fn(get);
    },
    (_, set) => set(refreshCounter, (i) => i + 1)
  );
}

export const tokenAtom = atomWithStorage<Token | undefined>('token', '');

export const userAtom = atomWithRefresh(async (get) => {
  const token = get(tokenAtom);
  if (!token) {
    return null;
  }
  const user = await getTokenUser(token);
  return user;
});
