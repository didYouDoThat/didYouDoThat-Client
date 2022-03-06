import NUMBERS from "../constants/numbers";
import changeServerEndDateIntoLocalDate from "./changeServerDateIntoLocalDate";

const divideHabitData = (habitList) => {
  const currentDate = new Date();

  const activeHabitList = habitList.filter((habit) => {
    const localEndDate = changeServerEndDateIntoLocalDate(habit.endDate);

    return (
      localEndDate - currentDate >= NUMBERS.timeForOneDay ||
      currentDate - localEndDate <= NUMBERS.timeForOneDay
    );
  });

  return activeHabitList;
};

export default divideHabitData;
