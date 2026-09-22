"use client"
import { DataTableFeatures } from "@/components/data-table-features";
import { createColumnHelper } from "@tanstack/react-table";
import { RequestInformation } from "../_hooks/requestInformation.endPoints";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, RequestInformation>()

export const requestInformationColumns = columnHelper.columns([
  columnHelper.accessor("firstName", {
    header: "FirstName",
  }),
  columnHelper.accessor("lastName", {
    header: "LastName",
  }),
  columnHelper.accessor("company", {
    header: "Company",
  }),
  columnHelper.accessor("country", {
    header: "Country",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("mobileNo", {
    header: "Mobile",
  }),
  columnHelper.accessor("productFamily", {
    header: "Product Family",
  }),
  columnHelper.accessor("productName", {
    header: "Product Name",
  }),
  columnHelper.accessor("enquireType", {
    header: "Enquire Type",
  }),
  columnHelper.accessor("request", {
    header: "Request",
  }),
])