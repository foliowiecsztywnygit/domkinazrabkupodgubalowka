import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteScrollTop } from "@/components/RouteScrollTop";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";

export default function App() {
  return (
    <Router>
      <RouteScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
      </Routes>
    </Router>
  );
}
