export default function base64ToFile(base64String, fileName = "image.jpeg") {
 // Split the base64 string to get the content type and base64 data
 const [metadata, base64Data] = base64String.split(',');
 const contentType = metadata.match(/:(.*?);/)[1];
 const binaryString = atob(base64Data); // Decode the base64 string
 const byteNumbers = new Uint8Array(binaryString.length);

 // Convert binary string to a byte array
 for (let i = 0; i < binaryString.length; i++) {
  byteNumbers[i] = binaryString.charCodeAt(i);
 }

 // Create a Blob
 const blob = new Blob([byteNumbers], { type: contentType });

 // Optionally, convert the Blob to a File
 const file = new File([blob], fileName, { type: contentType });
 return file;
}