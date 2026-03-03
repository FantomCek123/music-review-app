import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {

  useEffect(() => {
    console.log("✅ Frontend je pokrenut!");
  }, []);

  return <AppRoutes />;
}

export default App;