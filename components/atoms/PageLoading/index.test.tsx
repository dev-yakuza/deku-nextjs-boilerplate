import { render } from '@testing-library/react'

import { mockGrid } from 'utils/test'

import { PageLoading } from '.'

describe('<PageLoading />', () => {
  it('Rendered well', async () => {
    const { container } = render(<PageLoading />)

    const grid = mockGrid.mock.calls[0][0]
    expect(grid.container).toBe(true)
    expect(grid.spacing).toBe(0)
    expect(grid.direction).toBe('column')
    expect(grid.alignItems).toBe('center')
    expect(grid.justifyContent).toBe('center')
    expect(grid.style).toEqual({ minHeight: '100vh' })

    const progress = grid.children
    expect(progress.type.render.name).toBe('CircularProgress')

    expect(container).toMatchSnapshot()
  })
})
