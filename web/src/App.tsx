import { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import * as Dialog from '@radix-ui/react-dialog';
import axios  from 'axios';

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';


import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }

}

function App() {
  const [games, setGames] = useState<Game[]>([])

  const animation = { duration: 20000, easing: (t: number) => t };

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    slides: {
      perView: 5,
      origin: 'auto',
      spacing: 20,
    },
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    }
  });


  return (
   <div className="max-w-[1280px] mx-auto flex flex-col items-center justify-center my-20">
    <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider max-w-[1280px]flex mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id} 
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.ads}
            />
          );
        })}
        
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
        
      </Dialog.Root>

   </div>
  )
}

export default App
