/**
 * Runs from the document head before first paint.
 * First-time visitors stay on the dark class rendered by the server.
 * A stored "light" or "dark" choice is applied immediately so the page
 * does not flash the other theme. Older "system" values are dropped.
 */
export const themeBootScript = `(function(){try{var key="theme";var theme=localStorage.getItem(key);var root=document.documentElement;if(theme!=="light"&&theme!=="dark"){localStorage.removeItem(key);theme="dark";}if(theme==="light"){root.classList.remove("dark");root.classList.add("theme-light");}else{root.classList.remove("theme-light");root.classList.add("dark");}}catch(e){}})();`
