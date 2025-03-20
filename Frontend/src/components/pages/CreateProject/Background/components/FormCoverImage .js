import React, { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../../../../../src/assets/images/background/1656677703-bpfull.jpg"
const FormCoverImage = ({ currentImage }) => {
    const dispatch = useDispatch();
    // ========== STATE FROM REDUX ========== //
    const project = useSelector((state) => state.project.myProjectDetails);
    console.log("project", project);
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState({
        unit: "px",
        width: 400,
        height: 200,
        x: 0,
        y: 0,
        aspect: 2,
    });
    const imageRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (!crop.width || !crop.height || !imageRef.current) return;
        const canvas = previewCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
        const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
            imageRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [crop]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Ảnh hiện tại */}
            {bg && (
                <div className="mb-4">
                    <img src={bg} alt="Current Cover" className="w-full h-auto object-cover rounded-md" />
                    <p className="text-sm text-gray-600 text-center mt-2">
                        The Cover Image will be used to customize the header of your group.
                    </p>
                </div>
            )}

            {/* Upload & Crop */}
            <div className="bg-gray-100 p-6 rounded-md border-dashed border-2 border-gray-300">
                <div className="flex flex-col items-center gap-4">
                    {!selectedImage ? (
                        <>
                            <p className="text-gray-700">Drop your file here</p>
                            <p className="text-gray-500">or</p>
                        </>
                    ) : (
                        <ReactCrop crop={crop} onChange={setCrop} aspect={2} className="w-full">
                            <img ref={imageRef} src={selectedImage} alt="Preview" className="max-w-full" />
                        </ReactCrop>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="fileInput"
                        className="px-6 py-2 cursor-pointer text-sm bg-blue-600 text-white rounded-md font-semibold">
                        SELECT YOUR FILE
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FormCoverImage;
