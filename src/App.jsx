import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import "./App.css";
import JoinForm from "./Components/JoinForm";
import { useEffect } from "react";
import Conference from "./Components/Conference";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Toaster } from "react-hot-toast";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <>
      <div className="App">
        {isConnected ? (
          <>
            <Header />
            <Conference />
            <Footer />
          </>
        ) : (
          <JoinForm />
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;
