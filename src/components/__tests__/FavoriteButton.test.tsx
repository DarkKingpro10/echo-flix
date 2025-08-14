import { render, screen, fireEvent } from '@testing-library/react'
import FavoriteButton from '../FavoriteButton'
import { FavoriteObject } from '../../app/store/favoriteStore'

const mockAddFavorite = jest.fn()
const mockRemoveFavorite = jest.fn()

jest.mock('../../app/store/favoriteStore', () => ({
  __esModule: true,
  default: jest.fn((selector) => {
    if (selector.toString().includes('addFavorite')) {
      return mockAddFavorite
    }
    if (selector.toString().includes('removeFavorite')) {
      return mockRemoveFavorite
    }
    return jest.fn()
  }),
}))

jest.mock('../../app/store/useStore', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}))

describe('FavoriteButton', () => {
  const mockObject: FavoriteObject = {
    type: 'movie',
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    name: 'Test Movie',
    backdrop_path: null
  }

  it('Renderiza Agregar favorito cuando no esta favorito', () => {
    render(<FavoriteButton object={mockObject} />)
    expect(screen.getByText('Agregar a favoritos')).toBeInTheDocument()
  })

  it('Renderiza el tipo correcto', () => {
    render(<FavoriteButton object={mockObject} />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('Llama a la funcion toggle cuando se le da click', () => {
    render(<FavoriteButton object={mockObject} />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockAddFavorite).toHaveBeenCalledWith(mockObject)
  })
})