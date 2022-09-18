import { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css";
import * as Dialog from '@radix-ui/react-dialog';
import * as ReactDOM from 'react-dom';
import axios  from 'axios';

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';


import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { ArrowCircleRight } from 'phosphor-react';

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

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    dragSpeed: 3,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 425px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width: 640px)": {
        slides: {
          perView: 3,
          spacing: 12,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 14,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
      "(min-width: 1280px)": {
        slides:{
          perView: 6,
          spacing: 18,
        },
      },
      "(min-width: 1536px)": {
        slides:{
          perView: 7,
          spacing: 20,
        },
      },
    },
  })

  function Arrow(props: {disabled: boolean, left?: boolean, onClick: (event: any) => void}){
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return(
        <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    )

  }


  return (
   <div className="max-w-[1334px] mx-auto flex flex-col items-center justify-center my-20 sm:my-14 md:my-16 xl:my-20">
    <img src={logoImg} alt="Logotipo da página Esports NLW" />
      <h1 className="mt-10 text-xl font-black text-white sm:mt-4 md:mt-16 md:text-4xl lg:text-5xl xl:mt-20 xl:text:text-6xl">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

    <div className="w-full max-w-[1334px] flex items-center gap-3 overflow-hidden mt-16">

        {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
            </>
        )}  
      <div ref={sliderRef} className="keen-slider">
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

        <Arrow
          onClick={(e: any) =>
            e.stopPropagation() || instanceRef.current?.next()
          }
          disabled={currentSlide === 0}
        />

    </div>
    

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
        
      </Dialog.Root>

   </div>
  )
}

export default App
