// From https://raw.githubusercontent.com/maryayi/vue-sweet-calendar/master/src/DateTime.js

export default class DateTime {
  _date: any;
  constructor(...args: any) {
    let date;
    if (args.length > 1) {
      let [year, month, ...rest] = args;
      date = new Date(year, month - 1, ...rest);
    } else if (args.length === 1) {
      date = new Date(args);
    }
    date.setHours(0, 0, 0, 0);
    this._date = date;
  }

  getMonth() {
    return this._date.getMonth() + 1;
  }

  getDay() {
    return this._date.getDay() + 1;
  }

  getMonthName(mode = 'long') {
    return this._date.toLocaleString('en-US', { month: mode });
  }

  getFullYear() {
    return this._date.getFullYear();
  }

  getDate() {
    return this._date.getDate();
  }

  getTime() {
    return this._date.getTime();
  }

  getDayName(mode = 'long') {
    return this._date.toLocaleString('en-US', { weekday: mode });
  }

  getNextDay() {
    let day = new DateTime(this.getTime());
    day.setDate(day.getDate() + 1);
    return day;
  }

  getPrevDay() {
    let day = new DateTime(this.getTime());
    day.setDate(day.getDate() - 1);
    return day;
  }

  setDate(date) {
    this._date.setDate(date);
    return this.getTime();
  }

  isInRange(start, end, repeat = 'never') {
    let startDate = new DateTime(start);
    let endDate = new DateTime(end);
    let currentTime = this.getTime();
    let startTime;
    let endTime;
    let startCheck;
    let endCheck;
    switch (repeat) {
      case 'monthly':
        startTime = new DateTime(this.getFullYear(), this.getMonth(), startDate.getDate()).getTime();
        endTime = new DateTime(this.getFullYear(), this.getMonth(), endDate.getDate()).getTime();
        startCheck = currentTime >= startTime;
        endCheck = currentTime <= endTime;
        return startCheck && endCheck;

      case 'yearly':
        startTime = new DateTime(this.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
        endTime = new DateTime(this.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
        startCheck = currentTime >= startTime;
        endCheck = currentTime <= endTime;
        return startCheck && endCheck;

      case 'never':
        startCheck = currentTime >= startDate.getTime();
        endCheck = currentTime <= endDate.getTime();
        return startCheck && endCheck;

      default:
        startCheck = currentTime >= startDate.getTime();
        endCheck = currentTime <= endDate.getTime();
        return startCheck && endCheck;
    }
  }

  toDateString() {
    return this._date.toDateString();
  }

  toDate() {
    return this._date;
  }

  toISOString() {
    return this._date.toISOString();
  }

  getTimezoneOffset() {
    return this._date.getTimezoneOffset();
  }
  getNumberOfDaysInMonth() {
    return new DateTime(this.getFullYear(), this.getMonth() + 1, 0).getDate();
  }

  getFirstWeekdayOfMonth() {
    return new DateTime(this.getFullYear(), this.getMonth(), 1).getDay();
  }
}
