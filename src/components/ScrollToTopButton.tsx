// ScrollToTopButton.tsx
import { useState, useEffect } from 'react';
import ChevroUpIcon from '../assets/custom-icons/ChevroUpIcon';
import { useModeStore } from '../store/theme-mode/store';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const { isDarkMode } = useModeStore((state) => state);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth',
    // });
     const section = document.getElementById('scroll-filter-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Element with ID 'scroll-filter-section' not found.");
    }
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
    >
        <ChevroUpIcon isDarkMode={!isDarkMode} />
    </button>
    )
  );
};

export default ScrollToTopButton;
