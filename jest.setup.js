// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { matchers, createSerializer } from '@emotion/jest'
expect.extend(matchers)
expect.addSnapshotSerializer(createSerializer())

module.exports = {
  snapshotSerializers: ['@emotion/jest/serializer'],
}
