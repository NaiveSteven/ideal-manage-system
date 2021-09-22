/*
 * @Description: description
 * @Author: mjqin
 * @Date: 2021-09-22 10:22:58
 * @LastEditTime: 2021-09-22 10:31:37
 * @LastEditors: mjqin
 */
import type { ComponentInternalInstance } from "vue";
import { ElTable } from "element-plus";
import { getCurrentInstance } from "vue";
export const useTableMethods = <T>() => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance;

  const setCurrentRow = (row: T) => {
    (ctx?.$refs.ilTable as typeof ElTable).setCurrentRow(row);
  };

  const toggleRowSelection = (row: T, selected: boolean) => {
    (ctx?.$refs.ilTable as typeof ElTable).toggleRowSelection(row, selected);
  };

  const clearSelection = () => {
    (ctx?.$refs.ilTable as typeof ElTable).clearSelection();
  };

  const clearFilter = (columnKeys: string[]) => {
    (ctx?.$refs.ilTable as typeof ElTable).clearFilter(columnKeys);
  };

  const toggleAllSelection = () => {
    (ctx?.$refs.ilTable as typeof ElTable).toggleAllSelection();
  };

  const toggleRowExpansion = (row: T, expanded: boolean) => {
    (ctx?.$refs.ilTable as typeof ElTable).toggleRowExpansion(row, expanded);
  };

  const clearSort = () => {
    (ctx?.$refs.ilTable as typeof ElTable).clearSort();
  };

  const sort = (prop: string, order: string) => {
    (ctx?.$refs.ilTable as typeof ElTable).sort(prop, order);
  };

  return {
    setCurrentRow,
    toggleRowSelection,
    clearSelection,
    clearFilter,
    toggleAllSelection,
    toggleRowExpansion,
    clearSort,
    sort,
  };
};
