import { useState, useEffect, useCallback } from 'react';

type LessonTheoryProps = {
  theory: string;
  onEnd: () => void;
};

const LessonTheory: React.FC<LessonTheoryProps> = ({ theory, onEnd }) => {
  // Split the theory into sections
  const sections = theory.split('\n\n');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    if (currentSectionIndex >= sections.length) {
      onEnd();
    }
  }, [currentSectionIndex, onEnd]);

  const handleScroll = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY > 0) {
        handleRightSideClick();
      } else if (e.deltaY < 0) {
        handleLeftSideClick();
      }
    },
    []
  );

  let lastScrollTime = 0;
  
  const debouncedHandleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = new Date().getTime();
    
    if (now - lastScrollTime > 300) { // 300ms debounce
      handleScroll(e);
      lastScrollTime = now;
    }
  };

  const handleRightSideClick = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleLeftSideClick = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%' }} onWheel={debouncedHandleScroll}>

      <div
        style={{ flex: 1, cursor: 'pointer' }}
        onClick={handleLeftSideClick}
      />
      <div style={{ flex: 3 }}>
        {sections[currentSectionIndex]}
      </div>
      <div
        style={{ flex: 1, cursor: 'pointer' }}
        onClick={handleRightSideClick}
      />
    </div>
  );
};

export default LessonTheory;
