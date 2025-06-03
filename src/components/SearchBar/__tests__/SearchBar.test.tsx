import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renderiza el input de búsqueda', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Buscar usuarios...')).toBeInTheDocument();
  });

  it('llama a onSearch al escribir', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Buscar usuarios...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('muestra el estado de carga', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('muestra el mensaje de error', () => {
    const errorMessage = 'Error de búsqueda';
    render(<SearchBar onSearch={mockOnSearch} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 