import type { Route } from "./+types/home";
import { Button } from "~/components/ButtonWithIcon/Button";
import { NavLink, useNavigate } from "react-router";
import QuestionMarkIcon from "~/icons/QuestionMarkIcon";
import homepage from "public/images/homepage.png";
import { useState } from "react";


export function meta({ }: Route.MetaArgs) {
  return [{ title: "TV2 Play - Fotball" }];
}

enum Audio {
  norsk = "norsk",
  engelsk = "engelsk"
}

const audio: Record<Audio, string> = {
  [Audio.norsk]: "norsk.mp3",
  [Audio.engelsk]: "engelsk.mp3"
};

export default function Home() {
  let navigate = useNavigate();
  const [audioSrc, setAudioSrc] = useState(Audio.norsk);
  console.log(audioSrc);

  return (
    <>
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/AlnHNi0hdO0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <audio controls>
        <source src="horse.ogg" type="audio/ogg">
        </source>
        <source src="horse.mp3" type="audio/mpeg">
        </source>
        Your browser does not support the audio element.
      </audio>
      <div className="grid grid-cols-3 gap-4">
        <Commentator name={"Kommentator1"} language={"Språk"} audioLanguage={Audio.norsk} setAudioSrc={setAudioSrc} />
        <Commentator name={"Kommentator2"} language={"Språk"} audioLanguage={Audio.norsk} setAudioSrc={setAudioSrc} />
        <Commentator name={"Kommentator3"} language={"Språk"} audioLanguage={Audio.norsk} setAudioSrc={setAudioSrc} />
      </div>
    </>
  );
}

export function Commentator({ name, language, audioLanguage, setAudioSrc }: {
  name: string, language: string, audioLanguage: Audio, setAudioSrc: React.Dispatch<React.SetStateAction<Audio>>
}) {
  return (
    <div className="flex flex-col items-start">
      <h1>{name}</h1>
      <h4>{language}</h4>
      <button
        className=""
        onClick={() => setAudioSrc(Audio.norsk)}
      >
        Les mer
      </button>
    </div>
  );
}

