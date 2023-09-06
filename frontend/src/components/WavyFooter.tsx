import { useEffect, useState } from 'react';

export interface wavyFooterProps {
    children?: React.ReactNode;
    color?: 'pink' | 'blue' | 'yellow';
    className?: string;
}

const WavyFooter = ({ children, color, className }: wavyFooterProps) => {
    //TODO: The window.innerWidth > 1024 is a temporary solution, I need to find a way to make it responsive
    const [desktop, setDesktop] = useState(window.innerWidth > 1024);

    const bgColor = () => {
        switch (color) {
            case 'blue':
                return 'fill-primaryBlue-500';
            case 'yellow':
                return 'fill-secondaryYellow-500';
            default:
                return 'fill-primaryPink-500';
        }
    };

    const updateMedia = () => {
        setDesktop(window.innerWidth > 1024);
    };

    useEffect(() => {
        window.addEventListener('resize', updateMedia);
        return () => window.removeEventListener('resize', updateMedia);
    });
    const fullClassName = desktop
        ? [
              'md:h-42 absolute bottom-0 right-0 h-32 w-full overflow-hidden lg:bottom-0 lg:right-0 lg:h-full lg:w-1/5',
              bgColor(),
              className,
          ]
        : [
              'md:h-42 absolute bottom-0 right-0 h-32 w-full overflow-hidden lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-1/5',
              bgColor(),
              className,
          ];

    return (
        <>
            {desktop ? (
                <aside className={fullClassName.join(' ')}>
                    <svg
                        id="Modo_de_aislamiento"
                        data-name="Modo de aislamiento"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 151.32 500"
                        preserveAspectRatio="none"
                        width="100%"
                        height="100%"
                    >
                        <path
                            id="pathToAnimate"
                            d="M719.65,899c73.56-192.66-18-347,0-500H868.57V899Z"
                            transform="translate(-717.26 -398.99)"
                        />
                    </svg>
                    {children}
                </aside>
            ) : (
                <footer className={fullClassName.join(' ')}>
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        width="100%"
                        height="100%"
                    >
                        <path d="M-9.59,2.29 C172.68,132.71 349.20,-50.09 524.27,16.22 L500.00,150.33 L0.00,150.33 Z"></path>
                    </svg>
                    {children}
                </footer>
            )}
        </>
    );
};

export default WavyFooter;
