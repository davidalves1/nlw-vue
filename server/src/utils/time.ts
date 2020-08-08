export const convertHoursToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return minutes + (hours * 60);
}
