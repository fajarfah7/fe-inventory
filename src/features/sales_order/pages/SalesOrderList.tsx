import { CardWrapper } from "@/components/molecules/CardWrapper";
import { SalesOrderTableItems } from "../components/table";

export function SalesOrderList() {
  return (
    <>
      <CardWrapper title="Sales Order List">
        <SalesOrderTableItems />
      </CardWrapper>
    </>
  )
}