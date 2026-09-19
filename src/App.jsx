import { useState } from "react";
import {
  // BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout, LoadingScreen } from "./components";
import { Home, About } from "./pages";

function App() {
  const [loading, setLoading] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/projects" element={<Projects />} /> */}

        {/* <Route
           path="/projects/case-study/astra"
           element={<AstraCaseStudy />}
         /> */}

        {/* <Route
           path="/projects/case-study/exchangex"
           element={<ExchangexCaseStudy />}
         /> */}

        {/* <Route
           path="/projects/case-study/taskflow"
           element={<TaskFlowCaseStudy />}
         /> */}

        {/* <Route
           path="/projects/case-study/thefadestore"
           element={<TheFadeCaseStudy />}
         /> */}

        {/* <Route
           path="/projects/case-study/blogapp"
           element={<BlogCaseStudy />}
         /> */}

        {/* <Route
           path="/projects/case-study/vaultkey"
           element={<VaultKeyCaseStudy />}
         /> */}

        {/* <Route path="/experience" element={<Experience />} />
         <Route path="/contact" element={<Contact />} /> */}
      </Route>,
    ),
  );

  return (
    <>
      {" "}
      {loading ? (
        <LoadingScreen isLoading={setLoading} />
      ) : (
        <RouterProvider router={router} />
      )}{" "}
    </>
  );
}

export default App;
