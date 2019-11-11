export const getRandomImage = image => {
  return `https://picsum.photos/id/10${image + Math.floor(Math.random() * Math.floor(60))}/200?grayscale`;
}