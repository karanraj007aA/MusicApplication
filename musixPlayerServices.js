import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player';
import { TrackData } from './src/constants'; // update path as needed

export async function setupPlayer() {
    let isSetup = false;
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack != null) return true;
    } catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      isSetup = true;
    }
    return isSetup;
  }
  

  export async function addTrack() {
    await TrackPlayer.reset(); // Ensure the queue is clear
    await TrackPlayer.add(TrackData); // Add array of tracks
  }
  

export async function playbackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });

  TrackPlayer.addEventListener(Event.RemoteSeek, ({ position }) => {
    TrackPlayer.seekTo(position);
  });

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    TrackPlayer.stop();
  });
  TrackPlayer.addEventListener(Event.PlaybackError, (error) => {
    console.error('Playback error:', error);
  });
}
