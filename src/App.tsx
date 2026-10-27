import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar, NavTab } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { AnalyzerPage } from "./pages/AnalyzerPage";
import { ModelInsightsPage } from "./pages/ModelInsightsPage";

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("home");
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>(undefined);

  const handleNavigate = (tab: NavTab, params?: { productId?: number }) => {
    if (params?.productId !== undefined) {
      setSelectedProductId(params.productId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {currentTab === "home" && <HomePage onNavigate={handleNavigate} />}

          {currentTab === "feedback" && (
            <FeedbackPage
              initialProductId={selectedProductId}
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === "dashboard" && (
            <DashboardPage
              initialProductId={selectedProductId}
              onNavigate={handleNavigate}
            />
          )}

          {currentTab === "reviews" && (
            <ReviewsPage initialProductId={selectedProductId} />
          )}

          {currentTab === "analyzer" && <AnalyzerPage />}

          {currentTab === "model" && <ModelInsightsPage />}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
