const mockBlogList = jest.fn()
const mockBlogDetail = jest.fn()
const mockCreateBlogPost = jest.fn()

jest.mock('components/templates', () => {
  const {
    BlogList: BlogListComponent,
    BlogDetail: BlogDetailComponent,
    CreateBlogPost: CreateBlogPostComponent,
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

  const CreateBlogPost = (props: typeof CreateBlogPostComponent) => {
    mockCreateBlogPost(props)
    return <CreateBlogPostComponent {...props} />
  }

  return {
    BlogList,
    BlogDetail,
    CreateBlogPost,
    ...rest,
  }
})

export { mockBlogList, mockBlogDetail, mockCreateBlogPost }
