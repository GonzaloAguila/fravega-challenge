import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Buscar usuarios...')).toBeInTheDocument();
  });

  it('calls onSearch when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Buscar usuarios...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('shows loading state', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message', () => {
    const errorMessage = 'Error de búsqueda';
    render(<SearchBar onSearch={mockOnSearch} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 