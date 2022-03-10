select
       t.name as track_name,
       t.isrc as track_isrc,
       a.id as artist_id,
       a.tagline,
       u.email,
       u.username,
       u.id as user_id
from tracks as t
right join artists a on a.id = t.artist_id
left join users u on u.id = a.user_id;