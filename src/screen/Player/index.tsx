import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
// import { setupPlayer } from 'react-native-track-player/lib/src/trackPlayer';

import {addTrack, setupPlayer} from '../../../musixPlayerServices.js';
const AudioPlayerScreen = () => {
  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();

  useEffect(() => {
    const startPlayer = async () => {
      const isSetup = await setupPlayer();
      if (isSetup) {
        await addTrack();
        const currentTrack = await TrackPlayer.getCurrentTrack();
        console.log('Track successfully added:', currentTrack);
      }
    };

    startPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  const togglePlayback = async () => {
    const currentState = await TrackPlayer.getState();
    console.log('Current playback state:', currentState);

    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else if (currentState === State.Paused || currentState === State.Ready) {
      await TrackPlayer.play();
    } else {
      console.warn('Player is not ready to play, current state:', currentState);
    }
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>30 Mins Binaural Beats</Text>
      <Text style={styles.subtitle}>👥 10K men taken action</Text>

      <View style={styles.waveformPlaceholder} />

      <View style={styles.timerContainer}>
        <Image
          source={require('../../assets/images/Group.png')}
          style={styles.icon}
        />
        <Text style={styles.timer}>{formatTime(position)}</Text>
        <Image
          source={require('../../assets/images/increase.png')}
          style={styles.icon}
        />
      </View>

      <Slider
        style={{width: 300, height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#FF9900"
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />

      <View style={styles.controls} >
        <TouchableOpacity style={styles.playButton} onPress={() => {} }>
          <Image
            source={require('../../assets/images/reset.png')}
            style={styles.playIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Image
            source={
              playbackState === State.Playing
                ? require('../../assets/images/pause.png')
                : require('../../assets/images/pause.png')
            }
            style={styles.playIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={() =>{} }>
          <Image
            source={require('../../assets/images/increase.png')}
            style={styles.playIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  waveformPlaceholder: {
    width: '90%',
    height: 100,
    backgroundColor: '#333',
    marginVertical: 20,
    borderRadius: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  timer: {
    color: '#fff',
    fontSize: 18,
  },
  playButton: {
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    // backgroundColor: '#FF9900',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  playIcon: {
    width: 32,
    height: 32,
    tintColor: '#fff',
  },
  controls:{
    flexDirection:'row',justifyContent:"space-between"
  }
});

export default AudioPlayerScreen;
