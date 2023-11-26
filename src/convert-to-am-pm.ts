export default function convertToAmPm(militaryTime: string): string {
  const [hoursString, minutesString] = militaryTime.split(":");
  const hour = parseInt(hoursString, 10);

  const suffix = hour < 12 ? "am" : "pm";
  const time = hour > 12 ? hour - 12 : hour;
  let finalHour;

  if (time === 0) {
    finalHour = "12";
  } else if (time < 10) {
    finalHour = "0" + time;
  } else {
    finalHour = time.toString();
  }

  return `${finalHour}:${minutesString} ${suffix}`;
}
