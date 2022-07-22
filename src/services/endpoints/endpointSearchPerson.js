import API_KEY from "./keys";

export const setEndpointSearchPerson = (
  querySearched,
  pageNumberToSearch = "3"
) => {
  const endpointSearchPerson = "https://api.themoviedb.org/3/search/person?";
  const languageSearch = "en-US";

  return `${endpointSearchPerson}api_key=${API_KEY}&language=${languageSearch}&query=${querySearched}&page=${pageNumberToSearch}&include_adult=false`;
};

export const setEndpointSearchDetailsPerson = (id) => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
};

export const setEndpointSearchImgPerson = (id) => {
  return `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`;
};
