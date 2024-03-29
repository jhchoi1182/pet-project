const BASE64_IMAGE_REGEX = /<img\s+[^>]*?src="data:image\/[a-zA-Z+.-]+;base64,[a-zA-Z0-9+/=]+".*?\/?>/g;
const DATA_IMAGE_REGEX = /(?<=data:image\/[a-zA-Z+.-]+;base64,)[a-zA-Z0-9+/=]+/g;

export const replaceImgTagWithTempTag = (content: string): string => {
  let count = 0;
  return content.replace(BASE64_IMAGE_REGEX, () => `<TEMP ${++count}>`);
};

export const extractImages = (content: string): string[] => {
  return content.match(DATA_IMAGE_REGEX) ?? [];
};

export const replaceTempTagWithRealImgTag = (content: string, imgArr: string[]): string => {
  return content.replace(/<TEMP \d+>/g, (match) => {
    const INDEX_OFFSET = 1;
    const matchedNumbers = match.match(/\d+/);
    if (!matchedNumbers) return match;

    const index = parseInt(matchedNumbers[0], 10) - INDEX_OFFSET;
    return index >= 0 && index < imgArr.length ? imgArr[index] : match;
  });
};
