'use client';

import { Suspense, useRef, useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion, useMotionValue, animate } from 'framer-motion';
import { RotateCw, ZoomIn, ZoomOut, Pause, Play, RefreshCw } from 'lucide-react';
import * as THREE from 'three';

const INITIAL_CAMERA = [0, 2, 7] as const;

interface CameraHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

function CarModel({ autoRotate, rotateRef }: { autoRotate: boolean; rotateRef: React.MutableRefObject<boolean> }) {
  const { scene } = useGLTF('/assets/bmw_m5_g90_2024__www.vecarz.com.glb');
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current && rotateRef.current) {
      ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1} />
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.82, 0]} receiveShadow>
      <circleGeometry args={[12, 64]} />
      <meshStandardMaterial
        color="#0a0a0a"
        metalness={0.8}
        roughness={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

const CameraController = forwardRef<CameraHandle>(function CameraController(_props, ref) {
  const { camera, controls } = useThree() as { camera: THREE.PerspectiveCamera; controls: { target: THREE.Vector3 } & any };

  useImperativeHandle(ref, () => ({
    zoomIn() {
      (camera as THREE.PerspectiveCamera).position.multiplyScalar(0.85);
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    },
    zoomOut() {
      (camera as THREE.PerspectiveCamera).position.multiplyScalar(1.18);
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    },
    reset() {
      (camera as THREE.PerspectiveCamera).position.set(...INITIAL_CAMERA);
      if (controls?.target) controls.target.set(0, 0, 0);
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    },
  }));

  return null;
});

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="#D4AF37" wireframe />
    </mesh>
  );
}

function AnimatedGradientBg() {
  const background = useMotionValue(
    'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212,175,55,0.10), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(255,106,26,0.06), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(245,213,121,0.05), transparent 50%)'
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const keyframes = [
      'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212,175,55,0.10), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(255,106,26,0.06), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(245,213,121,0.05), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(255,106,26,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 25% 70%, rgba(212,175,55,0.07), transparent 55%), radial-gradient(ellipse 70% 45% at 60% 15%, rgba(245,213,121,0.04), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 50% 75%, rgba(212,175,55,0.09), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 20%, rgba(255,106,26,0.05), transparent 55%), radial-gradient(ellipse 70% 45% at 20% 55%, rgba(245,213,121,0.06), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212,175,55,0.10), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(255,106,26,0.06), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(245,213,121,0.05), transparent 50%)',
    ];

    const controls = animate(background, keyframes, {
      duration: 18,
      repeat: Infinity,
      ease: 'easeInOut',
    });

    return () => controls.stop();
  }, [background]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background }}
    />
  );
}

export default function CarViewer360() {
  const [autoRotate, setAutoRotate] = useState(true);
  const rotateRef = useRef(true);
  const cameraRef = useRef<CameraHandle>(null);

  useEffect(() => {
    rotateRef.current = autoRotate;
  }, [autoRotate]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-obsidian">
      <AnimatedGradientBg />

      {/* Zoom buttons — bottom right */}
      <div className="absolute right-3 bottom-10 sm:right-4 sm:bottom-12 flex flex-col gap-2 z-20">
        <button
          onClick={() => cameraRef.current?.zoomIn()}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 text-cream hover:bg-gold/20 hover:border-gold/40 transition-all cursor-pointer"
          aria-label="تكبير"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => cameraRef.current?.zoomOut()}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 text-cream hover:bg-gold/20 hover:border-gold/40 transition-all cursor-pointer"
          aria-label="تصغير"
        >
          <ZoomOut size={16} />
        </button>
      </div>

      {/* Reset button — bottom right below zoom */}
      <div className="absolute right-3 bottom-1 sm:right-4 sm:bottom-2 z-20">
        <button
          onClick={() => cameraRef.current?.reset()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 text-xs font-semibold text-cream hover:bg-gold/20 hover:border-gold/40 transition-all cursor-pointer"
          aria-label="إعادة ضبط العرض"
        >
          <RefreshCw size={13} />
          إعادة ضبط
        </button>
      </div>

      <Canvas
        camera={{ position: [...INITIAL_CAMERA], fov: 35 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ cursor: 'grab' }}
        onPointerDown={() => {
          document.querySelector('canvas')!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          document.querySelector('canvas')!.style.cursor = 'grab';
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[0, 3, 0]} intensity={0.3} color="#FF6A1A" />

        <Suspense fallback={<Loader />}>
          <CarModel autoRotate={autoRotate} rotateRef={rotateRef} />
          <Ground />
          <Environment preset="studio" />
          <ContactShadows position={[0, -0.81, 0]} opacity={0.5} scale={14} blur={2.5} far={4} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={3}
          maxDistance={10}
          target={[0, 0, 0]}
        />

        <CameraController ref={cameraRef} />
      </Canvas>

      {/* Bottom bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 text-xs font-semibold text-cream hover:bg-gold/20 hover:border-gold/40 transition-all cursor-pointer"
        >
          {autoRotate ? <Pause size={14} /> : <Play size={14} />}
          {autoRotate ? 'إيقاف' : 'دوران تلقائي'}
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 text-xs text-muted">
          <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} style={{ animationDuration: '3s' }} />
          اسحب للتدوير
        </div>
      </div>
    </div>
  );
}
