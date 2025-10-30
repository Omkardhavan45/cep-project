
import React, { useState } from 'react';

export default function LessonCard({ lesson }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105">
      {!play ? (
        <div className="relative">
          <img
            src={lesson.thumbnail}
            alt={lesson.title}
            className="w-full h-40 object-cover"
          />
          <button
            onClick={() => setPlay(true)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all"
          >
            <span className="text-white text-4xl">▶</span>
          </button>
        </div>
      ) : (
        <div className="w-full h-56">
          <iframe
            className="w-full h-full rounded-t-2xl"
            src={lesson.youtubeUrl.replace('watch?v=', 'embed/')}
            title={lesson.title}
            allowFullScreen
          ></iframe>
        </div>
      )}
     
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
        <div className="flex justify-between">
          <a
            href={lesson.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
          >
            📘 Open Book
          </a>
          {play && (
            <button
              onClick={() => setPlay(false)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              ✖ Stop Video
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

