'use client'

import { useEffect, useState } from 'react'
import { ResponseUrlType, UrlsType } from '../../types/url'
import LinkCard from '@/components/LinkCard';
import LinkCardSkeleton from '@/components/LinkCardSkeleton';
import Button from '@/components/Button';

export default function HomeView() {
  const [urls, setUrls] = useState<UrlsType['urls']>([])
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [toggle, setToggle] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [longUrlError, setLongUrlError] = useState('')
  const [shortUrlError, setShortUrlError] = useState('')
  const [isUrlValid, setIsUrlValid] = useState(false);
  
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

  const handleUrlChange = (text: string) => {
    setLongUrl(text);
    const urlRegexPattern =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    let regex = new RegExp(urlRegexPattern);
    if (text.match(regex) && text.split(" ").length === 1) {
      setIsUrlValid(true);
      return;
    }
    setIsUrlValid(false);
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
    const data: ResponseUrlType = await res.json()
    console.log(data)

    if (!res.ok) {
      setShortUrlError(data.message)
    } else {
      setShortUrl('')
    }
    setLoading(false)
    setToggle(prevState => !prevState)
  };

  const handleSubmit = () => {
    postUrl()
  }

  useEffect(() => {
    fetchUrls()
  }, [toggle])

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-[#060627] lg:px-10 m-5">
      <section className='w-11/12 lg:w-4/6 py-3 min-h-full flex flex-col justify-center items-center'>
        <div className='bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]
       rounded-3xl p-0.5 w-full lg:w-10/12'>
          <div className='bg-[#171746] rounded-3xl p-7 lg:p-10'>
            <h3 className='text-xl lg:text-[50px] text-center mb-4 font-bold leading-normal'>
              Go to your link in a
              <span className='text-transparent bg-clip-text bg-gradient-to-tr 
              from-[#4158D0] via-[#C850C0] to-[#FFCC70]'> bleenk</span> of an eye!
            </h3>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col'>
                <input required type="url" name="longUrl" id="longUrl"
                className='text-white text-sm bg-white/10 rounded-md border-2 border-blue-800 p-2
                placeholder:text-slate-400 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
                onChange={(e) => handleUrlChange(e.target.value)} value={longUrl}
                placeholder='Your long, boring url...'/>
                {!isUrlValid && longUrl!='' 
                && <span className='mt-2 text-red-300 text-xs'>Please enter valid url (http://google.com, https://chatgpt.com/)</span>}
              </div>
              <div className='flex flex-col lg:flex-row items-center gap-2'>
                <p className='text-md'>bleenk.vercel.app/</p>
                <input required type="text" name="shortUrl" id="shortUrl"
                className='text-white text-sm bg-white/10 rounded-md border-2 border-blue-800 p-2 w-full
                placeholder:text-slate-400 focus:placeholder:text-slate-500 hover:placeholder:text-slate-500'
                onChange={e => setShortUrl(e.target.value)} value={shortUrl}
                placeholder='Your badass url...'/>
              </div>
                {shortUrlError!='' && <span className='text-red-300 text-xs'>{shortUrlError}</span>}
              <Button onClick={handleSubmit} isLoading={isLoading} disabled={!isUrlValid || shortUrl.length == 0}/>
            </div>
          </div>
        </div>
      </section>

      <section className='w-11/12 lg:w-2/6 m-5'>
        <div className='bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]
       rounded-3xl p-0.5'>
          <div className='bg-[#171746] rounded-3xl p-7 max-h-[80vh] overflow-auto relative'>
            <h1 className="text-xl font-bold mb-5 w-full sticky top-0 bg-[#171746]">Shortened Links</h1>
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
        </div>
      </section>
    </main>
  );
}
