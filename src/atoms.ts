import { atomWithStorage } from 'jotai/utils';
import { Token, Account } from 'apis/types';

export let tokenAtom = atomWithStorage<Token | undefined>('token', '');
// export let userAtom = atomWithRefresh<Promise<Account | null>>(async (get) => {
//   let token = get(tokenAtom);
//   if (!token) {
//     return null;
//   }
//   let user = await getTokenUser(token);
//   return user;
// });
