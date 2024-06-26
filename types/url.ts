export type UrlsType = {
    urls: UrlType[]
}

export type UrlType = {
  id: string; 
  longUrl: string; 
  shortUrl: string; 
  clicks: number; 
  authorId: string | null;
}

export type ResponseUrlType = {
    message: string
    ok: boolean
}