export const getScoreColor = (score) => {
  if (score === null || score === undefined) return "#d9d9d9"; // No score
  if (score < 50) return "#ff4d4d"; // Red
  if (score < 75) return "#ffcc00"; // Yellow
  return "#00ce67ff"; // Green
};

// Kalau text review diatas maxLength character, maxLength+1 - N char digantikan menjadi '...' 
export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
