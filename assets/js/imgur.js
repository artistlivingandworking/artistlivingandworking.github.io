var _imgur_clientID = '23524a5f57df19a';

async function _imgurRequest(path) {
    var data = await $.ajax({
        url: 'https://api.imgur.com/3/' + path,
        dataType: "json",
        crossDomain:true,
        headers: {
            "Authorization": "Client-ID " + _imgur_clientID,
        }
    });
    return data;
}
async function imgurAlbumItems(album_hash) {
    var items=[]
    var data = await _imgurRequest('/album/' + album_hash);
    for (var i in data.data.images) {
        var url = data.data.images[i].link;
        var el= $("<figure class='image imgur column is-4'></figure>").append(
            $("<a></a>").attr('href', url).append(
                $("<img>").attr('src', url)
            )
        );
        items.push(el);
    }
    data.items = items;
    return data;
}

async function imgurAlbums(user) {
    var data = await _imgurRequest('/account/' + user + '/albums');
    return data['data'];
}
