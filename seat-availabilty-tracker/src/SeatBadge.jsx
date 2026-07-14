import React from 'react';
import { useTheme } from "./ThemeContext";

const SeatBadge = ({ text, color }) => {
    const { theme } = useTheme();

    if (!text || text.trim() === "") {
        return null;
    }
    const isDark = theme === "dark";

    return (
        <span 
            style={{ 
                backgroundColor: isDark ? '#1e293b' : color, 
                color: 'white', 
                padding: '10px 30px', 
                borderRadius: '0.25rem',
                transition: "all 0.2s ease" 
            }}
        >
            {text}
        </span>
    );
};

export default SeatBadge;
