export function readFileAsText(file: File | undefined) {
  if (!file) return Promise.resolve(null);
  return new Promise<string | null>((resolve, reject) => {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
}
