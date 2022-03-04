const useGetDateInfo = (dateObject) => {
  return [
    dateObject.getFullYear(),
    dateObject.getMonth() + 1,
    dateObject.getDate(),
  ];
};

export default useGetDateInfo;
