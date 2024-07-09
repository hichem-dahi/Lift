export const resizeAvatar = async (file: File, filename: string): Promise<File | undefined> => {
  return new Promise((resolve, reject) => {
    let imageFile: File | undefined;
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = document.createElement("img");
      
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        canvas.width = 100;
        canvas.height = 100;
        ctx!.drawImage(img, 0, 0, 100, 100);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              imageFile = blobToFile(blob, filename);
              resolve(imageFile);
            } else {
              reject(new Error("Canvas toBlob failed"));
            }
          },
          "image/jpeg",
          1
        );
      };

      img.onerror = function () {
        reject(new Error("Image load error"));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = function () {
      reject(new Error("FileReader error"));
    };

    reader.readAsDataURL(file);
  });
};

export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type });
}
