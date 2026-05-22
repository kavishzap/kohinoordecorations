-- Optional: custom captions under each video card (falls back to TikTok title via oEmbed if empty)
alter table public.kohinoor_videos
add column if not exists description text;
