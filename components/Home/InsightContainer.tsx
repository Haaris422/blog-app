import { useRef, useState, useEffect } from "react";
import { dummyArticleList } from "./Constants/Data";
import { HomeInsights } from "./HomeInsights";

export function InsightContainer(){
      const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        setIsScrolling(true);
        
        if (delta > 0 && currentIndex < dummyArticleList.length - 1) {
          // Scroll down
          setCurrentIndex(prev => prev + 1);
        } else if (delta < 0 && currentIndex > 0) {
          // Scroll up
          setCurrentIndex(prev => prev - 1);
        }

        // Reset scrolling flag after animation
        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' && currentIndex < dummyArticleList.length - 1) {
        setIsScrolling(true);
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 800);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setIsScrolling(true);
        setCurrentIndex(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isScrolling]);

    return(
        <div className="mt-6 w-[80%] h-[700px] sticky top-36 overflow-y-auto">
  
  <div className="border-b border-white sticky bg-black top-0 z-15 py-2 ">
    <h1 className="text-3xl font-bold text-center  ">Insights</h1>
   <div className="flex justify-center  mt-3 gap-1">
          {dummyArticleList.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2'
              }`}
            />
          ))}
        </div>
        </div>
  <div className="my-2 grid z-5 place-items-center">
    {dummyArticleList.map((article) => (
      <HomeInsights key={article.id} article={article} />
    ))}
  </div>
</div>
    )
}