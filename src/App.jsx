import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route, HashRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermOfUse from "./pages/TermOfUse";
import SalesAndRefunds from "./pages/SalesAndRefunds";
import Legal from "./pages/Legal";
import Home from "./pages/Home";

import Archie from "./pages/Archie";
import Merlin from "./pages/Merlin";

import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

import { AppProvider } from "./utils/context";
import { BodyScrollProvider } from "./utils/context";
import { BodyPosProvider } from "./utils/context";
import { useEffect } from "react";

// import KeyFeatures from './components/KeyFeatures';

function App() {
  return (
    <BodyScrollProvider>
      <BodyPosProvider>
        <AppProvider>
          <Router>
            <div id="App" className="App">
              <Header id="land-header" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/term-of-use" element={<TermOfUse />} />
                <Route
                  path="/sales-and-refunds"
                  element={<SalesAndRefunds />}
                />
                <Route path="/legal" element={<Legal />} />
                <Route path="/merlin" element={<Merlin />} />
                <Route path="/archie" element={<Archie />} />

                <Route path="/faq" element={<FAQ />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
              </Routes>
              <Footer id="land-footer" />
            </div>
          </Router>
        </AppProvider>
      </BodyPosProvider>
    </BodyScrollProvider>
  );
}

export default App;
