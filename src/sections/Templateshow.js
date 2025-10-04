"use client";
import React from "react";
import Image from "next/image";

const ROWS = [
  [
    { src: "/images/reels/reels03.png", alt: "Reels 1" },
    { src: "/images/reels/reels04.png", alt: "Reels 2" },
    { src: "/images/reels/reels05.png", alt: "Reels 3" },
    { src: "/images/reels/reels09.png", alt: "Reels 4" },
    { src: "/images/reels/reels10.png", alt: "Reels 5" },
    { src: "/images/reels/reels02.png", alt: "Reels 6" },
  ],
  [
    { src: "/images/reels/reels06.png", alt: "Reels 7" },
    { src: "/images/reels/reels07.png", alt: "Reels 8" },
    { src: "/images/reels/reels11.png", alt: "Reels 9" },
    { src: "/images/reels/reels12.png", alt: "Reels 10" },
    { src: "/images/reels/reels01.png", alt: "Reels 11" },
    { src: "/images/reels/reels08.png", alt: "Reels 12" },
  ],
];

export default function TemplateShowcase() {
  return (
    <section className="relative w-full py-16 sm:py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Buat Materi, Iklan, atau Poster untuk sekolah dalam hitungan menit
        </h2>
      </div>

      {/* Wrapper scroll (satu scroll untuk semua row) */}
      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 -z-10" />

        <div className="w-full py-8 md:py-12 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col gap-8">
            {ROWS.map((row, idx) => (
              <div key={idx} className="flex gap-6 snap-x snap-mandatory px-6">
                {row.map((it, j) => (
                  <Card key={j} src={it.src} alt={it.alt} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ src, alt }) {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="snap-center shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/5 shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="h-[180px] w-[380px] md:h-[200px] md:w-[420px] relative">
        {!imgError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 320px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <span className="text-slate-700 font-medium text-lg">{alt}</span>
          </div>
        )}
      </div>
    </div>
  );
}
