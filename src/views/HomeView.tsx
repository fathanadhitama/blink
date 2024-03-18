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
      <section className='w-4/6 p-10 min-h-full flex flex-col justify-center items-center'>
        <div>
          <h3 className='text-3xl font-bold'>
            Go to your link in a blink of an eye!
          </h3>
          <form className='p-5 flex justify-center gap-5 flex-col'>
            <div className='flex flex-col'>
              <input type="text" name="longUrl" id="longUrl"
              className='text-white bg-transparent rounded-md border border-blue-500 p-2
              placeholder:text-slate-800 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
              onChange={e => setLongUrl(e.target.value)} value={longUrl}
              placeholder='Enter your long, boring url...'/>
            </div>
            <div className='flex flex-col'>
              <div>
                <code>bl.ink/ </code>
                <input type="text" name="shortUrl" id="shortUrl" 
                className='text-white bg-transparent rounded-md border border-blue-500 p-2
                placeholder:text-slate-800 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
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
      </section>
      <section className='w-4/5 md:w-2/6 bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]
       rounded-l-3xl pl-1'>
        <div className='bg-[#171746] rounded-l-3xl px-10 min-h-screen max-h-[100vh] overflow-auto relative'>
          <h1 className="text-3xl font-bold py-5 sticky top-0 bg-[#171746]/75">Shortened Links</h1>
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
      </section>
    </main>
  );
}
