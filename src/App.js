import { useEffect, useState } from "react";
import useInterval from "@use-it/interval";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Backdrop,
  spotLight,
  Billboard,
  Text
} from "@react-three/drei";
import { Flex, Box, useReflow } from "@react-three/flex";
import create from "zustand";
import data from "./components/data/data.json";

const useStore = create((set) => ({
  slidePosition: 0,
  increaseSlidePosition: () =>
    set((state) => ({
      slidePosition:
        state.slidePosition === 7
          ? (state.slidePositon = 7)
          : state.slidePosition + 1
    })),
  decreaseSlidePosition: () =>
    set((state) => ({
      slidePosition:
        state.slidePosition === 0
          ? (state.slidePositon = 0)
          : state.slidePosition - 1
    })),
  resetSlidePosition: () => set({ slidePosition: 0 })
}));

function Composition({ ...props }) {
  const [state, setState] = useState(true);
  //const reflow = useReflow();
  useInterval(() => setState((s) => !s), 100);

  const flexSize = [4, 4, 1];
  // StateStore
  const slide = useStore((state) => state.slidePosition);
  return (
    <>
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, 3, 0]}
      >
        <Text
          fontSize={1}
          outlineWidth={"5%"}
          outlineColor="#000000"
          outlineOpacity={1}
        >
          Slide {data[slide].id}
        </Text>
      </Billboard>
      <mesh position={[0, 0, 0]}>
        <boxBufferGeometry args={flexSize} />
        <meshNormalMaterial wireframe />
      </mesh>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        plane="xy"
        size={flexSize}
        position={[0, 0, 0]}
        justifyContent="center"
        alignItems="center"
        centerAnchor="true"
      >
        <Box centerAnchor margin="0.5">
          <Billboard>
            <Text
              fontSize={0.5}
              outlineWidth={"5%"}
              outlineColor="#000000"
              outlineOpacity={1}
            >
              {data[slide].title}
            </Text>
          </Billboard>
        </Box>
        <Box centerAnchor margin="0.5">
          <Billboard>
            <Text
              fontSize={0.2}
              maxWidth={4}
              outlineWidth={"5%"}
              outlineColor="#000000"
              outlineOpacity={1}
              lineHeight={1}
              letterSpacing={0.02}
              text={data[slide].desc}
            ></Text>
          </Billboard>
        </Box>
      </Flex>
    </>
  );
}

// referenz, nicht genutzt
/*
function OldComposition({ ...props }) {
  // StateStore
  const slide = useStore((state) => state.slidePosition)
  return (
    <>
    <Billboard follow={true} lockX={false} lockY={false} lockZ={false} position={[0, 3, 0]}>
        <Text fontSize={1} outlineWidth={'5%'} outlineColor="#000000" outlineOpacity={1}>
          Slide {slide}
        </Text>
      </Billboard>
      <Flex 
        flexDirection="row"
        flexWrap="wrap"
        size={[4,20,10]}
        position={[-2,2,0]}
      >
        { new Array(slide).fill().map( (k, i) => 
          (
            <Box margin={0.1} key={i} centerAnchor >
              <mesh  castShadow receiveShadow>
                <boxBufferGeometry />
              </mesh>
            </Box>
          ))
        }
      </Flex>
    </>
  )
}
*/

export default function App() {
  const increaseSlidePosition = useStore(
    (state) => state.increaseSlidePosition
  );
  const decreaseSlidePosition = useStore(
    (state) => state.decreaseSlidePosition
  );
  const resetSlidePosition = useStore((state) => state.resetSlidePosition);
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <mesh
          position={[1, -2, -7]}
          castShadow
          receiveShadow
          scale={0.5}
          onClick={increaseSlidePosition}
        >
          <boxBufferGeometry />
        </mesh>
        <mesh
          position={[0, -2, -7]}
          castShadow
          receiveShadow
          scale={0.5}
          onClick={resetSlidePosition}
        >
          <boxBufferGeometry />
        </mesh>
        <mesh
          position={[-1, -2, -7]}
          castShadow
          receiveShadow
          scale={0.5}
          onClick={() => {
            decreaseSlidePosition();
          }}
        >
          <boxBufferGeometry />
        </mesh>
      </PerspectiveCamera>
      <Composition />
      <Backdrop castShadow floor={2} position={[0, -2, -1]} scale={[5, 4, 1]}>
        <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
      </Backdrop>

      <spotLight
        position={[0, 2, 3]}
        intensity={2.5}
        penumbra={1}
        angle={0.35}
        castShadow
        color="#0c8cbf"
      ></spotLight>

      <OrbitControls />
    </Canvas>
  );
}
