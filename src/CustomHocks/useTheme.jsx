import { useEffect, useState } from "react";


const useTheme = () => {
    const [theme, setTheme] = useState(true)
    const [themeData, setThemeData] = useState(true)
    useEffect(() => {
        const theme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', JSON.parse(theme))
        setThemeData(JSON.parse(theme))

    }, [theme]);
    const handelTheme = () => {
        setTheme(!theme)
        theme ? localStorage.setItem('theme', JSON.stringify('dark')) :
            localStorage.setItem('theme', JSON.stringify('light'))
    }

    return [themeData,handelTheme]
};

export default useTheme;