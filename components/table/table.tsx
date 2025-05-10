"use client";
import {
  Link,
  SelectItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { Key } from "react";
import { IColumn, IMeta } from "@/helpers/types";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";

type DataItem = Record<string, any>;

// Define a type for the RenderCell function
type RenderCellFunction<T> = (params: {
  item: T;
  columnKey: string | React.Key;
  fetchFreshData:any;
  isAssistedUsers?:boolean;
  search?: string;
}) => React.ReactNode;

interface TableWrapperProps<T> {
  data: T[];
  columns: IColumn[];
  RenderCell: RenderCellFunction<T>;
  meta?: IMeta; // Made meta optional
  fetchFreshData?: () => void;
  isAssistedUsers?:boolean
  search?: string;
}

export const TableWrapper = <T extends DataItem>({
  data,
  columns,
  meta,
  RenderCell,
  fetchFreshData=()=>{},
  isAssistedUsers,
  search=""
}: TableWrapperProps<T>) => {
  const { updateSearchParams } = useUpdateSearchParams();

  // Provide default values if meta is undefined
  const currentPage = meta?.current_page ?? 1;
  const totalPages = meta?.total_pages ?? 1;
  const pageItems = Math.round((meta?.page_items ?? 10 + 5) / 10) * 10;

  const handlePageChange = (page: number) => {
    updateSearchParams("page", page.toString());
    // Add logic to fetch new data if needed
  };

  const handleLimitChange = (limit: string) => {
    const newLimit = limit === "ten" ? 10 : limit === "twenty" ? 20 : 50;
    updateSearchParams("limit", newLimit.toString());
    // Add logic to fetch new data if needed
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{RenderCell({ item, columnKey, fetchFreshData,isAssistedUsers,search})}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-4">
        <Pagination
          total={totalPages}
          isCompact
          showControls
          onChange={handlePageChange}
          initialPage={currentPage}
          variant="bordered"
        />
        <Select
          name="items"
          className="w-[150px]"
          variant="bordered"
          defaultSelectedKeys={[
            pageItems <= 10 ? "ten" : pageItems <= 20 ? "twenty" : "fifty",
          ]}
          onChange={(e) => handleLimitChange(e.target.value)}
        >
          <SelectItem key="ten" value="ten">
            10 per page
          </SelectItem>
          <SelectItem key="twenty" value="twenty">
            20 per page
          </SelectItem>
          <SelectItem key="fifty" value="fifty">
            50 per page
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};
