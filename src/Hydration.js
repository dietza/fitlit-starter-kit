class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  calculateAverageWaterIntake(userID) {
    const currentUserHydrationData = [];
    const totalWaterIntake = this.hydrationData.reduce((sum, hydrationInfo) => {
      if (hydrationInfo.userID === userID) {
        currentUserHydrationData.push(hydrationInfo)
        sum += hydrationInfo.numOunces;
      }
      return sum;
    }, 0);
    return Math.floor(totalWaterIntake / currentUserHydrationData.length);
  }

  filterDataByUser(userID) {
    const currentUserHydrationData = this.hydrationData.filter(hydrationInfo => {
      return hydrationInfo.userID === userID
    });
    return currentUserHydrationData;
  }

  findDataByDate(date, currentUserData) {
    const dailyData = currentUserData.find(hydrationInfo => {
      return hydrationInfo.date === date
    });
    return dailyData;
  }

  findWeeklyDataByDate(date, dataSet) {
    const endDate = new Date(date);
    const startDate = new Date(Number(endDate));
    startDate.setDate(startDate.getDate() - 6);
    const weeklyData = dataSet.filter(dataEntry => {
      const dataEntryDate = new Date(dataEntry.date);
      return ((dataEntryDate >= startDate) && (dataEntryDate <= endDate))
    });
    return weeklyData;
  }

  findDailyWaterIntake(userID, date) {
    const currentUserData = this.filterDataByUser(userID);
    const dailyIntake = this.findDataByDate(date, currentUserData);
    return dailyIntake.numOunces;
  }

  findWeeklyWaterIntake(userID, date) {
    const currentUserData = this.filterDataByUser(userID);
    const weeklyData = this.findWeeklyDataByDate(date, currentUserData);
    const weeklyOunceCounts = weeklyData.map(info => info.numOunces)
    return weeklyOunceCounts;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}