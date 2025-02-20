export default function getImageUrl(series, code_name, extension = "png") {
  return `https://ppte.sa/img/${series}/${code_name}.${extension}`;
}
