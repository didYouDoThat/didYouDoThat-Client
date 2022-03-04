const changeServerEndDateIntoLocalDate = (serverEndDate) => {
  const serverDate = new Date(serverEndDate);
  const localTimezoneOffset = 24 + serverDate.getTimezoneOffset() / 60;

  const localEndDate = new Date(
    serverDate.setHours(serverDate.getHours() + localTimezoneOffset)
  );

  return localEndDate;
};

export default changeServerEndDateIntoLocalDate;
