import { useEffect, useState } from 'react';

const RandomImageGoldPrice = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const numberOfImages = 71; // Total number of images

  useEffect(() => {
    // Set intervals for image change and gold price fetch
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % numberOfImages);
    }, 8000); // Change image every 8 seconds
    // Clear intervals on component unmount
    return () => {
      clearInterval(imageInterval);
    };
  }, []);


  return (
    <div className="main-content" id="main-content">
      <img
        id="random-image"
        src={`./img/img${currentImageIndex + 1}.jpg`}
        alt="Random"
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default RandomImageGoldPrice;
