const clientId = "2cf9cbd3a9374bdda11c1820cf0fa811"; // Have to replace it with your clientId
const redirectUri = "http://localhost:3000/"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;
 
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
 
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to get a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
 
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${term}&type=show`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.shows) {
          return [];
        }
        return jsonResponse.shows.items.map(show => ({
          id: show.id,
          name: show.name,
          description: show.description,
          //artist: track.artists[0].name,
          //album: track.album.name,
          uri: show.uri
        }));
      });
  },
 
  // savePlaylist(name, trackUris) {
  //   if (!name || !trackUris.length) {
  //     return;
  //   }
 
  //   const accessToken = Spotify.getAccessToken();
  //   const headers = { Authorization: `Bearer ${accessToken}` };
  //   let userId;
 
  //   return fetch("https://api.spotify.com/v1/me", { headers: headers })
  //     .then(response => response.json())
  //     .then(jsonResponse => {
  //       userId = jsonResponse.id;
  //       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //         headers: headers,
  //         method: "POST",
  //         body: JSON.stringify({ name: name })
  //       })
  //         .then(response => response.json())
  //         .then(jsonResponse => {
  //           const playlistId = jsonResponse.id;
  //           return fetch(
  //             `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
  //             {
  //               headers: headers,
  //               method: "POST",
  //               body: JSON.stringify({ uris: trackUris })
  //             }
  //           );
  //         });
  //     });
  // }
};
 
export default Spotify;