import axios from "axios";

const BASE_URL = "https://api.watchmode.com/v1";

export type SearchType = "movie" | "person";

const isTypeValid = (type: unknown): type is SearchType => {
  return typeof type === "string" && (type === "movie" || type === "person");
};

const isNameValid = (name: unknown): name is string => {
  return typeof name === "string" && name.length >= 3 && name.length <= 20;
};

const search = async (type: SearchType, name: string) => {
  const url = `${BASE_URL}/search?apiKey=${process.env.WATCHMODE_API_KEY}&search_field=name&search_value=${name}&types=${type}`;
  const response = await axios.get(url);
  // The task was to return a single movie or person as a response
  // however the Watchmode API cannot be configured to do an exact match
  // so it is implemented here
  const options =
    type === "movie"
      ? response.data?.title_results
      : response.data?.people_results;
  const exactMatch = options.find((o: { name: string }) => o.name === name);
  return exactMatch;
};

export default { isTypeValid, isNameValid, search };
