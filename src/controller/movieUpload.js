// Helper function to handle fetch requests with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
};

// Function to fetch all movies
export const getMovies = async () => {
  try {
    const data = await fetchWithErrorHandling("/api/movies");
    return data.movies || [];
  } catch (error) {
    return { error: error.message || "Failed to fetch movies" };
  }
};

// Function to upload a new movie
export const uploadMovie = async (formData) => {
  try {
    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "Failed to upload movie" };
    }

    return await response.json();
  } catch (error) {
    return { message: error.message || "An error occurred while uploading the movie" };
  }
};
