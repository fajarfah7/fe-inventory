import { CardWrapper } from "@/components/molecules/CardWrapper";
import { PurchaseOrderCreateForm } from "../components/form-create-purchase-order";

export function PurchaseOrderCreate() {
  return (
    <>
      <CardWrapper title="Create Purchase Order">
        <PurchaseOrderCreateForm />
      </CardWrapper>
    </>
  )
}