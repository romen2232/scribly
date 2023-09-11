export interface ScriblyProps {
    className?: string;
}

const Scribly = ({ className }: ScriblyProps) => {
    const finalClassName = ['flex justify-center font-casualHandy', className];
    return (
        <div className="w-full text-9xl">
            <h1 className={finalClassName.join(' ')}>
                Scribly
                <div className="ml-0.5 w-fit rotate-6">!</div>
            </h1>
        </div>
    );
};

export default Scribly;
