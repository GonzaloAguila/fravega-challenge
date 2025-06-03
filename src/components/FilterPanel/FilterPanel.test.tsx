import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterPanel, FilterPanelProps } from './FilterPanel';
import { SortField, SortOrder } from '@/hooks/useSort';

describe('FilterPanel', () => {
  const defaultProps: FilterPanelProps = {
    sortField: SortField.LOGIN,
    sortOrder: SortOrder.ASC,
    onSort: jest.fn(),
    limit: 40,
    onLimitChange: jest.fn(),
  };

  it('renderiza correctamente los botones de sort y limit', () => {
    render(<FilterPanel {...defaultProps} />);
    expect(screen.getByText('Ordenar por:')).toBeInTheDocument();
    expect(screen.getByText((content) => content.startsWith('Nombre'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.startsWith('ID'))).toBeInTheDocument();
    expect(screen.getByText('Límite:')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('llama a onSort cuando se hace click en los botones de sort', () => {
    render(<FilterPanel {...defaultProps} />);
    fireEvent.click(screen.getByText((content) => content.startsWith('ID')));
    expect(defaultProps.onSort).toHaveBeenCalledWith(SortField.ID);
    fireEvent.click(screen.getByText((content) => content.startsWith('Nombre')));
    expect(defaultProps.onSort).toHaveBeenCalledWith(SortField.LOGIN);
  });

  it('llama a onLimitChange cuando se hace click en los botones de límite', () => {
    render(<FilterPanel {...defaultProps} />);
    fireEvent.click(screen.getByText('10'));
    expect(defaultProps.onLimitChange).toHaveBeenCalledWith(10);
    fireEvent.click(screen.getByText('100'));
    expect(defaultProps.onLimitChange).toHaveBeenCalledWith(100);
  });

  it('los botones activos tienen la clase active', () => {
    render(<FilterPanel {...defaultProps} limit={50} sortField={SortField.ID} sortOrder={SortOrder.DESC} />);
    expect(screen.getByText('50')).toHaveClass('active');
    expect(screen.getByText((content) => content.startsWith('ID'))).toHaveClass('active');
  });

  it('los botones tienen atributos de accesibilidad', () => {
    render(<FilterPanel {...defaultProps} />);
    expect(screen.getByLabelText('Ordenar por nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Ordenar por ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Limitar a 10')).toBeInTheDocument();
  });
}); 