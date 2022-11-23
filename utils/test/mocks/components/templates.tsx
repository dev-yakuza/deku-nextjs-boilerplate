const mockBlogList = jest.fn()
const mockBlogDetail = jest.fn()

jest.mock('components/templates', () => {
  const {
    BlogList: BlogListComponent,
    BlogDetail: BlogDetailComponent,
    ...rest
  } = jest.requireActual('components/templates')

  const BlogList = (props: typeof BlogListComponent) => {
    mockBlogList(props)
    return <BlogListComponent {...props} />
  }

  const BlogDetail = (props: typeof BlogDetailComponent) => {
    mockBlogDetail(props)
    return <BlogDetailComponent {...props} />
  }

  return {
    BlogList,
    BlogDetail,
    ...rest,
  }
})

export { mockBlogList, mockBlogDetail }
