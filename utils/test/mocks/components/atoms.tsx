const mockPageLoading = jest.fn()

jest.mock('components/atoms', () => {
  const { PageLoading: PageLoadingComponent, ...rest } =
    jest.requireActual('components/atoms')

  const PageLoading = (props: typeof PageLoadingComponent) => {
    mockPageLoading(props)
    return <PageLoadingComponent {...props} />
  }

  return {
    PageLoading,
    ...rest,
  }
})

export { mockPageLoading }
