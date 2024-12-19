import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => useContext(ThemeContext)

// export function useTheme() {
//     return useContext(ThemeContext)
// }