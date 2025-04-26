import QuestionMarkIcon from "~/icons/QuestionMarkIcon";
import type { Route } from "./+types/home1";
import { ButtonWithIcon } from "~/components/ButtonWithIcon/ButtonWithIcon";


export function meta({ }: Route.MetaArgs) {
  return [{ title: "Hjem" }];
}

export default function Home() {
  return (
    <div className="bg-[#1b1231] min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <img
          src="/menu-bar.png"           /* ↳ legg bildet i /public eller importer det */
          alt="Meny"
          className="w-full h-14 object-cover"
        />
      </div>
      <div className="pt-20 p-4 container mx-auto">
        <h1 className="text-7xl font-bold text-white mb-4">Sport</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Fotball direkte</h2>
      </div>
      {Sending({
        name: "Messi",
        league: "La Liga",
        picturePath: "menu-bar.png", // Legg bildet i /public eller importer det
      })}
    </div>
  );
}

export function Sending({ name, league, picturePath }: { name: string, league: string, picturePath: string }) {
  return (
    <div className="flex flex-col items-start text-white">
      <div className="flex items-center gap-4 mb-4">
        <ButtonWithIcon

          onClick={() => {
            console.log("Button clicked");
          }}
          picturePath={picturePath}
        />
      </div>
      <h1 className="text-xl font-semibold">{name}</h1>
      <h2 className="text-sm opacity-80">{league}</h2>
    </div>
  );
}
