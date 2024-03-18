export type UrlsType = {
    urls: { 
      id: string; 
      longUrl: string; 
      shortUrl: string; 
      clicks: number; 
      authorId: string | null; 
    }[]
}

export type UrlType = {
  id: string; 
  longUrl: string; 
  shortUrl: string; 
  clicks: number; 
  authorId: string | null;
}

export type PostUrlType = {
    message: string
    ok: boolean
}