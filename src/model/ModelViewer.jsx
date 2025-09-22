import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";

function Model({ path, isMobile }) {
  const modelRef = useRef();
  const { scene } = useGLTF(path);

  // Add a subtle rotation animation to showcase the model
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // Slow rotation for visual interest
    }
  });

  // Use a smaller scale for mobile devices
  const scale = isMobile ? [6, 6, 6] : [13.5, 13.5, 13.5];

  return <primitive ref={modelRef} object={scene} scale={scale} />;
}

function ModelViewer({ modelPath }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Adjust camera position for mobile
  const cameraPosition = isMobile ? [0, 0, 10] : [0, 0, 5];
  const cameraFov = isMobile ? 60 : 50;

  return (
    <div className="w-full h-[50vh] md:h-96">
      {" "}
      {/* Responsive height */}
      <Canvas
        className="w-full h-full"
        camera={{ position: cameraPosition, fov: cameraFov }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 10, 0]} intensity={1.2} />
          <Environment preset="studio" />
          <Model path={modelPath} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ModelViewer;
