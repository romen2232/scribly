import { User } from '../utils/types';

export interface IStatisticsProps {
    user: User;
}

//Show some user statistics
export default function Statistics(props: IStatisticsProps) {
    return (
        <div className="flex flex-col justify-center gap-2">
            <div className="flex flex-row justify-between px-5">
                <p className="text-lg font-bold text-gray-700">Statistics</p>
            </div>
            <div className="flex flex-row justify-between px-5">
                <p className="text-sm text-gray-500">User Progress</p>
                <p className="text-sm text-gray-500">Total Points</p>
            </div>
            <div className="flex flex-row justify-between px-5">
                <p className="text-sm text-gray-500">{}</p>
                <p className="text-sm text-gray-500">{}</p>
            </div>
        </div>
    );
}
