import { useRef, useState, useEffect } from "react";
import { InsightCard } from "./InsightCard";
interface InsightContainerProps {
  dummyArticleList: ArticleProps[] | null;
}
export function InsightContainer({ dummyArticleList }: InsightContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  console.log('Home: IsightContainer: insights: ', dummyArticleList)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) > threshold) {
        setIsScrolling(true);

        if (delta > 0 && currentIndex < (dummyArticleList?.length || 0) - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (delta < 0 && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }

        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    container.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex, isScrolling]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' && currentIndex < (dummyArticleList?.length || 0) - 1) {
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

 

  return (
    <div className="mt-6 w-full md:w-[50%] h-[700px] sticky top-36 overflow-hidden">
      <div className="border-b border-white bg-black w-full z-15 py-2">
        <h1 className="text-3xl font-bold text-center">Insights</h1>
        <div className="flex justify-center mt-3 gap-1">
          {dummyArticleList?.map((_, index) => (
            <div
              key={index}
              className={`h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-2'
                }`}
            />
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-full pl-2 overflow-hidden"
        style={{ height: 'calc(100% - 80px)' }}
      >
        <div
          className="flex flex-col h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateY(-${currentIndex * 100}%)`,
          }}
        >
          {dummyArticleList?.map((article, index) => (
            <div
              key={article.id}
              className="h-full flex-shrink-0 flex items-center justify-center"
            >
              <InsightCard article={article} />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-white/60 text-xs text-center">
          <p>Scroll or use ↑↓ keys to navigate</p>
        </div>

      </div>
    </div>
  )
}