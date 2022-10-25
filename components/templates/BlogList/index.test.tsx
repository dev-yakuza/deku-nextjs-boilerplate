import { render } from '@testing-library/react'

import { mockGrid } from 'utils/test'

import { BlogList } from '.'

describe('<BlogList />', () => {
  it('Rendered well with no data', async () => {
    const { container } = render(<BlogList posts={undefined} />)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.container).toBe(true)
    expect(grid.children.length).toBe(2)

    const blogItem = grid.children[0]
    expect(blogItem).toEqual([])

    const floatingActionLink = grid.children[1]
    expect(floatingActionLink.type.name).toBe('FloatingActionLink')
    expect(floatingActionLink.props.link).toBe('/posts/add')
    expect(floatingActionLink.props.children.type.type.render.displayName).toBe(
      'AddIcon',
    )

    expect(container).toMatchSnapshot()
  })

  it('Rendered well with data', async () => {
    const { container } = render(
      <BlogList
        posts={[
          { userId: 1, id: 1, title: 'blog title 1', body: 'blog contents 1' },
          { userId: 1, id: 2, title: 'blog title 2', body: 'blog contents 2' },
          { userId: 1, id: 3, title: 'blog title 3', body: 'blog contents 3' },
          { userId: 1, id: 4, title: 'blog title 4', body: 'blog contents 4' },
          { userId: 1, id: 5, title: 'blog title 5', body: 'blog contents 5' },
          { userId: 1, id: 6, title: 'blog title 6', body: 'blog contents 6' },
          { userId: 1, id: 7, title: 'blog title 7', body: 'blog contents 7' },
          { userId: 1, id: 8, title: 'blog title 8', body: 'blog contents 8' },
        ]}
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    const blogItem = grid.children[0]
    expect(blogItem.length).toBe(8)
    expect(blogItem[0].props).toEqual({
      id: 1,
      title: 'blog title 1',
      body: 'blog contents 1',
    })
    expect(blogItem[1].props).toEqual({
      id: 2,
      title: 'blog title 2',
      body: 'blog contents 2',
    })
    expect(blogItem[2].props).toEqual({
      id: 3,
      title: 'blog title 3',
      body: 'blog contents 3',
    })
    expect(blogItem[3].props).toEqual({
      id: 4,
      title: 'blog title 4',
      body: 'blog contents 4',
    })
    expect(blogItem[4].props).toEqual({
      id: 5,
      title: 'blog title 5',
      body: 'blog contents 5',
    })
    expect(blogItem[5].props).toEqual({
      id: 6,
      title: 'blog title 6',
      body: 'blog contents 6',
    })
    expect(blogItem[6].props).toEqual({
      id: 7,
      title: 'blog title 7',
      body: 'blog contents 7',
    })
    expect(blogItem[7].props).toEqual({
      id: 8,
      title: 'blog title 8',
      body: 'blog contents 8',
    })

    const floatingActionLink = grid.children[1]
    expect(floatingActionLink.type.name).toBe('FloatingActionLink')

    expect(container).toMatchSnapshot()
  })
})
