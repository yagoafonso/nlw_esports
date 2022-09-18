import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className='pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg overflow-hidden'>
    <div className='bg-[#2A2634] px-8 py-6 self-stretch rounded-lg flex justify-between items-center'>
      <div>
        <strong className='text-lg text-white font-black block sm:text-x1 md:text-2xl'>Não encontrou seu duo?</strong>
        <span className='text-sm text-zinc-400 block md:text-base'>Publique um anúncio para encontrar novos players!</span>
      </div>

      <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-700 text-white rounded flex items-center gap-3sm:py-2 sm:px-3 sm:text-base md:py-3 md:px-4'>
        <MagnifyingGlassPlus size={24}/>
        Publicar anúncio
      </Dialog.Trigger>
    </div>
  </div>
  );
}