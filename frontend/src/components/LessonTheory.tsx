import { useCycle } from 'framer-motion';
// import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// import "../assets/styles/lessonTheory.css"

type LessonTheoryProps = {
    theory: string;
    onEnd: () => void;
};

//TODO: add animation and styles i.e. animation to show the user how to navigate through the theory

const LessonTheory: React.FC<LessonTheoryProps> = ({ theory, onEnd }) => {
    // Split the theory into sections
    const sections = theory.split('\n\n');
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [accumulatedDeltaY, setAccumulatedDeltaY] = useState(0); // Used for scrolling
    const navigate = useNavigate();
    const [backgroundColor1, cycleBackgroundColor] = useCycle(
        'mainBackground',
        'blue',
    );
    const [isAnimating, setIsAnimating] = useState(false);

    console.log(backgroundColor1, isAnimating);

    useEffect(() => {
        const handleWindowClick = (e: MouseEvent) => {
            const windowWidth = window.innerWidth;

            if (e.clientX > windowWidth / 2) {
                // Right side
                // Navigate to next section
                setIsAnimating(true);
                cycleBackgroundColor();

                if (currentSectionIndex < sections.length - 1) {
                    setCurrentSectionIndex((prevIndex) => prevIndex + 1);
                } else {
                    onEnd();
                }
            } else {
                // Left side
                // Navigate to previous section
                if (currentSectionIndex > 0) {
                    setCurrentSectionIndex((prevIndex) => prevIndex - 1);
                } else {
                    navigate(-1);
                }
                cycleBackgroundColor();
                setIsAnimating(true);
            }
        };
        const handleScroll = (e: WheelEvent) => {
            const SCROLL_THRESHOLD = 250; // The amount of pixels the user has to scroll to trigger the next section
            setAccumulatedDeltaY((prevDelta) => prevDelta + e.deltaY); // Accumulate deltaY

            if (accumulatedDeltaY > SCROLL_THRESHOLD) {
                // Scrolling down
                if (currentSectionIndex < sections.length - 1) {
                    setCurrentSectionIndex((prevIndex) => prevIndex + 1);
                    setAccumulatedDeltaY(0); // Reset the accumulated value
                } else {
                    onEnd();
                }
            } else if (accumulatedDeltaY < -SCROLL_THRESHOLD) {
                // Scrolling up
                if (currentSectionIndex > 0) {
                    setCurrentSectionIndex((prevIndex) => prevIndex - 1);
                    setAccumulatedDeltaY(0); // Reset the accumulated value
                } else {
                    navigate(-1);
                }
            }
        };

        window.addEventListener('click', handleWindowClick);
        window.addEventListener('wheel', handleScroll as EventListener); // 'as EventListener' is used to bypass TS issue

        return () => {
            window.removeEventListener('click', handleWindowClick);
            window.removeEventListener('wheel', handleScroll as EventListener);
        };
    }, [
        currentSectionIndex,
        sections.length,
        onEnd,
        accumulatedDeltaY,
        navigate,
    ]);

    return (
        <div
            className={`flex h-screen items-center justify-center p-48 text-center text-5xl font-extrabold leading-loose`}
        >
            <></>
            {sections[currentSectionIndex]}
        </div>
    );
};

export default LessonTheory;
