import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PaymentForm from "./components/PaymentForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";  
import "./styles/global.css"; 
import "./styles/theme.css";

const App = () => {
  const [sortBy, setSortBy] = useState("name");
  const [filterByCategory, setFilterByCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Добавили поиск

  return (
    <ThemeProvider>
      <Router>
        {/* ✅ Передаём `searchQuery` и `setSearchQuery` в Navbar */}
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />  
        
        <AnimatePresence mode="wait">
          <main className="container mx-auto p-4">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    sortBy={sortBy} 
                    setSortBy={setSortBy} 
                    filterByCategory={filterByCategory} 
                    setFilterByCategory={setFilterByCategory} 
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    searchQuery={searchQuery} // ✅ Передаём в Home
                  />
                } 
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/payment" element={<PaymentForm />} />
            </Routes>
          </main>
        </AnimatePresence>

        <Footer />
      </Router>
    </ThemeProvider> 
  );
};

export default App;
