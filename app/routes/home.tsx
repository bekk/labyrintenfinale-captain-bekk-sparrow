//import type { Route } from "./+types/home";
import { NavLink, useNavigate } from "react-router";

import React, { useEffect, useRef, useState } from "react";

import silentVideo from "ankaraVideo.mp4";
import englishAudio from "AnkaraMessiEnglish.mp3";
import norwegianAudio from "AnkaraMessiCatalan.mp3";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Denne tittelen vises i fanen" }];
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
      this.audio.play().catch(() => {/* autoplay‑restriksjon */ });
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

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const controllerRef = useRef<AudioSyncController | null>(null);
  const [lang, setLang] = useState<"en" | "no">("no");

  // init & bytt lydspor
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!controllerRef.current) {
      controllerRef.current = new AudioSyncController(video);
    }

    const manifest = {
      en: englishAudio,
      no: norwegianAudio,
    } as const;

    controllerRef.current.switch(manifest[lang]).catch(console.error);
  }, [lang]);

  return (
    <main className="flex flex-col items-center gap-4 p-4">
      {/* → Bruk controls så brukeren får et reelt klikk (autoplay‑policy) */}
      <video
        ref={videoRef}
        src={silentVideo}
        controls
        playsInline
        width={640}
        height={360}
        className="rounded-lg shadow"
      />

      {/* Språkvelger */}
      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="lang" className="font-medium">Språk:</label>
        <select
          id="lang"
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "no")}
          className="border rounded px-2 py-1"
        >
          <option value="en">English</option>
          <option value="no">Norsk</option>
        </select>
      </div>
    </main>
  );
}
