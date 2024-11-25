export const dataURLToFile = async (
  dataURL: string,
  fileName: string
): Promise<File> => {
  const response = await fetch(dataURL);
  const blob = await response.blob();

  return new File([blob], fileName, { type: blob.type });
};
