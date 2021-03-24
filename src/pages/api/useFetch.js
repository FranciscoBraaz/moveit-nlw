import React from "react";

const useFetch = async () => {
  const request = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  };

  let dataUsers = await request(
    "https://605b363e27f0050017c06862.mockapi.io/api/v1/users"
  );

  return { dataUsers };
};

export default useFetch;
