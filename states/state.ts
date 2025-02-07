import { UserData } from '@/types/UserData';
import { atom } from 'jotai';

export const rootState = atom('');

export const fileState = atom('');

export const fileTextState = atom('');

export const createFileState = atom('');

export const createFolderState = atom('');

export const newCompPathState = atom('');

export const loadingState = atom(false);

export const userDataState = atom<UserData | null>(null);