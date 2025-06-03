import { useState, useMemo } from 'react';
import { User } from '@/types';

export enum SortField {
  LOGIN = 'login',
  ID = 'id'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export const useSort = (items: User[]) => {
  const [sortField, setSortField] = useState<SortField>(SortField.LOGIN);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === SortOrder.ASC
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === SortOrder.ASC
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [items, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortField(field);
      setSortOrder(SortOrder.ASC);
    }
  };

  return {
    sortedItems,
    sortField,
    sortOrder,
    toggleSort,
  };
}; 