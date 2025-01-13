import React, { useEffect, useRef } from 'react';
import { Headphones } from 'lucide-react';
import { TbHeadphonesOff } from "react-icons/tb";

export default function Lofi() {
  const [isMuted, setIsMuted] = React.useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.log('Autoplay prevented. User interaction required.', error);
      }
    };
    playAudio();
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="/public/lofi.mp3"
        loop
        autoPlay
      />
      <button
        onClick={toggleMute}
        className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        {isMuted ? (
          <TbHeadphonesOff className="w-6 h-6" color='white'/>
        ) : (
          <Headphones className="w-6 h-6" color='white'/>
        )}
      </button>
    </div>
  );
}
