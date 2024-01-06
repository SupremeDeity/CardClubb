import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 4 / 3 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleImageLoaded = (img) => {
    // Do something when the image has loaded
  };

  const handleCropComplete = (crop, pixelCrop) => {
    // Do something when the user completes the crop (e.g., update state with pixelCrop)
  };

  const handleCropImage = async () => {
    if (image && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImage(image, crop);
      setCroppedImage(croppedImageUrl);
    }
  };

  const getCroppedImage = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <div>
          <ReactCrop
            src={image}
            crop={crop}
            onImageLoaded={handleImageLoaded}
            onComplete={handleCropComplete}
            onChange={handleCropChange}
          />
          <br />
          <button onClick={handleCropImage}>Crop Image</button>
          <br />
          <div>
            <h2>Original Image</h2>
            <img src={image} alt="Original" style={{ maxWidth: '100%' }} />
          </div>
          <br />
          {croppedImage && (
            <div>
              <h2>Cropped Image</h2>
              <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
