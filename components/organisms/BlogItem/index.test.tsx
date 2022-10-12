import { render } from '@testing-library/react'

import { mockGrid } from 'utils/test/mocks'

import { BlogItem } from '.'

describe('<BlogItem />', () => {
  it('Rendered well', async () => {
    const { container } = render(
      <BlogItem
        title="This is the blog title."
        contents="This is the blog contents."
      />,
    )

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.item).toBe(true)
    expect(grid.xs).toBe(12)

    const titleComponent = grid.children[0]
    expect(titleComponent.type.name).toBe('Typography')
    expect(titleComponent.props.children).toBe('This is the blog title.')

    const contentsComponent = grid.children[1]
    expect(contentsComponent.type.name).toBe('Typography')
    expect(contentsComponent.props.children).toBe('This is the blog contents.')

    expect(container).toMatchSnapshot()
  })
})
