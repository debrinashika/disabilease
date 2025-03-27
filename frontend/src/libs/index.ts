export const libs = () => {
  const timeStringToMinutes = (timeString: string) => {
    const [hoursStr, minutesStr] = timeString.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    return hours * 60 + minutes;
  }

  const minutesToTimeString = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");

    return `${hoursStr}:${minutesStr}`;
  }

  const formatDateInput = (dateString: string | Date) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
  
    return `${year}-${month}-${day}`;
  }

  const formatDeadline = (dateString: string | Date) => {
    const date = new Date(dateString);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const year = date.getFullYear();
    const month = months[date.getMonth()]; // Get the month name
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
  }

  const formatDeadlineForm = (dateString: string | Date) => {
    const date = dateString.toString();

    const formattedDateString = date.slice(0, 16);
    return formattedDateString;
  }

  const formatTime = (min: number) => {
    const hrs = Math.floor(min / 60);
    const mins = min % 60;

    let formattedTime = '';
    if (hrs > 0) {
        formattedTime += `${hrs} hrs`;
    }
    if (mins > 0) {
        formattedTime += ` ${mins} mins`;
    }
    return formattedTime.trim();
  }

  return {
    timeStringToMinutes,
    minutesToTimeString,
    formatDateInput,
    formatDeadline,
    formatTime,
    formatDeadlineForm
  }
}