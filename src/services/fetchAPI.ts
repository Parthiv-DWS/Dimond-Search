const apiUrl = import.meta.env.VITE_APP_API_URL;

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
