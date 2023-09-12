import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useCategoryStore } from '../stores/categoryStore';
import { Unit } from './Unit';
import { retrieveUnitsByCategory } from '../services/unit';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE_NAME } from '../utils/consts';
import Loader from '../pages/loader';
export function Learn() {
    const { category } = useCategoryStore();
    const cookies = parseCookies();
    const [units, setUnits] = useState([]);
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
        return (_jsx("main", { className: "h-full", children: _jsx(Loader, {}) }));
    return (_jsx("main", { className: "flex h-full w-full flex-col items-center overflow-scroll py-12", children: units.map((unit, index) => (_jsx(Unit, { unit: unit, first: index === 0 }, unit.id))) }));
}
