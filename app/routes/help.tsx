import type { Route } from "./+types/home";
import { useEffect, useRef, useState } from "react";

import silentVideo from "ankaraVideo.mp4";
import englishAudio from "AnkaraMessiEnglish.mp3";
import norwegianAudio from "AnkaraMessiCatalan.mp3";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hjelp!" }];
}

class AudioSyncController {
  private video: HTMLVideoElement;
  private audio: HTMLAudioElement | null = null;
  private driftTolerance = 0.25;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  async switch(src: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }

    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.currentTime = this.video.currentTime;

    await Promise.all([
      this.canPlay(this.video),
      this.canPlay(this.audio),
    ]);
    if (!this.video.paused) {
      this.audio.play().catch(() => {/* autoplay-policy */});
    }
    this.bind();
  }

  private canPlay(el: HTMLMediaElement) {
    return new Promise<void>((res) =>
      el.readyState >= 3
        ? res()
        : el.addEventListener("canplaythrough", () => res(), { once: true })
    );
  }

  private bind() {
    if (!this.audio) return;
    const v = this.video;
    const a = this.audio;

    v.addEventListener("play", () => a.play());
    v.addEventListener("pause", () => a.pause());
    v.addEventListener("seeking", () => (a.currentTime = v.currentTime));

    const tick = () => {
      if (Math.abs(a.currentTime - v.currentTime) > this.driftTolerance) {
        a.currentTime = v.currentTime;
      }
      requestAnimationFrame(tick);
    };
    tick();
  }
}

type Commentator = {
  name: string;
  audioSrc: string;
};

export default function Help() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controllerRef = useRef<AudioSyncController | null>(null);
  const [currentCommentator, setCurrentCommentator] = useState<Commentator | null>(null);

  const commentators: Commentator[] = [
    { name: "Oscar Westerlin", audioSrc: norwegianAudio },
    { name: "John Smirthuhuy", audioSrc: englishAudio },
    { name: "John Smith", audioSrc: englishAudio },
    { name: "John Smith", audioSrc: norwegianAudio },
    { name: "John Smith", audioSrc: englishAudio },
    { name: "John Smith", audioSrc: englishAudio },

  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentCommentator) return;

    if (!controllerRef.current) {
      controllerRef.current = new AudioSyncController(video);
    }

    controllerRef.current.switch(currentCommentator.audioSrc).catch(console.error);
  }, [currentCommentator]);

  return (
<div className="min-h-screen w-screen bg-gradient-to-b from-[#1a0826] to-[#2c1d3d] text-white flex flex-col">
<img 
        src="/public/menu-bar.png" 
        alt="Meny" 
        className="w-full h-auto object-cover"
      />

      {/* videoen */}
      <div className="flex justify-center mt-6">
      <video
        ref={videoRef}
        src={silentVideo}
        controls
        playsInline
        width={1100}
        height={360}
        className="rounded-lg shadow"
      />
    </div>

      <div className="flex flex-col flex-1 justify-center p-8">
    

        <h1 className="text-5xl font-bold mb-6 text-left">Barcelona - Getafe</h1>
        <p className="text-lg text-gray-300 max-w-2xl text-left pb-5">
          Fotball
        </p>

        <button
          onClick={() => videoRef.current?.play()}
          className="bg-[#AEB3FF] hover:bg-purple-700 text-black font-semibold py-3 w-50 rounded-full text-xl mb-6"
        >
          Spill av
        </button>

        <p className="text-lg text-white font-bold max-w-2xl text-left pb-5 pt-6">
          Tilgjengelige kommentatorer:
        </p>

        {/* kommentator knappenee */}
        <div className="flex flex-wrap gap-6 justify-center">
      {commentators.map((commentator) => (
        <button
          key={commentator.name}
          onClick={() => setCurrentCommentator(commentator)}
          className="flex-none w-60 h-24 bg-[#D8B4F8] hover:bg-purple-700 text-black font-semibold rounded-2xl text-lg flex items-center justify-center text-center whitespace-normal break-words overflow-hidden"
        >
          {commentator.name}
        </button>
      ))}
    </div>




      </div>
    </div>
  );
}
