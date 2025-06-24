"use client";

import { useState } from "react";
import { uploadMovie } from "@/controller/movieUpload";

export default function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    poster: [],
    released: "",
    length: "",
    qualityType: "",
    genre: [],
    language: [],
    actors: [],
    imdbRating: "",
    plot: "",
    downloadLinks: [],
    trailer: "",
     type: "movie",       // <-- NEW
  whoWatch: "Family",  // <-- NEW
  industry: "",
  });

  const apiKey = "c694f8e9";

  const fetchMovieData = async () => {
    if (!formData.title.trim()) return;

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${formData.title}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setFormData((prev) => ({
          ...prev,
          released: data.Released || "",
          length: data.Runtime || "",
          imdbRating: data.imdbRating || "",
          plot: data.Plot || "",
          genre: data.Genre ? data.Genre.split(",").map((s) => s.trim()) : [],
          language: data.Language
            ? data.Language.split(",").map((s) => s.trim())
            : [],
          actors: data.Actors
            ? data.Actors.split(",").map((s) => s.trim())
            : [],
          poster: data.Poster ? [data.Poster] : [],
        }));
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to fetch movie data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handleArrayChange = (e, key) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({ ...prev, [key]: values }));
  };

  const handleMovieDownloadChange = (index, field, value) => {
  const updatedLinks = [...formData.downloadLinks];
  updatedLinks[index][field] = value.trim();

  setFormData({
    ...formData,
    downloadLinks: updatedLinks,
  });
};

const addMovieDownloadLinkField = () => {
  const updatedLinks = [
    ...(formData.downloadLinks || []),
    { fileId: '', fileLabel: '720P', fileUrl: 'sdshare.cfd/s',fileSize: '1.2 GB' },
  ];

  setFormData({
    ...formData,
    downloadLinks: updatedLinks,
  });
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Submite Data:", formData);
    // Submit logic here
    const response = await uploadMovie(formData);
        console.log("Response Data:", response);

  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white text-black shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">Movie Form</h2>
      <button
        type="button"
        onClick={fetchMovieData}
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Search Movie Info
      </button>

      {[
  { label: "Title", name: "title", placeholder: "e.g. The Dark Knight" },
  { label: "Trailer URL", name: "trailer", placeholder: "e.g. NwtHgGjRbUo" },
  { label: "Released", name: "released", placeholder: "e.g. May 16, 2025" },
  { label: "Length", name: "length", placeholder: "e.g. 2h 32m" },
  { label: "QualityType", name: "qualityType", placeholder: "e.g. HD Web-DL" },
  { label: "IMDb Rating", name: "imdbRating", placeholder: "e.g. 9.0" },
  { label: "Industry", name: "industry", placeholder: "e.g. Hollywood/Bollywood" },
].map(({ label, name, placeholder }) => (
  <div key={name}>
    <label className="block mb-1 font-semibold">{label}</label>
    <input
      name={name}
      value={formData[name]}
      placeholder={placeholder}
      onChange={handleChange}
      onDoubleClick={(e) => e.target.select()}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
))}

      <div>
        <label className="block mb-1 font-semibold">Plot / Summary</label>
        <textarea
          name="plot"
          value={formData.plot}
          onChange={handleChange}
          onDoubleClick={(e) => e.target.select()}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
       {/* ✅ NEW FIELD: Type */}
  <div>
    <label className="block mb-1 font-semibold">Type</label>
    <select
      name="type"
      value={formData.type}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="movie">Movie</option>
      <option value="season">Season</option>
    </select>
  </div>

  {/* ✅ NEW FIELD: Who Can Watch */}
  <div>
    <label className="block mb-1 font-semibold">Who Can Watch</label>
    <select
      name="whoWatch"
      value={formData.whoWatch}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Family">Family</option>
      <option value="Kids">Kids</option>
      <option value="Adult">Adult</option>
    </select>
  </div>
      {[
        { label: "Poster URL", key: "poster" },
        { label: "Genres", key: "genre" },
        { label: "Languages", key: "language" },
        { label: "Actors", key: "actors" },
      ].map(({ label, key, type }) => (
        <div key={key}>
          <label className="block mb-1 font-semibold">
            {label} (comma-separated)
          </label>
          {type === "textarea" ? (
            <textarea
              value={formData[key].join(", ")}
              onChange={(e) => handleArrayChange(e, key)}
              onDoubleClick={(e) => e.target.select()}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <input
              value={formData[key].join(", ")}
                placeholder={`e.g. ${label === "Poster URL" ? "https://example.com/poster.jpg" : label === "Genres" ? "Action, Crime" : label === "Languages" ? "English, Hindi" : "Christian Bale, Heath Ledger"}`}
              onChange={(e) => handleArrayChange(e, key)}
              onDoubleClick={(e) => e.target.select()}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      {/* Download Links for Movie */}
{formData.downloadLinks.length > 0 && (
  <div>
    <label className="block mb-2 font-semibold">Download Links</label>
    {formData.downloadLinks.map((linkObj, index) => (
      <div key={index} className="flex space-x-3 mb-3">
        <input
          placeholder="File ID: (e.g. 955030a8)"
          value={linkObj.fileId}
          onChange={(e) =>
            handleMovieDownloadChange(index, 'fileId', e.target.value)
          }
          className="w-1/4 p-2 border rounded"
        />
        <input
          placeholder="Label (e.g. 720P)"
          value={linkObj.fileLabel}
          onChange={(e) =>
            handleMovieDownloadChange(index, 'fileLabel', e.target.value)
          }
          className="w-1/4 p-2 border rounded"
        />
        <input
          placeholder="File Size (e.g. 1.2 GB)"
          value={linkObj.fileSize}
          onChange={(e) =>
            handleMovieDownloadChange(index, 'fileSize', e.target.value)
          }
          className="w-1/4 p-2 border rounded"
        />
        <input
          placeholder="URL"
          value={linkObj.fileUrl}
          onChange={(e) =>
            handleMovieDownloadChange(index, 'fileUrl', e.target.value)
          }
          className="w-2/4 p-2 border rounded"
        />
      </div>
    ))}
  </div>
)}

<button
  type="button"
  onClick={addMovieDownloadLinkField}
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Add Download Link
</button>


      <div className="text-center">
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
        
      </div>
    </form>
  );
}
