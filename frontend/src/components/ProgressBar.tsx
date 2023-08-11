export interface IProgressBarProps {
    progressValue: number;
    progressMax: number;
    progressColor: string;
}

export default function ProgressBar(props: IProgressBarProps) {
    return (
        <div className="flex items-center">
            <div className="w-full ">
                <div className="flex h-4  overflow-hidden rounded-xl bg-gray-200 text-xs">
                    <div
                        style={{
                            width: `${
                                (props.progressValue / props.progressMax) * 100
                            }%`,
                        }}
                        className={`text-white bg-${props.progressColor}-100 whitespace-nowrap rounded-xl shadow-none`}
                    >
                        <div className=" flex h-2 justify-center overflow-hidden rounded-xl pt-1 text-xs">
                            <div
                                className={` flex w-9/12 flex-col justify-center whitespace-nowrap rounded-xl bg-${props.progressColor}-50 text-center text-white shadow-none`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between pl-4">
                <p className="text-xs font-bold text-gray-400">
                    {props.progressValue}/{props.progressMax}
                </p>
            </div>
        </div>
    );
}
