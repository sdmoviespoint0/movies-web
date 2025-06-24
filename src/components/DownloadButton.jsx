"use client";

import { FaCloudDownloadAlt } from "react-icons/fa";

export default function DownloadButton({ downloadLinks }) {
  const links = downloadLinks || [];

  const renderButton = ({ fileLabel, fileUrl, fileSize, fileId }, index, isTeal) => {
    const buttonClasses = isTeal
      ? "from-teal-800 to-teal-600"
      : "from-blue-500 to-blue-400";
    const formClasses = isTeal ? "bg-gray-200" : "bg-gray-100";

    const isDirectLink = fileUrl.startsWith("http");

    return (
      <div
        key={index}
        className={`${formClasses} font-poppins p-4 py-8 mb-6 rounded shadow-md text-center`}
      >
        <h3 className="text-xl font-bold mb-4">
          <span
            className={`${buttonClasses} bg-gradient-to-t bg-clip-text text-transparent`}
          >
            Fast Server ({fileSize}) ↓
          </span>
        </h3>

        {isDirectLink ? (
          <a
            href={fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClasses} text-xl bg-gradient-to-l text-gray-100 hover:opacity-90 hover:bg-gradient-to-r font-semibold py-2 px-8 rounded-xl shadow-md inline-block transform transition duration-300 hover:-translate-y-0.5`}
          >
            <span className="flex  items-center justify-center">
              <FaCloudDownloadAlt className="text-3xl mr-2" />
              Download {fileLabel}
            </span>
          </a>
        ) : (
          <form
            action="https://pkpics.site/take-me/"
            method="post"
            target="_blank"
          >
            <input type="hidden" name="id" value={fileUrl} />
            <input type="hidden" name="filename" value={fileId} />
            <input type="hidden" name="filesize" value={fileSize} />

            <button
              type="submit"
              className={`${buttonClasses} text-xl bg-gradient-to-l text-gray-100 hover:opacity-90 hover:bg-gradient-to-r font-semibold py-2 px-8 rounded-xl shadow-md transform transition duration-300 hover:-translate-y-0.5`}
            >
              <span className="flex items-center justify-center">
                <FaCloudDownloadAlt className="text-3xl mr-2" />
                Download {fileLabel}
              </span>
            </button>
          </form>
        )}
      </div>
    );
  };

  if (links.length <= 2) {
    return (
      <div className="my-6">
        {links.map((link, index) => renderButton(link, index, index === 1))}
      </div>
    );
  }

  return (
    <div className="text-center my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        {links.map((link, index) => {
  const isTeal = index % 2 !== 0; // even index = teal
  return renderButton(link, index, isTeal);
})}

      </div>
    </div>
  );
}
