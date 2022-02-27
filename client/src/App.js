import "./App.css";
import AuthContextProvider from './context/autentication/authContext';
import AppMain from "./components/LayoutPanel/AppMain";

function App() {
   return (
    <AuthContextProvider>
      <AppMain />
    </AuthContextProvider>
  );
}

export default App;
