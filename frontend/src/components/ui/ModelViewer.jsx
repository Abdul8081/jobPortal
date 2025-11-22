import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * ModelViewer Component
 * Renders a 3D model using Three.js with interactive controls
 * Supports auto-rotation, mouse parallax, and touch interactions
 */
const ModelViewer = ({
  url,
  width = 400,
  height = 400,
  autoRotate = false,
  enableMouseParallax = false,
  className = '',
}) => {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dimensions, setDimensions] = useState({ width, height });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width || width,
          height: rect.height || height,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [width, height]);

  useEffect(() => {
    let scene, camera, renderer, model, animationId;
    let mouseX = 0, mouseY = 0;

    const init = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

        // Setup scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, dimensions.width / dimensions.height, 0.1, 1000);
        camera.position.z = 5;

        // Setup renderer
        renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true 
        });
        renderer.setSize(dimensions.width, dimensions.height);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current?.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Load model
        const loader = new GLTFLoader();
        loader.load(
          url,
          (gltf) => {
            model = gltf.scene;
            
            // Center and scale model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            
            model.scale.multiplyScalar(scale);
            model.position.sub(center.multiplyScalar(scale));
            
            scene.add(model);
            setIsLoading(false);
          },
          undefined,
          (err) => {
            console.error('Error loading model:', err);
            setError('Failed to load 3D model');
            setIsLoading(false);
          }
        );

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          if (model) {
            if (autoRotate) {
              model.rotation.y += 0.005;
            }

            if (enableMouseParallax) {
              model.rotation.y += (mouseX - model.rotation.y) * 0.05;
              model.rotation.x += (mouseY - model.rotation.x) * 0.05;
            }
          }

          renderer.render(scene, camera);
        };
        animate();

      } catch (err) {
        console.error('Error initializing ModelViewer:', err);
        setError('Failed to initialize 3D viewer');
        setIsLoading(false);
      }
    };

    init();

    // Mouse/Touch event handlers
    const handleMouseMove = (event) => {
      if (!enableMouseParallax) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleTouchMove = (event) => {
      if (!enableMouseParallax || event.touches.length === 0) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('touchmove', handleTouchMove);

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      }
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('touchmove', handleTouchMove);
    };
  }, [url, dimensions.width, dimensions.height, autoRotate, enableMouseParallax]);

  return (
    <div 
      ref={containerRef} 
      className={cn('relative', className)}
      style={{ width: '100%', height: '100%', minHeight: height }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading 3D Model...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6">
          {/* Animated Fallback Icon */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-purple-200 dark:bg-purple-900/30 rounded-full animate-pulse"></div>
            </div>
            <div className="relative z-10 p-8">
              <svg 
                className="w-24 h-24 text-purple-600 dark:text-purple-400 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 text-center mt-4">
            Your Dream Job Awaits
          </p>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
