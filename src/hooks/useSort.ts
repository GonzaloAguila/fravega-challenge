import { useState, useMemo } from 'react';
import { User } from '@/types';

type SortField = 'login' | 'id';
type SortOrder = 'asc' | 'desc';

export const useSort = (items: User[]) => {
  const [sortField, setSortField] = useState<SortField>('login');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [items, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    sortedItems,
    sortField,
    sortOrder,
    toggleSort,
  };
}; 