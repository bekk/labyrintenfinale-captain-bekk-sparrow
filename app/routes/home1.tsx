import { useNavigate } from "react-router";
import type { Route } from "./+types/home1";
import { ButtonWithIcon } from "~/components/ButtonWithIcon/ButtonWithIcon";


export function meta({ }: Route.MetaArgs) {
  return [{ title: "Hjem" }];
}

export default function Home() {
  return (
    <div className="center-align bg-[#1b1231] min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <img
          src="/images/menu-bar.png"
          alt="Meny"
          className="w-full h-14 object-cover"
        />
      </div>
      <div className="pt-20 p-4 container mx-auto">
        <h1 className="text-7xl font-bold text-white mb-4">Sport</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Fotball direkte</h2>
        <h2 className="text-1xl  text-white mb-4">Her får du det beste fra internasjonal fotball, med de beste kommentatorene!
        </h2>
      </div>
      <p></p>
      <div className="flex flex-row items-start p-4 container mx-auto">
        {Sending({
          name: "Barcelona - Getafe",
          league: "La Liga",
          picturePath: "/images/barcelona_getafe.png",
          match: "/barcelona-getafe",
        })}
        {Sending({
          name: "Sverige - England",
          league: "Internasjonal",
          picturePath: "/images/sweden_england.png",
          match: "/sverige-england",
        })}
      </div>
    </div>
  );
}

type SendingProps = {
  name: string;
  league: string;
  picturePath: string;
  match: string;
};

export function Sending({ name, league, picturePath, match }: SendingProps) {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-start text-white w-full">
      <ButtonWithIcon
        picturePath={picturePath}
        alt={`Start ${name}‑sendingen`}
        onClick={() =>
          navigate(match)
        }
      />
      <h1 className="mt-3 text-lg font-semibold">{name}</h1>
      <h2 className="text-sm opacity-80">{league}</h2>
    </div>
  );
}
