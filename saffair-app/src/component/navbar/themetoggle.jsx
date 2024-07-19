// src/components/ThemeToggle.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Button } from 'flowbite-react';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);

    return (
        <div>
            <Button
                className="w-12 h-10 hidden sm:inline"
                color="gray"
                pill
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === "light" ? <FaSun /> : <FaMoon />}
            </Button>
        </div>
    );
};

export default ThemeToggle;
