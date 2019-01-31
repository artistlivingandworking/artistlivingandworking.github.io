var _imgur_clientID = '23524a5f57df19a';

async function _imgurRequest(path) {
    let data = await $.ajax({
        url: 'https://api.imgur.com/3/' + path,
        dataType: "json",
        crossDomain:true,
        headers: {
            "Authorization": "Client-ID " + _imgur_clientID,
        }
    });
    console.log(data);
    return data;
}
async function imgurAlbumItems(album_hash) {
    let items=[]
    let data = await _imgurRequest('/album/' + album_hash);
    for (var i in data.data.images) {
      let url = data.data.images[i].link;
      let desc = data.data.images[i].description || '';
      let el= $("<div class='column is-4'></div>").append(
        $("<figure class='image imgur'></figure>")
          .append($("<a></a>").attr('href', url)
            .append(
                $("<figcaption>").text(desc)
            ).append(
              $("<img>").attr('src', url).attr('alt', desc)
            )
          )
        );
      items.push(el);
    }
    data.items = items;
    return data;
}

async function imgurAlbums(user) {
    let data = await _imgurRequest('/account/' + user + '/albums');
    return data['data'];
}
