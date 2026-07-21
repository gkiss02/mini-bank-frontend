import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/root-layout/RootLayout";
import CreateAccountPage from "./pages/create-account/CreateAccountPage";
import ListAccountsPage from "./pages/list-accounts/ListAccountsPage";
import DepositPage from "./pages/deposit/DepositPage";
import TransferPage from "./pages/transfer/TransferPage";
import WithdrawPage from "./pages/withdraw/WithdrawPage";
import ErrorPage from "./pages/error/ErrorPage";
import { AccountsProvider } from "./context/AccountsContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <CreateAccountPage /> },
        { path: "list-accounts", element: <ListAccountsPage /> },
        { path: "deposit", element: <DepositPage /> },
        { path: "transfer", element: <TransferPage /> },
        { path: "withdraw", element: <WithdrawPage /> },
      ],
    },
  ]);

  return (
    <AccountsProvider>
      <RouterProvider router={router} />
    </AccountsProvider>
  );
};

export default App;
