async function imgurAlbumItems(album_hash) {
    var data = await $.ajax({
        url: 'https://api.imgur.com/3/album/' + album_hash,
        dataType: "json",
        crossDomain:true,
        headers: {
            "Authorization": "Client-ID 23524a5f57df19a"
        }
    });
    var items=[]
    for (var i in data.data.images) {
        var url = data.data.images[i].link;
        var el= $("<figure class='image imgur column is-4'></figure>").append(
            $("<a></a>").attr('href', url).append(
                $("<img>").attr('src', url)
            )
        );
        items.push(el);
    }
    return items;
}
