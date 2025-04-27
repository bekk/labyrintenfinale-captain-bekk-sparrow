import type { Route } from "./+types/home1";

import { useEffect, useRef, useState } from "react";

import silentVideo from "/videos/ankaraVideo.mp4";
import englishAudio from "/videos/AnkaraMessiEnglish.mp3";
import catalanAudio from "/videos/AnkaraMessiCatalan.mp3";
import peterAudio from "/videos/AnkaraMessiPeterGriffin.mp3";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Barcelona - Getafe" }];
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
      this.audio = null
    }

    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.currentTime = this.video.currentTime;

    await Promise.all([
      this.canPlay(this.video),
      this.canPlay(this.audio),
    ]);
    if (!this.video.paused) {
      this.audio.play().catch(() => {/* autoplay-policy */ });
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
  picturePath: string;
};

export default function Help() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controllerRef = useRef<AudioSyncController | null>(null);

  const commentators: Commentator[] = [
    { name: "Britisk kommentator", audioSrc: englishAudio, picturePath: "/images/England.png" },
    { name: "Katalansk kommentator", audioSrc: catalanAudio, picturePath: "/images/Catalan.png" },
    { name: "Peter Griffin", audioSrc: peterAudio, picturePath: "/images/Peter.png" },
    { name: "Minecraft villager", audioSrc: peterAudio, picturePath: "/images/Minecraft.png" },
    { name: "Fantorangen", audioSrc: peterAudio, picturePath: "/images/Fantorangen.png" }
  ];

  const [currentCommentator, setCurrentCommentator] = useState<Commentator>(commentators[0]);

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
        src="/images/menu-bar.png"
        alt="Meny"
        className="w-full h-auto object-cover"
      />


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

        <p className="text-lg text-white font-bold max-w-2xl text-left pb-5 pt-6">
          Tilgjengelige kommentatorer:
        </p>
        <div className="flex flex-wrap gap-6 justify-center">
          {commentators.map((commentator) => (
            <button
              key={commentator.name}
              onClick={() => setCurrentCommentator(commentator)}
              className="flex flex-col items-center justify-between
                 w-60 h-72 rounded-2xl overflow-hidden pt-4
                 font-bold text-xl
                 bg-[#D8B4F8] hover:bg-purple-700 text-black"
            >
              <span className="mb-2">{commentator.name}</span>
              <img
                src={commentator.picturePath}
                alt={commentator.name}
                className="h-48 w-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
