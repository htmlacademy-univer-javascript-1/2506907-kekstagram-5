function isMeetingTime (startOfDay, endOfDayy, meetingStart, duration) {
  function timeToMinutes (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const startDayMinutes = timeToMinutes(startOfDay);
  const endDayMinutes = timeToMinutes(endOfDayy);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return startDayMinutes <= meetingStartMinutes && endDayMinutes >= meetingEndMinutes;
}

isMeetingTime();
