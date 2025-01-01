"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Icon} from "@iconify/react";
import withAuth from "@/components/withAuth";

const CreateMovie = () => {
    const [movieTitle, setMovieTitle] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState("");
    const [imageError, setImageError] = useState(""); // To handle image validation errors

    const router = useRouter();

    const handleImageChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            // Validate image type
            const validTypes = ["image/jpeg", "image/png"];
            if (!validTypes.includes(file.type)) {
                setImageError("Only PNG and JPG images are allowed.");
                setImage(null);
                setImageBase64("");
                return;
            }

            setImageError(""); // Clear any previous error

            setImage(file);

            // Convert image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result); // Store the base64 string
            };
            reader.readAsDataURL(file); // Convert the image to base64 format
        }
    };

    const handleSubmit = async () => {
        if (!movieTitle || !publishYear || !imageBase64) {
            alert("Please fill all the fields.");
            return;
        }

        const movieData = {
            title: movieTitle,
            image: imageBase64, // Sending base64 image
            year: publishYear,
        };

        try {
            // Sending POST request to your movie endpoint
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies`, movieData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                // Reset form
                setMovieTitle("");
                setPublishYear("");
                setImage(null);
                setImageBase64("");
                router.back();
            } else {
                alert("Failed to create movie.");
            }
        } catch (error) {
            console.error("Error while creating movie:", error);
            alert("Something went wrong.");
        }
    };

    const onCancel = () => {
        router.back()
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Title */}
            <div className="md:container md:m-auto px-6 md:px-0 md:max-w-max">
                <div className="mb-32">
                    <h1 className="text-3xl  font-montserrat font-semibold relative top-16 md:top-32 mb-16 md:mb-36">Create a New Movie</h1>
                </div>

                {/* Form Fields - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-44">
                    {/* Column 1 - Image */}
                    <div className="flex items-center">
                        <div
                            className="w-full md:w-[400px] h-[400px] border-2 border-dashed border-white-600 flex flex-col justify-center items-center text-center bg-input cursor-pointer mb-16 md:mb-0"
                            onClick={() => document.getElementById("file-input").click()}
                            style={{
                                backgroundImage: imageBase64 ? `url(${imageBase64})` : "none",
                                backgroundColor: imageBase64 ? "transparent" : "#224957", // Set background color before image is selected
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* SVG Icon above the text */}
                            {!imageBase64 && (
                                <Icon icon="material-symbols:download-sharp"  width="24" height="24" />
                            )}
                            <p className="text-white text-sm">{imageBase64 ? "Image selected" : "Select Image"}</p>

                            {/* Hidden file input */}
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    {/* Column 2 - Title and Year */}
                    <div className="flex flex-col  space-y-6">
                        <div className="flex flex-col w-full md:w-84">
                            <input
                                type="text"
                                id="movie-title"
                                value={movieTitle}
                                onChange={(e) => setMovieTitle(e.target.value)}
                                className="bg-input text-white p-3 rounded-lg focus:outline-none"
                                placeholder="Title"
                            />
                        </div>
                        <div className="flex flex-col w-full md:w-64">
                            <input
                                type="number"
                                id="publish-year"
                                value={publishYear}
                                onChange={(e) => setPublishYear(e.target.value)}
                                className="bg-input text-white p-3 rounded-lg focus:outline-none"
                                placeholder="Publish Year"
                            />
                        </div>

                        {/* Image error message */}
                        {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

                        <div className="flex items-center mt-12 space-x-6">
                            {/* Cancel Button - Outlined */}
                            <button
                                onClick={onCancel}
                                className="border-2 w-full md:w-48 border-white-600 text-white-600 py-3 px-10 rounded-md hover:bg-white-600 hover:text-gray-400 focus:outline-none"
                            >
                                Cancel
                            </button>

                            {/* Submit Button - Primary */}
                            <button
                                onClick={handleSubmit}
                                className="bg-primary w-full md:w-48 text-white py-3 px-10 rounded-md hover:bg-green-600 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(CreateMovie)