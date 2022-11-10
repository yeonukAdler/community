import { atomWithStorage } from 'jotai/utils';
import { Token, Account } from 'apis/types';
import { atom, Getter } from 'jotai';
import { getTokenUser, getRecentPost, getPosts } from 'apis/index';

// 함수 이해 필요
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

export let tokenAtom = atomWithStorage<Token | undefined>('token', '');

export let userAtom = atomWithRefresh(async (get) => {
  let token = get(tokenAtom);
  if (!token) {
    return null;
  }
  let user = await getTokenUser(token);
  return user;
});

export let getRecentPostAtom = atomWithRefresh(async () => {
  let recentPost = await getRecentPost();
  return recentPost;
});

export let getPostsAtom = atomWithRefresh(async () => {
  let posts = await getPosts();
  return posts;
});
