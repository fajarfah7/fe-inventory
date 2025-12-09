import { CardWrapper } from "@/components/molecules/CardWrapper";
import { Link } from "react-router-dom";
import { CustomerTableList } from "../components/CustomerTableList";

export function CustomerList() {
  return (
    <>
      <CardWrapper title="Customer List">
        <div className="flex justify-end mb-4">
          <Link to="/customer/create" className="rounded-sm border border-neutral-700 text-neutral-700 px-2 hover:bg-neutral-700 hover:text-white">Add Customer +</Link>
        </div>
        <CustomerTableList />
      </CardWrapper>
    </>
  );
};