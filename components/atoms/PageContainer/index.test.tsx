import { render, screen } from '@testing-library/react'

import { PageContainer } from '.'

describe('<PageContainer />', () => {
  it('Rendered well with string', async () => {
    const { container } = render(
      <PageContainer>This is PageContainer</PageContainer>,
    )

    const pageContainer = screen.getByText('This is PageContainer')
    expect(pageContainer).toHaveStyle(`
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #eee;
      overflow: scroll;
    `)

    expect(container).toMatchSnapshot()
  })

  it('Rendered well with component', async () => {
    const { container } = render(
      <PageContainer>
        <h1>This is PageContainer</h1>
      </PageContainer>,
    )

    const pageContainer = screen.getByText('This is PageContainer')
    expect(pageContainer.tagName).toBe('H1')

    expect(container).toMatchSnapshot()
  })
})
