import Index from "./pages/Index";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => (
  <LanguageProvider>
    <Index />
  </LanguageProvider>
);

export default App;
