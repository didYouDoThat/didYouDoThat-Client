const divideHabitData = (habitList) => {
  const currentDate = new Date();

  const activeHabitList = habitList.filter((habit) => {
    const serverEndDate = new Date(habit.endDate);
    const localTimezoneOffset = 24 + serverEndDate.getTimezoneOffset() / 60;

    const localEndDate = new Date(
      serverEndDate.setHours(serverEndDate.getHours() + localTimezoneOffset)
    );

    return (
      localEndDate - currentDate >= 60 * 60 * 24 * 1000 ||
      currentDate - localEndDate <= 2 * 60 * 60 * 24 * 1000
    );
  });

  // const inActiveHabitList = habitList.filter((habit) => {
  //   const serverEndDate = new Date(habit.endDate);
  //   const localTimezoneOffset = 24 + serverEndDate.getTimezoneOffset() / 60;

  //   const localEndDate = new Date(
  //     serverEndDate.setHours(serverEndDate.getHours() + localTimezoneOffset)
  //   );
    
  //   return currentDate - localEndDate > 2 * 60 * 60 * 24 * 1000;
  // });

  return activeHabitList;
};

export default divideHabitData;
