import { snapshot_UNSTABLE } from 'recoil'

import { errorMessageState } from './index'

describe('[Data] admin info', () => {
  test('set errorMessageState', () => {
    const initialSnapshot = snapshot_UNSTABLE()
    expect(initialSnapshot.getLoadable(errorMessageState).valueOrThrow()).toBe(
      undefined,
    )

    let testSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(errorMessageState, 'This is an error message'),
    )
    expect(testSnapshot.getLoadable(errorMessageState).valueOrThrow()).toBe(
      'This is an error message',
    )

    testSnapshot = snapshot_UNSTABLE(({ set }) =>
      set(errorMessageState, undefined),
    )
    expect(testSnapshot.getLoadable(errorMessageState).valueOrThrow()).toBe(
      undefined,
    )
  })
})
