import { atom } from 'recoil'

export const errorMessageState = atom<string | undefined>({
  key: 'ERROR_MESSAGE_STATE',
  default: undefined,
})
