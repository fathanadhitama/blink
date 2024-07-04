export type UrlsType = {
    urls: UrlType[]
}

export type getUrlResponseType = {
  message: string
  ok: boolean
  urls: UrlType[] | null
}

export type UrlType = {
  id: string; 
  longUrl: string; 
  shortUrl: string; 
  clicks: number; 
  authorEmail: string | null;
}

export type ResponseUrlType = {
    message: string
    ok: boolean
}

export type UrlRequestBodyType = {
  longUrl: string; 
  shortUrl: string; 
  clicks: number; 
  email: string | null;
}