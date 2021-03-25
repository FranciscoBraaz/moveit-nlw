const useFetch = async () => {
  let data;
  const BASE_URL = process.env.DATABASE_URL;

  const request = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    data = json;
  };

  await request(BASE_URL);

  return { data, BASE_URL };
};

export default useFetch;
