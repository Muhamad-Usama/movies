"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {Icon} from "@iconify/react";
import withAuth from "@/components/withAuth";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMovies, setTotalMovies] = useState(0); // Total number of movies for pagination
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const MOVIES_PER_PAGE = 8;

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?page=${currentPage}&limit=${MOVIES_PER_PAGE}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                setMovies(response?.data?.movies ?? []);
                setTotalMovies(response?.data?.total);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setLoading(false);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const logout = () => {
        console.log("logout");
        localStorage.removeItem('auth_token');
        window.location.href = "/";
    };

    const onNewMovieClicked = () => {
        router.push("/movies/create");
    };

    const onUpdateMovieClicked = (movie) => {
        router.push(`/movies/update/${movie._id}`);
    };

    // Pagination controls
    const totalPages = Math.ceil(totalMovies / MOVIES_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    function handlePageChange(number) {
        setCurrentPage(number)
    }

    return (
        <div className="min-h-screen bg-background text-white">
            {/* Logout Button */}
            <div className="absolute right-6 top-6 z-10 flex items-center space-x-4 cursor-pointer text-white hover:text-gray-300" onClick={logout}>
                <button className="text-bodySm font-montserrat  ">Logout</button>
                <Icon icon="ic:round-logout" width="20" height="20" />
            </div>

            {/* Header */}
            <div className="flex items-center mb-24 relative top-24 left-24 space-x-4">
                <h1 className="text-h4 font-montserrat font-semibold">My Movies</h1>
                <Icon icon="zondicons:add-outline" className="text-white hover:text-gray-300 cursor-pointer" width="20" height="20" onClick={onNewMovieClicked} />
            </div>

            {/* Index Grid */}
            <div className="px-6 py-12">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : movies?.length === 0 ? (
                    <div className="flex flex-col items-center space-y-6">
                        <h2 className="text-h4 font-montserrat font-semibold text-center">
                            Your movie list is empty
                        </h2>
                        <button
                            onClick={onNewMovieClicked}
                            className="w-72 h-11 bg-primary text-background font-semibold text-bodyRg rounded-[10px] hover:bg-green-600"
                        >
                            Add a New Movie
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {movies?.map((movie) => (
                            <div
                                key={movie.title}
                                className="bg-card rounded-md shadow-md p-4 flex flex-col cursor-pointer"
                                onClick={() => onUpdateMovieClicked(movie)}
                            >
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-60 object-cover rounded-md"
                                />
                                <h3 className="text-bodyRg font-semibold mt-8">{movie.title}</h3>
                                <p className="text-bodySm text-gray-300 mt-8">{movie.year}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}

                {
                    totalMovies > 8 && <div className="flex justify-center space-x-4 mt-32">
                        {/* Previous Button */}
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="text-white font-semibold py-2 px-4 disabled:text-gray-500"
                        >
                            Prev
                        </button>

                        {/* Page Number Buttons */}
                        {Array.from({length: totalPages}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`text-white font-semibold py-4 px-8 md:py-8 md:px-16 rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-input'}`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="text-white font-semibold py-2 px-4 rounded-lg disabled:text-gray-500"
                        >
                            Next
                        </button>
                    </div>
                }


            </div>
        </div>
    );
};

export default withAuth(Movies);
