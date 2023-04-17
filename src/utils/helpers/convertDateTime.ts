export function convertDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const time = date.toLocaleTimeString();
  const dateString = date.toLocaleDateString();

  return `${time} ${dateString}`;
}
