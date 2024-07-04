import React from "react";
import Button from '@/components/Button';
import Image from 'next/image';
import arrow from '@/../public/images/arrow.png'
import { useEffect, useState } from 'react'
import { ResponseUrlType, UrlsType } from '@/../types/url'
import { toast } from "@/components/Toast";
import { InfinitySpin } from "react-loader-spinner";

function Form({ setToggle } : {
  setToggle : React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [longUrl, setLongUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [longUrlError, setLongUrlError] = useState('')
    const [shortUrlError, setShortUrlError] = useState('')
    const [isUrlValid, setIsUrlValid] = useState(false)
    const [isLoading, setLoading] = useState(false)

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
    
      const postUrl = async () => {
        setLongUrl('')
        setShortUrl('')
        setShortUrlError('')
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
    
        if (!res.ok) {
          // setShortUrlError(data.message)
          toast.error(data.message)
        } else {
          // setShortUrl('')
          toast.success('Your link has blinked! ⚡')
        }
        setLoading(false)
        setToggle(prevState => !prevState)
      };
    
      const handleSubmit = () => {
        postUrl()
      }

  return (
    <section className='w-11/12 lg:w-4/6 bg-[#1F1F1F] shadow-2xl shadow-yellow-500/50 rounded-3xl p-7 lg:p-10 py-7 min-h-full flex flex-col justify-center items-center'>
          <h3 className='text-xl lg:text-[40px] w-full text-left mb-4 font-bold leading-normal'>
            Shorten your link. <br />
            Go to your link in a
            <span className='text-transparent bg-clip-text bg-gradient-to-br 
            from-[#FAD810] to-[#FFF]'> blink</span> of an eye!
          </h3>
          <div className='flex flex-col items-center gap-5 w-full'>
            <div className='flex flex-col w-full'>
              <input required type="url" name="longUrl" id="longUrl"
              className='text-white text-sm bg-white/10 rounded-md p-3
              placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'
              onChange={(e) => handleUrlChange(e.target.value)} value={longUrl}
              placeholder='Your long, boring url...'/>
              {!isUrlValid && longUrl!='' 
              && <span className='mt-2 text-red-500 text-xs'>Please enter valid url (http://google.com, https://chatgpt.com/)</span>}
            </div>
            <Image src={arrow} width={10} height={10} alt='arrow' className='h-10 flex justify-center'/>
            <div className='flex flex-col lg:flex-row items-center gap-2 w-full'>
              <p className='text-md lg:w-1/3'>blink-peach.vercel.app/</p>
              <input required type="text" name="shortUrl" id="shortUrl"
              className='text-white text-sm bg-white/10 rounded-md p-3 w-full
              placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'
              onChange={e => setShortUrl(e.target.value)} value={shortUrl}
              placeholder='Your badass url...'/>
            </div>
              {!!shortUrlError && <span className='text-red-300 text-xs'>{shortUrlError}</span>}
            <Button onClick={handleSubmit} isLoading={isLoading} disabled={!isUrlValid || shortUrl.length == 0}>
              {isLoading ? <InfinitySpin width="50" color="#fad810" /> : 'Blink it!'}
            </Button>
          </div>
      </section>
  );
}

export default Form;
