import { CardWrapper } from "@/components/molecules/CardWrapper";
import { CustomerFormCreate } from "../components/CustomerFormCreate";

export function CustomerCreate() {
  return (
    <>
      <CardWrapper title="Create Customer">
        <CustomerFormCreate />
      </CardWrapper>
    </>
  );
}