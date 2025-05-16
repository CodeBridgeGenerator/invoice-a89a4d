import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import QuotationsPage from "../QuotationsPage/QuotationsPage";
import PurchaseOrdersPage from "../PurchaseOrdersPage/PurchaseOrdersPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import CreditNotePage from "../CreditNotePage/CreditNotePage";
import DebitNotePage from "../DebitNotePage/DebitNotePage";
import ServicesPage from "../ServicesPage/ServicesPage";
import ReceiptsPage from "../ReceiptsPage/ReceiptsPage";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import PaymentTermsPage from "../PaymentTermsPage/PaymentTermsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "quotations":
                return <QuotationsPage />;
case "purchaseOrders":
                return <PurchaseOrdersPage />;
case "invoices":
                return <InvoicesPage />;
case "creditNote":
                return <CreditNotePage />;
case "debitNote":
                return <DebitNotePage />;
case "services":
                return <ServicesPage />;
case "receipts":
                return <ReceiptsPage />;
case "payments":
                return <PaymentsPage />;
case "paymentTerms":
                return <PaymentTermsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
