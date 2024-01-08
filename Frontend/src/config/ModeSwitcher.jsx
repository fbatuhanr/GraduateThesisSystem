import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {setPreferences, clearPreferences} from "../redux/features/PreferencesSlice";

import { MdLightMode, MdDarkMode } from "react-icons/md";

const ModeSwitcher = () => {

    const dispatch = useDispatch();
    const preferences = useSelector(({PreferencesSlice}) => PreferencesSlice.preferences);

    const [theme, setTheme] = useState(null);

    useEffect(() => {

        // below code for system dark mode detection
        // setTheme( window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' )

        setTheme(preferences.theme)

    }, []);

    useEffect(() => {

        if(theme === "dark")
            document.documentElement.classList.add("dark")
        else
            document.documentElement.classList.remove("dark")

    }, [theme])

    const handleThemeSwitch = () => {

        let result = theme === "dark" ? "light" : "dark";
        setTheme(result);
        dispatch(setPreferences({theme: result}));
    }

    return (
        <button className="bg-gray-800 dark:bg-gray-100 text-white dark:text-black p-3 rounded-3xl" onClick={handleThemeSwitch}>
            {theme === "dark" ? <MdLightMode size="1.3em" /> : <MdDarkMode size="1.3em" />}
        </button>
    );
};

export default ModeSwitcher;