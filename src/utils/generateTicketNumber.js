/**
 * Generate a ticket number based on the week number and a random number.
 */
class TicketNumberGenerator {
  /**
   * Calculate the week number of a given date.
   * @param {Date} date 
   * @returns 
   */
  static getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysSinceFirstDay =
      (date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24);
    return Math.ceil((daysSinceFirstDay + firstDayOfYear.getDay() + 1) / 7);
  }

  /**
   * Generate a 7-digit ticket number. The first two digits are the week number
   * @returns {string} A 7-digit ticket number
   */
  static generate() {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const weekNumber = ("0" + TicketNumberGenerator.getWeekNumber(now)).slice(-2);

    // Generate a random number between 1 and 999 (inclusive)
    let randomDigits = Math.floor(Math.random() * 999) + 1;

    // Keep generating a new random number until it doesn't end in zero
    while (randomDigits % 10 === 0) {
      randomDigits = Math.floor(Math.random() * 999) + 1;
    }

    // Pad the random number with zeros to ensure it has three digits
    const paddedRandomDigits = randomDigits.toString().padStart(3, "0");

    // Combine parts to form the 7-digit number
    const sevenDigitNumber = year + weekNumber + paddedRandomDigits;

    return sevenDigitNumber;
  }
}

export default TicketNumberGenerator;
