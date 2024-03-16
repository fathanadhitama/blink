'use client'

import { useEffect, useState } from 'react'
import { UrlsType } from '../../types/url'
import LinkCard from '@/components/LinkCard';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const [urls, setUrls] = useState<UrlsType['urls']>([])
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isBlinking, setBlinking] = useState(false)
  const router = useRouter()
  
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

  const postUrl = async () => {
    setLongUrl('')
    setShortUrl('')
    setBlinking(true)
    await fetch(
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
    setBlinking(false)
    router.refresh()
  };

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <main className="flex flex-col justify-center items-center md:flex-row min-h-screen bg-[#060627]">
      <section className='w-4/6 p-10 min-h-full flex flex-col justify-center items-center'>
        <div>
          <h3 className='text-3xl font-bold'>
            Go to your link in a blink of an eye!
          </h3>
          <form className='p-5 flex justify-center gap-5 flex-col'>
            <div className='flex flex-col'>
              <label htmlFor="longUrl">Enter your long url</label>
              <input type="text" name="longUrl" id="longUrl"
              className='text-white bg-transparent rounded-md border border-blue-500 p-2'
              onChange={e => setLongUrl(e.target.value)} value={longUrl}/>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="shortUrl">Customize your short url</label>
              <div>
                <code>bl.ink/ </code>
                <input type="text" name="shortUrl" id="shortUrl" 
                className='text-white bg-transparent rounded-md border border-blue-500 p-2'
                onChange={e => setShortUrl(e.target.value)} value={shortUrl}/>
              </div>
            </div>
            <input type="submit" value={isBlinking ? "Blinking..." : "Blink it!"} disabled={isBlinking}
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
        <div className='bg-[#171746] rounded-l-3xl px-10 min-h-full max-h-[100vh] overflow-auto relative'>
          <h1 className="text-3xl font-bold py-5 sticky top-0 bg-[#171746]/75">Shortened Links</h1>
          {
            urls.map((link, index) => (
              <LinkCard
              key={index}
              id={link.id}
              authorId={link.authorId}
              shortUrl={link.shortUrl}
              longUrl={link.longUrl}
              clicks={link.clicks}
              />
            ))
          }
        </div>
      </section>
    </main>
  );
}
