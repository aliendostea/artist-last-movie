export const createArtistAdapter = (artist) => {
  return {
    id: artist.id,
    name: artist.name,
    gender: artist.gender,
    famousMovies: artist.known_for,
    knownForDepartment: artist.known_for_department,
    popularity: artist.popularity,
    img: artist.profile_path,
  };
};
