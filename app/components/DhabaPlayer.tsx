"use client";

import { useEffect, useRef, useState } from "react";
import { songs } from "../data/songs";

export function DhabaPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = songs[currentIndex];

  // Load the new song whenever currentIndex changes
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  function playSong(index: number) {
    setCurrentIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
  }

  function playPrevious() {
    setCurrentIndex((index) =>
      index === 0 ? songs.length - 1 : index - 1
    );
    setIsPlaying(true);
    setCurrentTime(0);
  }

  function playNext() {
    setCurrentIndex((index) =>
      index === songs.length - 1 ? 0 : index + 1
    );
    setIsPlaying(true);
    setCurrentTime(0);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  }

  function handleSongEnded() {
    playNext();
  }

  function handleSeek(event: React.ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value);

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function formatTime(time: number) {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <>
      {/* Actual audio player - hidden because we use our own controls */}
      <audio
        ref={audioRef}
        src={currentSong.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
        preload="metadata"
      />

      <p className="mb-5 text-center text-sm uppercase tracking-[0.4em] text-white/60">
        Long drives | Old songs | Good memories
      </p>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-5 shadow-2xl backdrop-blur-md">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center">
  <div
    className={`vinyl-record ${
      !isPlaying ? "paused" : ""
    } relative h-24 w-24 rounded-full bg-black shadow-[0_0_35px_rgba(213,168,92,0.25)]`}
  >
    {/* Vinyl grooves */}
    <div className="absolute inset-2 rounded-full border border-white/10" />
    <div className="absolute inset-4 rounded-full border border-white/10" />
    <div className="absolute inset-6 rounded-full border border-white/10" />

    {/* Center label */}
    <div
      className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cover bg-center border border-white/20"
      style={{
        backgroundImage: "url('/dhaba-food-beer.png')",
      }}
    />

    {/* Center hole */}
    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
  </div>
</div>

          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d5a85c]">
              Dhaba Table
            </p>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Dhaba dinner and late evening songs.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d5a85c]">
            Now Playing
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {currentSong.title}
          </h2>

          <p className="mt-1 text-sm text-white/60">
            {currentSong.artist} | {currentSong.mood}
          </p>
        </div>

        {/* Progress */}
        <div className="mt-7">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-[#d5a85c]"
          />

          <div className="mt-2 flex justify-between text-xs text-white/40">
            <span>{formatTime(currentTime)}</span>
            <span>
              {duration ? formatTime(duration) : currentSong.duration}
            </span>
          </div>
        </div>

        {/* Controls */}
<div className="mt-6 flex items-center justify-center gap-7">
  {/* Previous */}
  <button
    type="button"
    onClick={playPrevious}
    className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
    aria-label="Previous song"
    title="Previous"
  >
    ⏮
  </button>

  {/* Play / Pause */}
  <button
    type="button"
    onClick={() => setIsPlaying((playing) => !playing)}
    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d5a85c] text-xl font-black text-black transition hover:scale-105"
    aria-label={isPlaying ? "Pause song" : "Play song"}
    title={isPlaying ? "Pause" : "Play"}
  >
    {isPlaying ? "❚❚" : "▶"}
  </button>

  {/* Next */}
  <button
    type="button"
    onClick={playNext}
    className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
    aria-label="Next song"
    title="Next"
  >
    ⏭
  </button>

  {/* Shuffle */}
  <button
    type="button"
    onClick={() => {
      const randomIndex = Math.floor(Math.random() * songs.length);

      setCurrentIndex(randomIndex);
      setIsPlaying(true);
      setCurrentTime(0);
    }}
    className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white/50 transition hover:bg-white/10 hover:text-white"
    aria-label="Shuffle songs"
    title="Shuffle"
  >
    🔀
  </button>
</div>
      </div>

      {/* Playlist */}
      <div className="mt-8 w-full max-w-md">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">
            Tonight&apos;s Playlist
          </h3>

          <span className="text-xs text-white/40">
            {songs.length} songs
          </span>
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
                  isCurrentSong
                    ? "bg-white/15"
                    : "hover:bg-white/10"
                }`}
              >
                <span
                  className={`w-6 text-xs ${
                    isCurrentSong
                      ? "text-[#d5a85c]"
                      : "text-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">
                    {song.title}
                  </span>

                  <span className="mt-1 block truncate text-xs text-white/40">
                    {song.artist}
                  </span>
                </span>

                <span
                  className={`text-xs uppercase tracking-wider ${
                    isCurrentSong
                      ? "text-[#d5a85c]"
                      : "text-white/30"
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