export default (str: string) => {
  return toNormalCase(str);
}


function toNormalCase(str: string) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  // 1. Replace all underscores (_) and hyphens (-) with a space.
  // This handles snake_case and kebab-case.
  let tempStr = str.replace(/[-_]/g, ' ');

  // 2. Insert a space before all capital letters that are not at the start
  // and are preceded by a lowercase letter.
  // This handles camelCase and PascalCase.
  tempStr = tempStr.replace(/([a-z])([A-Z])/g, '$1 $2');

  // 3. Normalize to lowercase and then capitalize the first letter of each word (Title Case).
  // This also handles any remaining PascalCase (capital first letter) or camelCase (lowercase first letter).
  return tempStr
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Check if word is not empty to avoid errors
      if (word.length === 0) {
        return '';
      }
      // Capitalize the first letter and concatenate the rest of the word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
