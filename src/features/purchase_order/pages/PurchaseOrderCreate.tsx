import { CardWrapper } from "@/components/molecules/CardWrapper";
import { PurchaseOrderCreateForm } from "../components/PurchaseOrderCreateForm";

export function PurchaseOrderCreate() {
  return (
    <>
      <CardWrapper title="Create Purchase Order">
        <PurchaseOrderCreateForm />
      </CardWrapper>
    </>
  )
}