import { render, screen } from '@testing-library/react'
import MovieCard from '../MovieCard'
import { Movie, OriginalLanguage } from '../../moviesTypes'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

describe('MovieCard', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 7.5,
    adult: false,
    backdrop_path: '/backdrop.jpg',
    genre_ids: [28, 12],
    original_language: OriginalLanguage.En,
    original_title: 'Test Movie',
    overview: 'Test overview',
    popularity: 100,
    release_date: new Date('2023-01-01'),
    video: false,
    vote_count: 1000,
  }

  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('renders movie rating', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('7.5')).toBeInTheDocument()
  })

  it('renders movie image with correct alt text', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByAltText('Test Movie')).toBeInTheDocument()
  })

  it('applies correct rating color class for good rating', () => {
    render(<MovieCard movie={mockMovie} />)
    const ratingElement = screen.getByText('7.5')
    expect(ratingElement).toHaveClass('text-yellow-600', 'bg-yellow-100')
  })
})