const BASE64_IMAGE_REGEX = /<img\s+[^>]*?src="data:image\/[a-zA-Z+.-]+;base64,[a-zA-Z0-9+/=]+".*?\/?>/g;
const DATA_IMAGE_REGEX = /(?<=data:image\/[a-zA-Z+.-]+;base64,)[a-zA-Z0-9+/=]+/g;

export const replaceImgTagWithTempTag = (content: string): string => {
  let count = 0;
  return content?.replace(BASE64_IMAGE_REGEX, () => `<TEMP ${++count}>`);
};

export const extractBase64Images = (content: string): string[] => {
  return content?.match(DATA_IMAGE_REGEX) ?? [];
};

export const convertTagsToMedia = (content: string, images: string[]): string => {
  content = replaceTempTagWithRealImgTag(content, images);
  content = replaceVideoUrlsToIframes(content);
  return content;
};

export const replaceTempTagWithRealImgTag = (content: string, images: string[]): string => {
  return content?.replace(/<TEMP \d+>/g, (match) => {
    const INDEX_OFFSET = 1;
    const matchedNumbers = match.match(/\d+/);
    if (!matchedNumbers) return match;

    const index = parseInt(matchedNumbers[0], 10) - INDEX_OFFSET;
    const isValidIndex = index >= 0 && index < images.length;
    return isValidIndex ? `<img src="${images[index]}" />` : match;
  });
};

const replaceVideoUrlsToIframes = (content: string): string => {
  return content.replace(/<oembed url="([^"]+)"><\/oembed>/g, (match, url) => {
    if (url.match(/(youtube\.com|youtu\.be|vimeo\.com)/)) {
      let videoUrl = "";
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.split("/").pop()?.split("watch?v=")[1] || url.split("/").pop();
        videoUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("vimeo.com")) {
        const videoId = url.split("/").pop();
        videoUrl = `https://player.vimeo.com/video/${videoId}`;
      }
      return `<iframe src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="no-tailwind video-iframe"></iframe>`;
    }
    return match;
  });
};
