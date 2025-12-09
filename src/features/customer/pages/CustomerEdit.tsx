import { CardWrapper } from "@/components/molecules/CardWrapper";
import { CustomerEditForm } from "../components/CustomerEditForm";

export function CustomerEdt() {
  return (
    <>
      <CardWrapper title="Edit Customer">
        <CustomerEditForm />
      </CardWrapper>
    </>
  );
}