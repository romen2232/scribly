import { useEffect, useState } from 'react';
import { useCategoryStore } from '../stores/categoryStore';
import { Unit } from './Unit';
import { UnitType } from '../utils/types';
import { retrieveUnitsByCategory } from '../services/unit';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import Loader from '../pages/loader';

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
                setLoading(false);
            })
            .catch((err) => {
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
        <main className="flex h-full w-full flex-col items-center">
            {units.map((unit) => (
                <Unit key={unit.id} unit={unit} />
            ))}
        </main>
    );
}
