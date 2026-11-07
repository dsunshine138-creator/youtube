
"use client";

import { useState, useRef, useEffect } from "react";

const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "Divide",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Stay",
    artist: "Justin Bieber",
    album: "Famous",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: 6,
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "Divide",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: 7,
    title: "Attention",
    artist: "Charlie Puth",
    album: "Voicenotes",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: 8,
    title: "Calm Down",
    artist: "Rema",
    album: "Rave & Roses",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

const playlists = [
  "Liked Songs",
  "My Playlist #1",
  "Chill Vibes",
  "Workout Mix",
  "Daily Mix",
];

export default function Home() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [likedSongs, setLikedSongs] = useState([1, 3]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  const audioRef = useRef(null);

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const nextSong = () => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    const next = songs[(index + 1) % songs.length];
    playSong(next);
  };

  const previousSong = () => {
    const index = songs.findIndex((song) => song.id === currentSong.id);
    const previous = songs[(index - 1 + songs.length) % songs.length];
    playSong(previous);
  };

  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id)
        ? prev.filter((songId) => songId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, volume]);

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* MAIN CONTENT */}

      <div className="flex flex-1 gap-2 p-2 overflow-hidden">

        {/* SIDEBAR */}

        <aside className="hidden md:flex w-64 flex-col gap-2">

          <div className="bg-[#121212] rounded-lg p-6">

            <h1 className="text-3xl font-bold text-green-500 mb-8">
              Spotify
            </h1>

            <div className="space-y-5 text-gray-400 font-semibold">

              <button className="flex items-center gap-4 text-white hover:text-green-500 transition">
                <span className="text-2xl">⌂</span>
                Home
              </button>

              <button
                onClick={() =>
                  document.getElementById("searchBox")?.focus()
                }
                className="flex items-center gap-4 hover:text-white transition"
              >
                <span className="text-2xl">⌕</span>
                Search
              </button>

            </div>

          </div>

          <div className="bg-[#121212] rounded-lg flex-1 p-5 overflow-y-auto">

            <div className="flex items-center justify-between mb-7">

              <h2 className="font-bold text-gray-300">
                Your Library
              </h2>

              <button className="text-gray-400 text-2xl hover:text-white">
                +
              </button>

            </div>

            <div className="bg-[#242424] p-4 rounded-lg mb-5">

              <h3 className="font-bold mb-2">
                Create your first playlist
              </h3>

              <p className="text-sm text-gray-300 mb-4">
                It&apos;s easy, we&apos;ll help you.
              </p>

              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition">
                Create playlist
              </button>

            </div>

            <div className="space-y-4">

              {playlists.map((playlist, index) => (

                <div
                  key={playlist}
                  className="flex items-center gap-3 hover:bg-[#242424] p-2 rounded-lg cursor-pointer"
                >

                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-md flex items-center justify-center text-xl">
                    {index === 0 ? "💚" : "♫"}
                  </div>

                  <div>
                    <p className="font-semibold text-sm">
                      {playlist}
                    </p>

                    <p className="text-xs text-gray-400">
                      Playlist
                    </p>
                  </div>

                </div>

              ))}

            </div>

          </div>

        </aside>

        {/* RIGHT CONTENT */}

        <main className="flex-1 bg-[#121212] rounded-lg overflow-y-auto">

          {/* NAVBAR */}

          <header className="sticky top-0 z-20 bg-[#121212]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 p-4 md:px-8">

            <div className="flex items-center gap-3">

              <button className="bg-black rounded-full w-9 h-9 text-xl">
                ‹
              </button>

              <button className="bg-black rounded-full w-9 h-9 text-xl">
                ›
              </button>

            </div>

            <div className="flex items-center gap-3">

              <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition">
                Explore Premium
              </button>

              <button className="bg-[#242424] rounded-full px-4 py-2 text-sm font-bold hover:bg-[#333]">
                Sign up
              </button>

              <button className="bg-white text-black rounded-full px-5 py-2 font-bold text-sm hover:scale-105 transition">
                Log in
              </button>

            </div>

          </header>

          {/* HERO SECTION */}

          <section className="px-5 md:px-8 pt-5">

            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Good morning
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              {songs.slice(0, 6).map((song) => (

                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="flex items-center gap-3 bg-[#242424] hover:bg-[#333333] rounded-md overflow-hidden cursor-pointer group transition"
                >

                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-16 h-16 object-cover"
                  />

                  <span className="font-bold text-sm flex-1">
                    {song.title}
                  </span>

                  <button className="bg-green-500 text-black rounded-full w-10 h-10 mr-3 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-lg">
                    ▶
                  </button>

                </div>

              ))}

            </div>

          </section>

          {/* SEARCH SECTION */}

          <section className="px-5 md:px-8 mt-10">

            <h2 className="text-2xl font-bold mb-5">
              Discover Music
            </h2>

            <div className="flex flex-wrap gap-3 mb-6">

              {["All", "Music", "Podcasts"].map((tab) => (

                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-white text-black"
                      : "bg-[#242424] text-white hover:bg-[#333]"
                  }`}
                >
                  {tab}
                </button>

              ))}

            </div>

            <div className="relative max-w-lg mb-8">

              <span className="absolute left-4 top-3 text-xl text-gray-400">
                ⌕
              </span>

              <input
                id="searchBox"
                type="text"
                placeholder="What do you want to play?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#242424] border border-transparent focus:border-white rounded-full py-3 pl-12 pr-5 outline-none text-white placeholder-gray-400"
              />

            </div>

          </section>

          {/* SONGS SECTION */}

          <section className="px-5 md:px-8 pb-10">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                {search ? "Search Results" : "Popular Songs"}
              </h2>

              <button className="text-gray-400 text-sm font-bold hover:text-white">
                Show all
              </button>

            </div>

            {filteredSongs.length === 0 ? (

              <p className="text-gray-400 py-10">
                No songs found. Try another search.
              </p>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

                {filteredSongs.map((song) => (

                  <div
                    key={song.id}
                    className="bg-[#181818] hover:bg-[#282828] p-3 rounded-lg cursor-pointer transition group"
                  >

                    <div className="relative">

                      <img
                        src={song.image}
                        alt={song.title}
                        className="w-full aspect-square object-cover rounded-md shadow-lg"
                      />

                      <button
                        onClick={() => playSong(song)}
                        className="absolute bottom-2 right-2 bg-green-500 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:scale-105"
                      >
                        ▶
                      </button>

                    </div>

                    <div className="flex items-center justify-between mt-4">

                      <h3 className="font-bold truncate">
                        {song.title}
                      </h3>

                      <button
                        onClick={() => toggleLike(song.id)}
                        className={`text-xl ${
                          likedSongs.includes(song.id)
                            ? "text-green-500"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {likedSongs.includes(song.id) ? "♥" : "♡"}
                      </button>

                    </div>

                    <p className="text-gray-400 text-sm mt-1">
                      {song.artist}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* ALBUMS SECTION */}

          <section className="px-5 md:px-8 pb-12">

            <h2 className="text-2xl font-bold mb-5">
              Popular Albums
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

              {songs.slice(2, 7).map((song) => (

                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="bg-[#181818] hover:bg-[#282828] p-3 rounded-lg cursor-pointer transition"
                >

                  <img
                    src={song.image}
                    alt={song.album}
                    className="w-full aspect-square object-cover rounded-md"
                  />

                  <h3 className="font-bold mt-4 truncate">
                    {song.album}
                  </h3>

                  <p className="text-gray-400 text-sm mt-1">
                    {song.artist}
                  </p>

                </div>

              ))}

            </div>

          </section>

          {/* FOOTER */}

          <footer className="border-t border-[#333] mx-5 md:mx-8 py-8 flex flex-wrap justify-between gap-6 text-gray-400 text-sm">

            <div>
              <h3 className="text-white font-bold mb-3">
                Company
              </h3>
              <p className="mb-2">About</p>
              <p className="mb-2">Jobs</p>
              <p>For the Record</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-3">
                Communities
              </h3>
              <p className="mb-2">For Artists</p>
              <p className="mb-2">Developers</p>
              <p>Advertising</p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-3">
                Useful Links
              </h3>
              <p className="mb-2">Support</p>
              <p className="mb-2">Free Mobile App</p>
              <p>Premium</p>
            </div>

            <div className="text-white text-2xl font-bold">
              Spotify
              <p className="text-gray-500 text-xs font-normal mt-3">
                © 2026 Spotify UI Project
              </p>
            </div>

          </footer>

        </main>

      </div>

      {/* MUSIC PLAYER */}

      <div className="h-24 bg-black border-t border-[#222] px-3 md:px-6 flex items-center justify-between gap-3">

        {/* CURRENT SONG */}

        <div className="flex items-center gap-3 w-[30%] min-w-0">

          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md"
          />

          <div className="min-w-0">

            <h4 className="font-semibold text-sm truncate">
              {currentSong.title}
            </h4>

            <p className="text-xs text-gray-400 truncate">
              {currentSong.artist}
            </p>

          </div>

          <button
            onClick={() => toggleLike(currentSong.id)}
            className={`hidden sm:block text-lg ml-1 ${
              likedSongs.includes(currentSong.id)
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {likedSongs.includes(currentSong.id) ? "♥" : "♡"}
          </button>

        </div>

        {/* PLAYER CONTROLS */}

        <div className="flex flex-col items-center w-[45%] max-w-xl">

          <div className="flex items-center gap-5 md:gap-7 mb-2">

            <button
              onClick={previousSong}
              className="text-gray-400 hover:text-white text-xl"
              title="Previous"
            >
              |◀
            </button>

            <button
              onClick={togglePlay}
              className="bg-white text-black w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "Ⅱ" : "▶"}
            </button>

            <button
              onClick={nextSong}
              className="text-gray-400 hover:text-white text-xl"
              title="Next"
            >
              ▶|
            </button>

          </div>

          {/* PROGRESS BAR */}

          <div className="flex items-center gap-2 w-full">

            <span className="text-[10px] text-gray-400">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 100}
              value={Math.min(currentTime, duration || 100)}
              onChange={(e) => {
                const time = Number(e.target.value);
                if (audioRef.current) {
                  audioRef.current.currentTime = time;
                  setCurrentTime(time);
                }
              }}
              className="w-full h-1 accent-green-500 cursor-pointer"
            />

            <span className="text-[10px] text-gray-400">
              {formatTime(duration)}
            </span>

          </div>

        </div>

        {/* VOLUME */}

        <div className="hidden sm:flex items-center justify-end gap-2 w-[25%]">

          <span className="text-gray-400">🔊</span>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 md:w-28 accent-green-500 cursor-pointer"
          />

        </div>

      </div>

      {/* AUDIO ELEMENT */}

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={nextSong}
      />

    </div>
  );
}
