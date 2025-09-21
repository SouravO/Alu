import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Box } from "@react-three/drei";

/**
 * Simple FoodContainer3D component using basic Box geometry
 * instead of loading a GLB model that's causing errors
 */
const FoodContainer3D = ({ hideControls = false }) => {
  const [showFallback, setShowFallback] = useState(false);

  // Use a timeout to detect if the 3D canvas fails to load
  useEffect(() => {
    // Show fallback after timeout if canvas doesn't load
    const fallbackTimer = setTimeout(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        console.log("Canvas not loaded after timeout, showing fallback image");
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Simple food container using basic shapes instead of loading a model
  const SimpleFoodContainer = () => {
    return (
      <group>
        {/* Container base */}
        <Box args={[3, 0.5, 2]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#E0E0E0"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>

        {/* Container inside */}
        <Box args={[2.8, 0.1, 1.8]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#FFFFFF" />
        </Box>
      </group>
    );
  };

  return (
    <div className="w-full h-full relative">
      {/* Fallback image */}
      <img
        src="https://res.cloudinary.com/daqcima3z/image/upload/v1695188190/aluminum-container_vz4dif.png"
        alt="Aluminum Food Container"
        className="w-full h-full object-contain absolute inset-0"
        style={{
          opacity: showFallback ? 0.8 : 0,
          transition: "opacity 0.5s ease",
        }}
        id="fallback-image"
      />

      {/* 3D Container using simple geometry */}
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 1, 5], fov: 40 }}
        onCreated={() => {
          console.log("Canvas created successfully");
          setShowFallback(false);
        }}
        onError={() => {
          console.error("Canvas error detected");
          setShowFallback(true);
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <SimpleFoodContainer />
          <Environment preset="studio" />
        </Suspense>
        {!hideControls && <OrbitControls enableZoom={true} enablePan={false} />}
      </Canvas>
    </div>
  );
};

export default FoodContainer3D;
