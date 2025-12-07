import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerResponse } from "../types/response";
import { DataTable } from "@/components/ui/data-table";

const mockCustomers: CustomerResponse[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone_number: "081234567890",
    address: "Jl. Merdeka No. 10, Jakarta",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone_number: "081298765432",
    address: "Jl. Gatot Subroto No. 21, Bandung",
  },
  {
    id: 3,
    name: "Michael Tan",
    email: "michael.tan@example.com",
    phone_number: "081356789012",
    address: "Jl. Sudirman No. 7, Surabaya",
  },
  {
    id: 4,
    name: "Ayu Lestari",
    email: "ayu.lestari@example.com",
    phone_number: "081223344556",
    address: "Jl. Diponegoro No. 5, Yogyakarta",
  },
  {
    id: 5,
    name: "David Lee",
    email: "david.lee@example.com",
    phone_number: "081934567821",
    address: "Jl. Ahmad Yani No. 18, Medan",
  },
  {
    id: 6,
    name: "Karina Putri",
    email: "karina.putri@example.com",
    phone_number: "081888123456",
    address: "Jl. Imam Bonjol No. 3, Semarang",
  },
  {
    id: 7,
    name: "Steven Hartono",
    email: "steven.hartono@example.com",
    phone_number: "081442233556",
    address: "Jl. Gajah Mada No. 9, Pontianak",
  },
  {
    id: 8,
    name: "Bella Anggraeni",
    email: "bella.anggraeni@example.com",
    phone_number: "081777889900",
    address: "Jl. S. Parman No. 12, Malang",
  },
  {
    id: 9,
    name: "Nathaniel Wong",
    email: "nathan.wong@example.com",
    phone_number: "081909090909",
    address: "Jl. Pahlawan No. 6, Bali",
  },
  {
    id: 10,
    name: "Citra Maharani",
    email: "citra.maharani@example.com",
    phone_number: "081567890123",
    address: "Jl. Veteran No. 11, Makassar",
  },
];

export function CustomerListTable() {
  const columns: ColumnDef<CustomerResponse>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
  ];

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={mockCustomers} />
    </div>
  );
}