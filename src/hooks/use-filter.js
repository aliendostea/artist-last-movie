const useFilter = (stringToSearch, arrayItems) => {
  if (stringToSearch === "") return;

  return arrayItems.filter((obj) => {
    return obj.name.toLowerCase().search(stringToSearch.toLowerCase()) !== -1;
  });
};

export default useFilter;
