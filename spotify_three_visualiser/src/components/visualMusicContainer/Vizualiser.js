import * as THREE from "three";
import { Suspense, useEffect, useRef, useMemo, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import useStore from "./audioLink";
import  {AppContext }  from "../../utils/AppContextProvider";

export default function Visualizer({ trackId, accessToken }) {
  const { currentTrack, isPlaying } = useContext(AppContext);
  const loaded = useStore((state) => state.api.loaded);

  useEffect(() => {
    loaded(trackId, accessToken);
  }, [trackId, accessToken, loaded]);

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [-1, 1.5, 2], fov: 25 }}>
      <spotLight
        position={[-4, 4, -4]}
        angle={0.06}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <Suspense fallback={null}>
        <Track />
        <div>
          {isPlaying && <div> Vissualizing {currentTrack.title}</div>}
        </div>

        <Zoom />
      </Suspense>
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.025, 0]}
      >
        <planeGeometry />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>
    </Canvas>
  );
}

function Track({
  y = 2500,
  space = 1.8,
  width = 0.01,
  height = 0.05,
  ...props
}) {
  const ref = useRef();
  const audio = useStore((state) => state.audio);

  const instancedMesh = useMemo(() => {
    const obj = new THREE.Object3D();
    obj.updateMatrix();
    return (
      <instancedMesh
        castShadow
        ref={ref}
        args={[null, null, audio.track.data.length]}
        {...props}
      >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    );
  }, [audio.track.data.length, width, height, props]);

  useFrame(() => {
    const avg = audio.track.avg;
    const data = audio.track.data;

    for (let i = 0; i < data.length; i++) {
      const obj = new THREE.Object3D();
      obj.position.set(
        i * width * space - (data.length * width * space) / 2,
        data[i] / y,
        0
      );
      obj.updateMatrix();
      ref.current.setMatrixAt(i, obj.matrix);
    }

    ref.current.material.color.setHSL(avg / 500, 0.75, 0.75);
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return instancedMesh;
}

function Zoom() {
  const audio = useStore((state) => state.audio);

  useFrame((state) => {
    state.camera.fov = 25 - audio.track.avg / 15;
    state.camera.updateProjectionMatrix();
  });

  return null;
}
// async function createAudio(url) {
//   // Fetch audio data and create a buffer source
//   const res = await fetch(url)
//   const buffer = await res.arrayBuffer()
//   const context = new (window.AudioContext || window.webkitAudioContext)()
//   const source = context.createBufferSource()
//   source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
//   source.loop = true
//   // This is why it doesn't run in Safari 🍏🐛. Start has to be called in an onClick event
//   // which makes it too awkward for a little demo since you need to load the async data first
//   source.start(0)
//   // Create gain node and an analyser
//   const gain = context.createGain()
//   const analyser = context.createAnalyser()
//   analyser.fftSize = 64
//   source.connect(analyser)
//   analyser.connect(gain)
//   // The data array receive the audio frequencies
//   const data = new Uint8Array(analyser.frequencyBinCount)
//   return {
//     context,
//     source,
//     gain,
//     data,
//     // This function gets called every frame per audio source
//     update: () => {
//       analyser.getByteFrequencyData(data)
//       // Calculate a frequency average
//       return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
//     },
//   }
// }
