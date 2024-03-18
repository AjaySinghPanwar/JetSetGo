export const formatTotalTime = (totalTime: string) => {
  if (totalTime.includes('hours') && totalTime.includes('minutes')) {
    const replacedText = totalTime.replace('hours', 'h');
    return replacedText.replace('minutes', 'm');
  } else if (totalTime.includes('hours')) {
    return totalTime.replace('hours', 'h');
  } else if (totalTime.includes('minutes')) {
    return totalTime.replace('minutes', 'm');
  }
};
