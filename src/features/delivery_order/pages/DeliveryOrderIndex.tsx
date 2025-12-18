import { CardWrapper } from "@/components/molecules/CardWrapper";
import { DeliveryOrderIndexTable } from "../components/table-index-delivery-order";

export function DeliveryOrderIndex() {

  return (
    <>
      <CardWrapper title="List Delivery Order">
        <DeliveryOrderIndexTable />
      </CardWrapper>
    </>
  );
};