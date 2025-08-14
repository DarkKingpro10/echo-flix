import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import BackButton from '../BackButton'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('BackButton', () => {
  const mockBack = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })
  })

  it('Renderiza con texto por defecto', () => {
    render(<BackButton />)
    expect(screen.getByText('Volver')).toBeInTheDocument()
  })

  it('Renderiza con texto personalizado', () => {
    render(<BackButton title="películas" />)
    expect(screen.getByText('Volver a películas')).toBeInTheDocument()
  })

  it('Llama a router back cuando se le da click', () => {
    render(<BackButton />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockBack).toHaveBeenCalled()
  })
})