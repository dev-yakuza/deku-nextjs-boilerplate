const mockBlogList = jest.fn()

jest.mock('components/templates', () => {
  const { BlogList: BlogListComponent, ...rest } = jest.requireActual(
    'components/templates',
  )

  const BlogList = (props: typeof BlogListComponent) => {
    mockBlogList(props)
    return <BlogListComponent {...props} />
  }

  return {
    BlogList,
    ...rest,
  }
})

export { mockBlogList }
