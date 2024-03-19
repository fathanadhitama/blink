'use client'

import { useEffect, useState } from 'react'
import { PostUrlType, UrlsType } from '../../types/url'
import LinkCard from '@/components/LinkCard';
import LinkCardSkeleton from '@/components/LinkCardSkeleton';

export default function HomeView() {
  const [urls, setUrls] = useState<UrlsType['urls']>([])
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [toggle, setToggle] = useState(false)
  const [isLoading, setLoading] = useState(false)
  
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
      // Gunakan data sesuai kebutuhan
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
    setLoading(false)
    setToggle(prevState => !prevState)
  };

  const postUrl = async () => {
    setLongUrl('')
    setShortUrl('')
    setLoading(true)
    const res: Response = await fetch(
      '/api/save-url',
      {
        method: 'POST',
        body: JSON.stringify({
          longUrl: longUrl,
          shortUrl: shortUrl,
          clicks: 0
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    setLoading(false)
    setToggle(prevState => !prevState)
  };

  useEffect(() => {
    fetchUrls()
  }, [toggle])

  return (
    <main className="flex flex-col justify-center items-center md:flex-row min-h-screen bg-[#060627]">
      <section className='w-11/12 md:w-4/6 py-3 md:p-10 min-h-full flex flex-col justify-center items-center'>
        <div className='bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]
       rounded-3xl p-0.5 w-full md:w-10/12'>
          <div className='bg-[#171746] rounded-3xl p-10'>
            <h3 className='text-3xl lg:text-[50px] font-bold leading-normal'>
              Go to your link in a
              <span className='text-transparent bg-clip-text bg-gradient-to-tr 
              from-[#4158D0] via-[#C850C0] to-[#FFCC70]'> blink</span> of an eye!
            </h3>
            <form className='p-5 flex justify-center gap-5 flex-col'>
              <div className='flex flex-col'>
                <input type="text" name="longUrl" id="longUrl"
                className='text-white bg-transparent rounded-md border-2 border-blue-800 p-2
                placeholder:text-slate-400 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
                onChange={e => setLongUrl(e.target.value)} value={longUrl}
                placeholder='Enter your long, boring url...'/>
              </div>
              <div className='flex flex-col'>
                <div>
                  <code>b.link/ </code>
                  <input type="text" name="shortUrl" id="shortUrl" 
                  className='text-white bg-transparent rounded-md border-2 border-blue-800 p-2 w-5/6
                  placeholder:text-slate-400 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
                  onChange={e => setShortUrl(e.target.value)} value={shortUrl}
                  placeholder='Enter your badass url'/>
                </div>
              </div>
              <input type="submit" value={isLoading ? "Blinking..." : "Blink it!"} disabled={isLoading}
              className='hover:cursor-pointer hover:bg-fuchsia-400 hover:-translate-y-1 duration-300 p-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md'
              onClick={
                (e) => {
                  e.preventDefault()
                  postUrl()
                }}/>
            </form>
          </div>
        </div>
      </section>
      <section className='w-11/12 md:w-2/6 md:p-10 h-screen '>
        <div className='bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]
       rounded-3xl p-0.5'>
          <div className='bg-[#171746] rounded-3xl px-10 max-h-[80vh] overflow-auto relative'>
            <h1 className="text-3xl font-bold py-5 w-full sticky top-0 bg-[#171746]">Shortened Links</h1>
            {
              urls.length == 0 || isLoading? 
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
        </div>
      </section>
    </main>
  );
}
