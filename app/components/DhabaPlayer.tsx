"use client";

import { useState } from "react";
import { songs } from "../data/songs";

export function DhabaPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = songs[currentIndex];

  function playSong(index: number) {
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  function playPrevious() {
    setCurrentIndex((index) => (index === 0 ? songs.length - 1 : index - 1));
    setIsPlaying(true);
  }

  function playNext() {
    setCurrentIndex((index) => (index === songs.length - 1 ? 0 : index + 1));
    setIsPlaying(true);
  }

  return (
    <>
      <p className="mb-5 text-center text-sm uppercase tracking-[0.4em] text-white/60">
        Long drives | Old songs | Good memories
      </p>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur-md">
        <div className="mb-5 flex items-center gap-4">
          <div
            className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center shadow-[0_0_35px_rgba(213,168,92,0.14)]"
            style={{
              backgroundImage: "url('/dhaba-food-beer.png')",
            }}
          />

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d5a85c]">
              Dhaba Table
            </p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Dahba dinner and late evening songs.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d5a85c]">
            Now Playing
          </p>

          <h2 className="mt-3 text-2xl font-bold">{currentSong.title}</h2>

          <p className="mt-1 text-sm text-white/60">
            {currentSong.artist} | {currentSong.mood}
          </p>
        </div>

        <div className="mt-7">
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <div
              className={`h-full bg-[#d5a85c] transition-all ${
                isPlaying ? "w-[45%]" : "w-[18%]"
              }`}
            />
          </div>

          <div className="mt-2 flex justify-between text-xs text-white/40">
            <span>{isPlaying ? "2:18" : "0:00"}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={playPrevious}
            className="text-2xl text-white/70 transition hover:text-white"
            aria-label="Previous song"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            className="flex h-14 min-w-14 items-center justify-center rounded-full bg-[#d5a85c] px-5 text-sm font-black uppercase tracking-wider text-black transition hover:scale-105"
            aria-label={isPlaying ? "Pause song" : "Play song"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={playNext}
            className="text-2xl text-white/70 transition hover:text-white"
            aria-label="Next song"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
            Tonight&apos;s Playlist
          </h3>

          <span className="text-xs text-white/40">{songs.length} songs</span>
        </div>

        <div className="max-h-[340px] overflow-y-auto divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur">
          {songs.map((song, index) => {
            const isCurrentSong = index === currentIndex;

            return (
              <button
                key={song.title}
                type="button"
                onClick={() => playSong(index)}
                className={`flex w-full items-center gap-4 px-4 py-4 text-left transition ${
                  isCurrentSong ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <span
                  className={`w-6 text-xs ${
                    isCurrentSong ? "text-[#d5a85c]" : "text-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{song.title}</span>
                  <span className="mt-1 block truncate text-xs text-white/40">
                    {song.artist}
                  </span>
                </span>

                <span
                  className={`text-xs uppercase tracking-wider ${
                    isCurrentSong ? "text-[#d5a85c]" : "text-white/30"
                  }`}
                >
                  {isCurrentSong && isPlaying ? "Live" : "Play"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}