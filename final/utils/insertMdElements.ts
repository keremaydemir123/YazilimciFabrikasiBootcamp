type Props = {
  text: string;
  type: "css" | "js" | "html";
};

export default function insertMdElements({ text, type }: Props) {
  let newText: string;

  switch (type) {
    case "css":
      newText = `~~~css\n${text}\n~~~`;
      break;
    case "js":
      newText = `~~~js\n${text}\n~~~`;
      break;
    case "html":
      newText = `~~~html\n${text}\n~~~`;
      break;

    default:
      newText = text;
      break;
  }

  return newText;
}
