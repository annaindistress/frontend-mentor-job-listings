export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`Error with fetching data`);
    return data;
  } catch (error) {
    throw error;
  }
};
