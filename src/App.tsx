import { useMemo } from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./components/navigation-frame/Footer";
import TopBar from "./components/navigation-frame/TopBar";
import { RPC_URL } from "./settings/rpc";
import DomainInput from "./components/DomainInput";
import { useLocalStorageState } from "ahooks";
import { tokenAuthFetchMiddleware } from "@strata-foundation/web3-token-auth";
import { getToken } from "./utils/rpc";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [customRpc, setCustomRpc] = useLocalStorageState<string>("customRpc");

  const endpoint = useMemo(() => customRpc || (RPC_URL as string), [customRpc]);

  return (
    <ConnectionProvider
      endpoint={endpoint as string}
      config={{
        fetchMiddleware: tokenAuthFetchMiddleware({
          getToken,
        }),
      }}
    >
      <div className="bg-neutral">
        <TopBar setCustomRpc={setCustomRpc} />
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral">
          <DomainInput />
        </div>
        <Footer />
      </div>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </ConnectionProvider>
  );
};

export default App;
