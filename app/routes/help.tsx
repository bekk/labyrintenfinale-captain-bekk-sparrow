import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hjelp!" }];
}

export default function Help() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-[#1a0826] to-[#2c1d3d] text-white flex flex-col">
      <img 
        src="/public/menu-bar.png" 
        alt="Meny" 
        className="w-full h-auto object-cover"
      />

      {/* videoskjemen kan plassere her feks. */}

      <div className="flex flex-col flex-1 justify-center p-30 pt-70">
      <div className="flex items-center">
        <h1 className="text-5xl font-bold text-white mb-6 text-left pg-40">M</h1>
        <span className="text-white text-sm ml-2">MyGame</span>

      </div>
    
      
      <h1 className="text-5xl font-bold mb-6 text-left">Barcelona - Getafe</h1>
        <p className="text-lg text-gray-300 max-w-2xl text-left pb-5">
          Fotball
        </p>
        <button className="bg-[#AEB3FF] hover:bg-purple-700 text-black font-semibold py-3 w-50 rounded-full text-xl">
          Spill av
        </button>
        <p className="text-lg text-white font-bold max-w-2xl text-left pb-5 pt-15">
          Tilgjengelige kommentatorer:
        </p>

      {/* kommentatorknappene under her */}
            {/* finne ut hvordan velge lyd bilde input i kommentator??  */}


      <button className="bg-[#D8B4F8] hover:bg-purple-700 text-black font-semibold py-20 w-45 rounded-2xl text-xl">
          Oscar Westerlin
        </button>

        
      </div>
    </div>
  );
}
