import { CardWrapper } from "@/components/molecules/CardWrapper";
import { DeliveryOrderCreateForm } from "../components/form-create-delivery-order";

export function DeliveryOrderCreate() {
  return (
    <>
      <CardWrapper title="Create Delivery Order - SO-XXX001">
        <DeliveryOrderCreateForm />
      </CardWrapper>
    </>
  )
}