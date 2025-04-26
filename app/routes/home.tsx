import type { Route } from "./+types/home";
import { Button } from "~/components/ButtonWithIcon/Button";
import { NavLink, useNavigate } from "react-router";
import QuestionMarkIcon from "~/icons/QuestionMarkIcon";
import homepage from "public/images/homepage.png";

export function meta({ }: Route.MetaArgs) {
  return [{ title: "Denne tittelen vises i fanen" }];
}

export default function Home() {
  let navigate = useNavigate();

  return (
    <>
      <div className="absolute left-20 bottom-45">
        <Button
          onClick={() => navigate("/hjelp")}
        />
      </div>
      <div>
        <img src="/images/homepage.png" alt="Et bilde" />
      </div>
    </>
  );
}
