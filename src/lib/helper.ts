export function formatTimestamptToDDMMYYYY(input: string, separator: string): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) return input; // fallback

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}

export function toTitleCase(str: string) {
  // Convert the whole string to lowercase first for consistent results
  const words = str.toLowerCase().split(' ');

  const capitalizedWords = words.map(word => {
    if (word.length === 0) return '';
    // Capitalize the first letter and add the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
}