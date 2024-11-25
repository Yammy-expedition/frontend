export function fileToDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string); // 결과를 데이터 URL로 반환
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file); // Blob을 데이터 URL로 읽기
  });
}
