"use client";

import { useState, useEffect } from "react";

const images = [
  "/hero1.jpeg",
  "/hero2.jpeg",
  "/hero3.jpeg",
  "/hero4.jpeg",
  "/hero5.jpeg",
  "/hero6.jpeg",
  "/hero7.jpeg",
  "/hero8.jpeg",
  "/hero9.jpeg"
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Ganti gambar setiap 4 detik
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-3xl shadow-lg border-4 border-white z-10 overflow-hidden bg-gray-100">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Hero Image ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      
      {/* Indikator Carousel */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-brand-orange w-6" : "bg-white/70 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
