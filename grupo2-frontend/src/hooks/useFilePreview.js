import { useEffect, useState } from 'react'

export const usePreviewImage = () => {
  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  
  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  const addHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles([...imageFiles, ...validImageFiles]);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  const removeHandler = (i) => {
    setImageFiles(imageFiles.filter((_, index) => index !== i))
    return
  }
  
  useEffect(() => {
  const fileReaders = [];
  let isCancel = false;
  if (imageFiles.length) {
    const promises = imageFiles.map(file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            resolve(result);
          }
        }
        fileReader.onabort = () => {
          reject(new Error("File reading aborted"));
        }
        fileReader.onerror = () => {
          reject(new Error("Failed to read file"));
        }
        fileReader.readAsDataURL(file);
      })
    });
    Promise
      .all(promises)
      .then(images => {
        if (!isCancel) {
          setImages(images);
        }
      })
      .catch(reason => {
      });
  } else { setImages([]) }; 
  
  return () => {
    isCancel = true;
    fileReaders.forEach(fileReader => {
      if (fileReader.readyState === 1) {
        fileReader.abort()
      }
    })
  }
}, [imageFiles]);

  return { images, imageFiles, changeHandler, removeHandler, addHandler }
}

// use preview image hook
/* 
-------------------
  const ResourcePic = usePreviewImage()
  return (
  <input
    type='file'
    accept='png'
    onChange={e => ResourcePic.setPreview(e.target.files && e.target.files[0])}
    />
    {ResourcePic.previewImage && (
    <img src={ResourcePic.previewImage} alt='preview' 
    />
-------------------
)}
*/
