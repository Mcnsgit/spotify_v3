import { useContext, useEffect } from "react";
import create from "zustand";
import { addEffect } from "@react-three/fiber";
import {
  getTrackAudioFeatures,
  getTrackAudioAnalysis,
} from "../../utils/SpotifyPlayerApi";
import { AppContext } from "../../utils/AppContextProvider";

async function createAudio(trackId, accessToken, { threshold, expire } = {}) {
  const audio = new Audio();
  audio.crossOrigin = "anonymous";
  audio.src = `https://api.spotify.com/v1/audio-features/${trackId}`;
  audio.onload = () => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    const data = new Uint8Array(analyser.frequencyBinCount);
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 2048;
    let state = {
      data,
      signal: false,
      avg: 0,
      loudness: 0,
      tempo: 0,
      timeSignature: 0,
      key: 0,
      mode: 0,
      bars: 0,
      beats: 0,
      sections: 0,
      segments: 0,
      tatums: 0,
      update: () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((sum, value) => sum + value, 0) / data.length;
        state.avg = avg;
        state.signal = avg > threshold;
      },
    };
    return state;
  };

  try {
    const [featuresData, analysisData] = await Promise.all([
      getTrackAudioFeatures(trackId, accessToken),
      getTrackAudioAnalysis(trackId, accessToken),
    ]);
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = context.createAnalyser();
    analyser.fftSize = 2048;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let state = {
      data,
      signal: false,
      avg: 0,
      loudness: featuresData?.loudness || 0,
      tempo: featuresData?.tempo || 0,
      timeSignature: featuresData?.time_signature || 0,
      key: featuresData?.key || 0,
      mode: featuresData?.mode || 0,
      bars: analysisData?.bars || [],
      beats: analysisData?.beats || [],
      sections: analysisData?.sections || [],
      segments: analysisData?.segments || [],
      tatums: analysisData?.tatums || [],
      update: () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((sum, value) => sum + value, 0) / data.length;
        state.avg = avg;
        state.signal = avg > threshold;
      },
    };
    return state;
  } catch (error) {
    console.error("Error creating audio:", error);
    return mockData();
  }
}

const mockData = () => ({
  signal: false,
  avg: 0,
  gain: 1,
  data: [],
});

const useStore = create((set, get) => {
  const { statevalue } = useContext(AppContext);
  const { currentTrack } = statevalue;

  useEffect(() => {
    if (currentTrack && statevalue.token) {
      get().api.loaded(statevalue.token);
    }
  }, [currentTrack, statevalue.token, get]);

  return {
    loaded: false,
    clicked: false,
    audio: {
      track: mockData(),
    },
    track: {
      synthonly: false,
      kicks: 0,
      loops: 0,
    },
    api: {
      async loaded(accessToken) {
        if (currentTrack) {
          set({
            loaded: true,
            audio: {
              track: await createAudio(currentTrack.uri, accessToken, {
                threshold: 10,
                expire: 500,
              }),
            },
          });
        }
      },
      start() {
        const audio = get().audio;
        const track = get().track;
        set({ clicked: true });
        addEffect(() => {
          audio.track.update();
          if (audio.track.signal) track.kicks++;
          if (track.kicks > 6) {
            if (track.loops++ > 6) {
              track.synthonly = !track.synthonly;
              track.loops = 0;
            }
            track.kicks = 0;
          }
        });
      },
    },
  };
});

export default useStore;