export interface IStreakProps {}

export function Streak(props: IStreakProps) {
    props;
    return (
        <section className="flex h-full flex-col items-center justify-between">
            <div className="flex h-full w-full items-center justify-between">
                <h1>Head</h1>
                <button>Close</button>
            </div>
            <div className="h-full w-full">
                <div>Calendar</div>
            </div>
            <div className="h-full w-full">Gems</div>
        </section>
    );
}
