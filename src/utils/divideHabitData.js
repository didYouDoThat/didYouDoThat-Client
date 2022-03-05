import changeServerEndDateIntoLocalDate from "./changeServerDateIntoLocalDate";

const divideHabitData = (habitList) => {
  const currentDate = new Date();

  const activeHabitList = habitList.filter((habit) => {
    const localEndDate = changeServerEndDateIntoLocalDate(habit.endDate);

    return (
      localEndDate - currentDate >= 60 * 60 * 24 * 1000 ||
      currentDate - localEndDate <= 60 * 60 * 24 * 1000
    );
  });

  const inActiveHabitList = habitList.filter((habit) => {
    const localEndDate = changeServerEndDateIntoLocalDate(habit.endDate);

    return currentDate - localEndDate > 60 * 60 * 24 * 1000;
  });

  return [activeHabitList, inActiveHabitList];
};

export default divideHabitData;
