const setOtherImageIfIsNull = (img) => {
  if (img === null || img === undefined) return "img-user-avatar.png";

  return img;
};

export default setOtherImageIfIsNull;
