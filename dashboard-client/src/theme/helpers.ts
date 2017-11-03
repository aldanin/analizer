export const addAlpha = (hexColor: string, opacity: number) => {

  let red = 255;
  let green = 255;
  let blue = 255;

  switch (hexColor.length) {
    case 4:
      red = parseInt(hexColor.substring(1, 2) + hexColor.substring(1, 2), 16);
      green = parseInt(hexColor.substring(2, 3) + hexColor.substring(2, 3), 16);
      blue = parseInt(hexColor.substring(3, 4) + hexColor.substring(3, 4), 16);
      opacity = opacity > 1 ? 1 : opacity;
      opacity = opacity < 0 ? 0 : opacity;
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;

    case 7:
      red = parseInt(hexColor.substring(1, 3), 16);
      green = parseInt(hexColor.substring(3, 5), 16);
      blue = parseInt(hexColor.substring(5, 7), 16);
      opacity = opacity > 1 ? 1 : opacity;
      opacity = opacity < 0 ? 0 : opacity;
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;

    default:
      return `rgb(${red}, ${green}, ${blue})`;
  }
};
