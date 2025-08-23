import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  // document.documentElement.classList.toggle("dark", theme === "dark") className={theme}
  return (
    <div>
      <div
        className={`${theme} bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen`}
      >
        {children}
      </div>
    </div>
  );
};
export default ThemeProvider;
