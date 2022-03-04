const divideHabitData = (habitList) => {
  const currentDate = new Date();

  const activeHabitList = habitList.filter((habit) => {
    return (
      new Date(habit.dateList[habit.dateList.length - 1].date) -
        currentDate >=
        60 * 60 * 24 * 1000 ||
      currentDate -
        new Date(habit.dateList[habit.dateList.length - 1].date) <=
        2 * 60 * 60 * 24 * 1000
    );
  });

  const inActiveHabitList = habitList.filter((habit) => {
    return (
      currentDate - new Date(habit.dateList[habit.dateList.length - 1].date) > 2 * 60 * 60 * 24 * 1000
    )
  });

  return [activeHabitList, inActiveHabitList];
};

export default divideHabitData;
