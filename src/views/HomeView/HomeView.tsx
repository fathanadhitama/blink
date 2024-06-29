'use client'

import { useEffect, useState } from 'react'
import { ResponseUrlType, UrlsType } from '../../../types/url'
import LinkCard from '@/components/LinkCard';
import LinkCardSkeleton from '@/components/LinkCardSkeleton';
import Form from './elements/Form';
import Footer from './elements/Footer';
import { AlignJustify, X } from 'lucide-react'
import { useTransition, animated } from 'react-spring'
import { toast } from '@/components/Toast';

export default function HomeView() {
  const [urls, setUrls] = useState<UrlsType['urls']>([])
  const [toggle, setToggle] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const transition = useTransition(isOpen, {
    from: { x: 500, y: 0},
    enter: { x: 0, y: 0},
    leave: { x: 800, y: 0},
    config: { duration: 400 }
  })
  
  const fetchUrls = async () => {
    setLoading(true)
    const res: Response = await fetch(
      '/api/urls',
      {
        method: 'GET'
      }
    );
  
    if (res.ok) {
      const data: UrlsType = await res.json();
      setUrls(data['urls'])
    } else {
      console.error('Gagal mengambil data:', res.statusText);
    }
    setLoading(false)
  };

  const deleteUrl = async (id: String) => {
    setLoading(true)
    const res: Response = await fetch(
      `/api/delete/${id}`,
      {
        method: 'DELETE'
      }
    );
    const data: ResponseUrlType = await res.json()
    if (res.ok) {
      toast.success('Link successfully deleted.')
    } else {
      toast.error(data.message)
    }
    setLoading(false)
    setLoading(false)
    setToggle(prevState => !prevState)
  };

  useEffect(() => {
    fetchUrls()
  }, [toggle])

  return (
    <main className="flex overflow-hidden flex-col items-center min-h-screen bg-[#141414] lg:px-10 gap-10">
      <div className='px-10 py-5 flex items-center justify-between w-full hover:cursor-default'>
        <a className='text-3xl lg:text-[50px] font-bold'>blink.<span className='text-[#FAD810]'>it</span></a>
        {isOpen ? 
          <X className='hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
          : <AlignJustify className='hover:cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        }
      </div>
      <div className='w-full flex justify-center items-center relative'>
        <Form setToggle={setToggle}/>
        {transition((style, item) => 
          item && (
            <animated.section style={style} 
            className='absolute top-[-30px] lg:right-[-40px] overflow-hidden right-0 w-full lg:w-2/5 bg-[#FAD810] lg:rounded-l-3xl pb-5'>
            <h1 className="text-xl text-center text-black shadow-lg
            font-bold pb-5 w-full sticky top-0 py-3 bg-[#FAD810] ">
              Shortened Links
            </h1>
            <div className='px-3 lg:px-7 h-[80vh] overflow-auto relative'>
              {
                isLoading ? 
                (
                  <div className='flex flex-col gap-5'>
                    <LinkCardSkeleton/>
                    <LinkCardSkeleton/>
                    <LinkCardSkeleton/>
                  </div>
                ) :
                urls.map((link, index) => (
                  <LinkCard
                  key={index}
                  id={link.id}
                  authorId={link.authorId}
                  shortUrl={link.shortUrl}
                  longUrl={link.longUrl}
                  clicks={link.clicks}
                  deleteUrl={deleteUrl}
                  />
                ))
              }
            </div>
          </animated.section>
          )
        )}
      </div>
      <Footer />
    </main>
  );
}
