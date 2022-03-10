const changeServerEndDateIntoLocalDate = (serverEndDate) => {
  const serverDate = new Date(serverEndDate);

  const localEndDate = new Date(
    serverDate.setHours(serverDate.getHours() + 24)
  );

  return localEndDate;
};

export default changeServerEndDateIntoLocalDate;
