// const apiUrl =
//   import.meta.env.VITE_APP_TYPE === "development"
//     ? "/graphql" // Use proxy in development
//     : import.meta.env.VITE_APP_API_URL; // Use full URL in production

declare global {
  interface Window {
    diamondSearch?: any;
  }
}

const apiUrl = window.diamondSearch.baseUrl+'graphql';

export const fetchAPI = async (query: string) => {
  return await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Sec-Fetch-Mode": "cors",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());
};
