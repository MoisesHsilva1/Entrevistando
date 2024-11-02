import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

function app() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default app
