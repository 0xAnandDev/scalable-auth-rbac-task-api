/**
 * Formats a Date instance or ISO date string into a human-readable format.
 * E.g., '2026-07-01' -> 'Jul 1, 2026'
 * 
 * @param {string|Date} dateVal - Date target to format.
 * @returns {string} Formatted date.
 */
export const formatDate = (dateVal) => {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Truncate long strings of text.
 * 
 * @param {string} text - The input string.
 * @param {number} limit - Character limit to truncate at.
 * @returns {string} Truncated string with ellipsis.
 */
export const truncateText = (text, limit = 100) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};

export default {
  formatDate,
  truncateText,
};
