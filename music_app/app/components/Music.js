'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const Music = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackDuration, setTrackDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [musicTracks, setMusicTracks] = useState([]);
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchMusicTracks = async () => {
            try {
                const response = await fetch("/api");
                const data = await response.json();
                setMusicTracks(data);
                console.log(musicTracks)
            } catch (error) {
                console.error("Error fetching music tracks:", error);
            }
        };
        fetchMusicTracks();
    }, []);

    const currentTrack = musicTracks[currentTrackIndex] || { audio: [] };
    const currentSong = currentTrack.audio[currentSongIndex] || '';

    const playMusic = (trackIndex, songIndex) => {
        setCurrentTrackIndex(trackIndex);
        setCurrentSongIndex(songIndex);
        if (audioRef.current) {
            audioRef.current.src = musicTracks[trackIndex]?.audio[songIndex] || '';
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current) {
                const current = audioRef.current.currentTime;
                const duration = audioRef.current.duration || 0;
                setCurrentTime(formatTime(current));
                setProgressPercentage((current / duration) * 100);
            }
        };

        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);

            const updateDuration = () => {
                const duration = audioRef.current.duration;
                setTrackDuration(duration ? formatTime(duration) : '00:00');
            };

            audioRef.current.addEventListener('loadedmetadata', updateDuration);

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('timeupdate', updateProgress);
                    audioRef.current.removeEventListener('loadedmetadata', updateDuration);
                }
            };
        }
    }, [currentTrackIndex, currentSongIndex]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSeek = (e) => {
        if (audioRef.current) {
            const rect = e.target.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const newTime = (clickX / width) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                onEnded={() => {
                    const nextSongIndex = (currentSongIndex + 1) % currentTrack.audio.length;
                    setCurrentSongIndex(nextSongIndex);
                    if (nextSongIndex === 0 && currentTrackIndex + 1 < musicTracks.length) {
                        setCurrentTrackIndex((currentTrackIndex + 1) % musicTracks.length);
                    }
                    audioRef.current.src = currentTrack.audio[nextSongIndex];
                    audioRef.current.play();
                }}
            ></audio>
            <div className="flex items-center h-screen">
                <div className="w-[90vw] max-md:w-[95vw] m-auto h-[96vh] border border-gray-600 rounded-xl relative">
                    {/* Header */}
                    <div className="h-[10vh] flex items-center justify-center gap-4 text-2xl font-extrabold text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#e25abe" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2">
                            <circle cx="8" cy="18" r="4" />
                            <path d="M12 18V2l7 4" />
                        </svg>
                        <p>MusicPlayer</p>
                    </div>

                    {/* Tracks */}
                    <div className="h-[45vh] flex flex-col items-center gap-3 text-white">
                        <div className="self-start text-xl font-extrabold p-2">Tracks</div>
                        <div className="flex gap-3 w-full px-3 overflow-x-scroll">
                            {musicTracks.map((track, index) => (
                                <div
                                    key={`${track.name}-${index}`}
                                    className="max-md:min-w-[70vw] py-3 hover:border hover:border-white hover:rounded-xl flex flex-col gap-2 text-sm items-center md:w-[20vw]"
                                    onClick={() => setCurrentTrackIndex(index)}
                                >
                                    <div className="w-[13vw] max-md:w-[24vw] h-[25vh] relative bg-white rounded-full">
                                        <Image
                                            src={`${track.image}` || '/default-image.jpg'}
                                            fill
                                            className="object-cover object-center rounded-full"
                                            alt={track.name}
                                        />
                                    </div>
                                    <div>{track.name}</div>
                                    <div className="text-center">{track.artist}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Songs List */}
                    <div className="flex overflow-x-scroll items-center gap-4 p-4">
                        <div className="text-xl font-bold text-white">Songs</div>
                        {currentTrack.audio.map((song, index) => (
                            <div
                                key={index}
                                className={`w-[40vw] md:w-[20vw] p-3 bg-gray-700 text-white rounded-md cursor-pointer ${currentSongIndex === index && isPlaying ? 'bg-pink-600' : ''}`}
                                onClick={() => playMusic(currentTrackIndex, index)}
                            >
                                {`Song ${index + 1}`}
                            </div>
                        ))}
                    </div>

                    {/* PlayBar */}
                    <div className="bg-slate-500 flex flex-col items-center gap-3 justify-center text-white w-full absolute bottom-0 h-[15vh] rounded-xl">
                        <div className="w-full flex md:text-sm text-[10px] max-md:items-center md:justify-between px-3 max-md:flex-col">
                            <div>{currentTrack.name} - {currentTrack.artist}</div>
                            <div className="flex gap-3">
                                {isPlaying ? (
                                    <svg onClick={togglePlayPause} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fdfcfc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg onClick={togglePlayPause} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fdfcfc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play">
                                        <path d="M5 3l14 9-14 9V3z" />
                                    </svg>
                                )}
                            </div>
                            <div>{currentTime} / {trackDuration}</div>
                        </div>
                        <div className="w-[90%] h-[5px] bg-gray-400 rounded-full relative" onClick={handleSeek}>
                            <div className="h-full bg-white rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Music;