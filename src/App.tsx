import "./App.css";
import { AuthProvider } from "./context/auth/AuthContext";
import { FirebaseProvider } from "./context/firebase/FirebaseContext";
import { ModalProvider } from "./context/modal/ModalContext";
import { Navigation } from "./routes/Navigation";
const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <FirebaseProvider>
      <ModalProvider>
        <AuthProvider>{children}</AuthProvider>
      </ModalProvider>
    </FirebaseProvider>
  );
};
function App() {
  return (
    <AppState>
      <Navigation />
    </AppState>
  );
}

export default App;
