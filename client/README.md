# Phase 4 Flatiron School Rails/React Project - Playlist Builder

This playlist builder uses a Rails backend with a React frontend to allow a user to create a profile, create and delete a playlist, add and remove songs from their playlist, order the songs in the playlist with a drag and drop feature, view other users playlists, and view and add songs from the song library.

The four models include users, playlists, songs, and playlist_songs. Each model has create and read capabilities, while playlists and playlist_songs also allow for deletion. Users can also update their profile information as well as the order attribute of their playlist_songs.

The backend validates the attributes on create and renders errors accordingly on the front end. The back end also verifies the user owns the resource being updated or deleted before the action.

Faker library (https://github.com/faker-ruby/faker) was used to generate songs, users, and playlists.

React DnD library (https://react-dnd.github.io/react-dnd/about) was used to render the drag-and-drop feature. This allows a user to re-order the songs in a playlist they own. The user must hit the Save Order button to persist the new order on the back end.
