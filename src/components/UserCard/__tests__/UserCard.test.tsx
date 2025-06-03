import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '../UserCard';
import { User } from '@/types';

const mockUser: User = {
  id: 1,
  login: 'testuser',
  avatar_url: 'https://example.com/avatar.jpg',
  html_url: 'https://github.com/testuser',
};

const mockOnToggleFavorite = jest.fn();
const mockIsFavorite = (userId: number) => userId === mockUser.id;

describe('UserCard', () => {
  it('renderiza correctamente la información del usuario', () => {
    render(<UserCard user={mockUser} isFavorite={mockIsFavorite} onToggleFavorite={mockOnToggleFavorite} />);
    
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByAltText("testuser's avatar")).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('llama a onToggleFavorite cuando se hace click en el botón de favoritos', () => {
    render(<UserCard user={mockUser} isFavorite={mockIsFavorite} onToggleFavorite={mockOnToggleFavorite} />);
    
    const favoriteButton = screen.getByLabelText('Quitar de favoritos');
    fireEvent.click(favoriteButton);
    
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockUser);
  });

  it('muestra el estado correcto del botón de favoritos', () => {
    const { rerender } = render(
      <UserCard user={mockUser} isFavorite={mockIsFavorite} onToggleFavorite={mockOnToggleFavorite} />
    );
    
    expect(screen.getByLabelText('Quitar de favoritos')).toBeInTheDocument();
    
    const mockIsNotFavorite = () => false;
    rerender(<UserCard user={mockUser}  isFavorite={mockIsNotFavorite} onToggleFavorite={mockOnToggleFavorite} />);
    
    expect(screen.getByLabelText('Agregar a favoritos')).toBeInTheDocument();
  });
}); 