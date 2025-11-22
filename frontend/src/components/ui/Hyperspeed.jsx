import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Hyperspeed Animation Component
 * Creates a dynamic starfield/particle effect background
 */

// Preset configurations for different visual effects
export const hyperspeedPresets = {
  one: {
    particleCount: 100,
    particleSize: 2,
    speed: 2,
    color: '#ffffff',
    trailLength: 0.3,
  },
  two: {
    particleCount: 150,
    particleSize: 1.5,
    speed: 3,
    color: '#a855f7', // Purple theme
    trailLength: 0.5,
  },
  three: {
    particleCount: 80,
    particleSize: 3,
    speed: 1.5,
    color: '#60a5fa', // Blue theme
    trailLength: 0.2,
  },
  four: {
    particleCount: 200,
    particleSize: 1,
    speed: 4,
    color: '#ffffff',
    trailLength: 0.6,
  },
  subtle: {
    particleCount: 60,
    particleSize: 1.5,
    speed: 1,
    color: '#a855f7',
    trailLength: 0.4,
  },
};

const Hyperspeed = ({ 
  effectOptions = hyperspeedPresets.one,
  className = '',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
        this.prevX = this.x;
        this.prevY = this.y;
      }

      update() {
        this.prevX = this.x;
        this.prevY = this.y;

        this.z -= effectOptions.speed;

        if (this.z <= 0) {
          this.reset();
          this.z = canvas.width;
        }

        // 3D to 2D projection
        const scale = canvas.width / this.z;
        this.x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        this.y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
      }

      draw() {
        const scale = canvas.width / this.z;
        const size = effectOptions.particleSize * scale;

        ctx.beginPath();
        ctx.strokeStyle = effectOptions.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = 1 - this.z / canvas.width;

        // Draw trail
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        // Draw particle
        ctx.fillStyle = effectOptions.color;
        ctx.fillRect(this.x - size / 2, this.y - size / 2, size, size);
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < effectOptions.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      // Create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${effectOptions.trailLength})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [effectOptions]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('w-full h-full', className)}
      style={{ background: 'transparent' }}
    />
  );
};

export default Hyperspeed;
