import { useEffect, useState } from 'react';
import { useCategoryStore } from '../stores/categoryStore';
import { Unit } from './Unit';
import { UnitType } from '../utils/types';
import { retrieveUnitsByCategory } from '../services/unit';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import Loader from '../pages/loader';

const mockUnit: UnitType = {
        id: 1,
        unitName: 'Unit 1',
        unitDescription: 'This is the first unit',
        unitStyle: 'POETRY',
        unitColor: 'bg-red-500',
        unitNumber: 1,
        lessons: [
            {
                id: 1,
                lessonName: 'Lesson 1',
                lessonDescription: 'This is the first lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 100,
            },
            {
                id: 2,
                lessonName: 'Lesson 2',
                lessonDescription: 'This is the second lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 60,
            },
            {
                id: 3,
                lessonName: 'Lesson 3',
                lessonDescription: 'This is the third lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 0,
            },
            {
                id: 1,
                lessonName: 'Lesson 1',
                lessonDescription: 'This is the first lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 100,
            },
            {
                id: 2,
                lessonName: 'Lesson 2',
                lessonDescription: 'This is the second lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 60,
            },
            {
                id: 3,
                lessonName: 'Lesson 3',
                lessonDescription: 'This is the third lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'red',
                difficulty: 1,
                percentageCompleted: 0,
            },
        ],
    },
    mockUnit2: UnitType = {
        id: 2,
        unitName: 'Unit 2',
        unitDescription: 'This is the second unit',
        unitStyle: 'POETRY',
        unitColor: 'bg-blue-500',
        unitNumber: 2,
        lessons: [
            {
                id: 4,
                lessonName: 'Lesson 4',
                lessonDescription: 'This is the fourth lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'blue',
                difficulty: 1,
                percentageCompleted: 100,
            },
            {
                id: 5,
                lessonName: 'Lesson 5',
                lessonDescription: 'This is the fifth lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'blue',
                difficulty: 1,
                percentageCompleted: 60,
            },
            {
                id: 6,
                lessonName: 'Lesson 6',
                lessonDescription: 'This is the sixth lesson',
                lessonTheory: 'This is the theory',
                lessonColor: 'blue',
                difficulty: 1,
                percentageCompleted: 0,
            },
        ],
    };

export function Learn() {
    const { category } = useCategoryStore();
    const cookies = parseCookies();

    const [units, setUnits] = useState<UnitType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        retrieveUnitsByCategory(category, cookies[AUTH_COOKIE_NAME])
            .then((res) => {
                setUnits(res);
                //TODO: Remove mock data
                setUnits([mockUnit, mockUnit2]);
                setLoading(false);
            })
            .catch((err) => {
                //TODO: Remove mock data
                setUnits([mockUnit, mockUnit2]);
                console.log(err);
                setLoading(false);
            });
    }, [category]);

    if (loading)
        return (
            <main className="h-full">
                <Loader />
            </main>
        );

    return (
        <main className="h-full ">
            <div className="flex flex-col">
                {units.map((unit) => (
                    <Unit key={unit.id} unit={unit} />
                ))}
            </div>
        </main>
    );
}
