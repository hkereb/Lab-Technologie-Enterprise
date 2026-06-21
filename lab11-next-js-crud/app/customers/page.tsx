import NewCustomerForm from "./_components/NewCustomerForm";
import CustomersTable from "./_components/CustomersTable";

export default function CustomersPage() {
  return (
    <>
      <NewCustomerForm />
      <p>&nbsp;</p>
      <CustomersTable />
    </>
  );
}