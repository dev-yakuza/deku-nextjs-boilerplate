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
          { id: 1, title: 'blog title 1', contents: 'blog contents 1' },
          { id: 2, title: 'blog title 2', contents: 'blog contents 2' },
          { id: 3, title: 'blog title 3', contents: 'blog contents 3' },
          { id: 4, title: 'blog title 4', contents: 'blog contents 4' },
          { id: 5, title: 'blog title 5', contents: 'blog contents 5' },
          { id: 6, title: 'blog title 6', contents: 'blog contents 6' },
          { id: 7, title: 'blog title 7', contents: 'blog contents 7' },
          { id: 8, title: 'blog title 8', contents: 'blog contents 8' },
        ]}
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    const blogItem = grid.children[0]
    expect(blogItem.length).toBe(8)
    expect(blogItem[0].props).toEqual({
      id: 1,
      title: 'blog title 1',
      contents: 'blog contents 1',
    })
    expect(blogItem[1].props).toEqual({
      id: 2,
      title: 'blog title 2',
      contents: 'blog contents 2',
    })
    expect(blogItem[2].props).toEqual({
      id: 3,
      title: 'blog title 3',
      contents: 'blog contents 3',
    })
    expect(blogItem[3].props).toEqual({
      id: 4,
      title: 'blog title 4',
      contents: 'blog contents 4',
    })
    expect(blogItem[4].props).toEqual({
      id: 5,
      title: 'blog title 5',
      contents: 'blog contents 5',
    })
    expect(blogItem[5].props).toEqual({
      id: 6,
      title: 'blog title 6',
      contents: 'blog contents 6',
    })
    expect(blogItem[6].props).toEqual({
      id: 7,
      title: 'blog title 7',
      contents: 'blog contents 7',
    })
    expect(blogItem[7].props).toEqual({
      id: 8,
      title: 'blog title 8',
      contents: 'blog contents 8',
    })

    const floatingActionLink = grid.children[1]
    expect(floatingActionLink.type.name).toBe('FloatingActionLink')

    expect(container).toMatchSnapshot()
  })
})
