import * as nextRouter from 'next/router'
import type { NextRouter } from 'next/router'

const useRouter = jest.spyOn(nextRouter, 'useRouter')
const getMockRouter = (path = '/'): NextRouter => {
  return {
    basePath: '',
    pathname: path,
    route: path,
    asPath: path,
    query: {},
    isLocaleDomain: true,
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isReady: false,
    isPreview: false,
  }
}

const mockLink = jest.fn()

jest.mock('next/link', () => {
  const NextJSLink = jest.requireActual('next/link')

  const Link = (props: typeof NextJSLink) => {
    mockLink(props)
    return <NextJSLink {...props} />
  }

  return Link
})

export { useRouter, getMockRouter, mockLink }
