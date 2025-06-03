import { SortField, SortOrder } from '@/hooks/useSort';
import styles from './FilterPanel.module.css';

const LIMIT_OPTIONS = [10, 40, 50, 100];

export interface FilterPanelProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  showLimit?: boolean;
}

export const FilterPanel = ({ sortField, sortOrder, onSort, limit, onLimitChange, showLimit = true }: FilterPanelProps) => (
  <div className={styles.filterPanel}>
    <div className={styles.sortGroup}>
      <span>Ordenar por:</span>
      <button
        type="button"
        className={`${styles.sortButton} ${sortField === SortField.LOGIN ? styles.active : ''}`}
        onClick={() => onSort(SortField.LOGIN)}
        aria-label="Ordenar por nombre"
      >
        Nombre {sortField === SortField.LOGIN && (sortOrder === SortOrder.ASC ? '↑' : '↓')}
      </button>
      <button
        type="button"
        className={`${styles.sortButton} ${sortField === SortField.ID ? styles.active : ''}`}
        onClick={() => onSort(SortField.ID)}
        aria-label="Ordenar por ID"
      >
        ID {sortField === SortField.ID && (sortOrder === SortOrder.ASC ? '↑' : '↓')}
      </button>
    </div>
    {showLimit && (
      <div className={styles.limitGroup}>
        <span>Límite:</span>
        {LIMIT_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`${styles.limitButton} ${limit === opt ? styles.active : ''}`}
            onClick={() => onLimitChange(opt)}
            aria-label={`Limitar a ${opt}`}
            tabIndex={0}
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
); 