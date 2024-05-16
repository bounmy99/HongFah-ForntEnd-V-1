import react, { useState } from "react";

export const CaruselAdd = ({ images, handleChangeImage, imagePreview }) => {

    // console.log("Images Length", images.length)

    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {

        // console.log("newIndex", newIndex)

        if (newIndex < 0) {
            newIndex = 0
        } else if (newIndex >= images.length) {
            newIndex = images.length - 1
        }

        setActiveIndex(newIndex);
    }

    return (
        <>
            <div className="carusel">
                <div className="inner" onClick={() => document.querySelector(".input-file").click()} style={{ transform: `translate(-${activeIndex * 100}%)` }}>
                    <input type="file" multiple accept="images/*" className="input-file" hidden onChange={handleChangeImage} />
                    {!images[0] && <img src={imagePreview}  className="img-fluid" />}
                    {images && images.map((img, index) => (
                        <div key={index} className="carousel-item">
                            <img src={img} alt={img} className="img-slider" />
                        </div>
                    ))}

                </div>
                {images.length > 1 &&

                    <div className="carusel-btn">

                        <div className="btn-left" onClick={() => {
                            updateIndex(activeIndex - 1)
                        }}>
                            <i className='bx bx-chevron-left'></i>
                        </div>


                        {images && images.map((item, index) => (
                            <div key={index}>
                                <div className={`btn-dots ${index === activeIndex
                                    ? "active"
                                    : ""
                                    }`} onClick={() => {
                                        updateIndex(index);
                                    }}>
                                    <i className='bx bxs-circle'></i>
                                </div>
                            </div>
                        ))}


                        <div className="btn-right" onClick={() => {
                            updateIndex(activeIndex + 1)
                        }}>
                            <i className='bx bx-chevron-right'></i>

                        </div>
                    </div>
                }
            </div>
        </>
    )
}