import { CardWrapper } from "@/components/molecules/CardWrapper";
import { CustomerFormEdit } from "../components/CustomerFormEdit";

export function CustomerEdt() {
  return (
    <>
      <CardWrapper title="Edit Customer">
        <CustomerFormEdit />
      </CardWrapper>
    </>
  );
}