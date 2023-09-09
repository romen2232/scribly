import React, { ReactNode } from 'react';
import '../assets/styles/headFoot.css';
import WavyFooter from './WavyFooter';
import WavyHeader from './WavyHeader';
interface HeadFootProps {
    children: ReactNode;
}

const HeadFoot: React.FC<HeadFootProps> = ({ children }) => {
    return (
        <div className="relative flex h-full flex-col items-center justify-center">
            <WavyHeader />
            {children}
            <WavyFooter />
        </div>
    );
};

export default HeadFoot;
