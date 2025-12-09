import { CardWrapper } from "@/components/molecules/CardWrapper";
import { CustomerCreateForm } from "../components/CustomerCreateForm";

export function CustomerCreate() {
  return (
    <>
      <CardWrapper title="Create Customer">
        <CustomerCreateForm />
      </CardWrapper>
    </>
  );
}