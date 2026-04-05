import { useEffect, useRef } from 'react';

interface OrganicOrbProps {
  isActive?: boolean;
  intensity?: number;
  size?: number;
}

export default function OrganicOrb({ isActive = false, intensity = 1.0, size = 300 }: OrganicOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    let time = 0;

    // Simple noise function
    function noise(x: number, y: number, z: number): number {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      return Math.sin(x * 12.9898 + y * 78.233 + z * 45.543) * 43758.5453 % 1;
    }

    function animate() {
      ctx.clearRect(0, 0, size, size);
      time += 0.02;

      // Draw multiple layers for organic effect
      for (let layer = 3; layer >= 0; layer--) {
        ctx.beginPath();

        const points = 120;
        const layerRadius = radius + layer * 8;
        const alpha = 0.3 - layer * 0.05;

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noiseVal = noise(
            Math.cos(angle) * 2 + time * 0.5,
            Math.sin(angle) * 2 + time * 0.3,
            time * 0.1 + layer
          );

          const displacement = Math.sin(time + angle * 5) * 15 * intensity +
            noiseVal * 20 * intensity;

          const x = centerX + Math.cos(angle) * (layerRadius + displacement);
          const y = centerY + Math.sin(angle) * (layerRadius + displacement);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();

        // Create gradient
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, layerRadius * 1.5
        );

        const colors = isActive
          ? ['#818cf8', '#a78bfa', '#67e8f9']
          : ['#4f46e5', '#7c3aed', '#06b6d4'];

        gradient.addColorStop(0, colors[0] + '40');
        gradient.addColorStop(0.5, colors[1] + '30');
        gradient.addColorStop(1, colors[2] + '10');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect
        if (layer === 0) {
          ctx.shadowColor = colors[0];
          ctx.shadowBlur = 30 * intensity;
          ctx.strokeStyle = colors[0] + '80';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Add pulsing center glow
      const pulseAlpha = 0.15 + Math.sin(time * 2) * 0.05;
      const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.8
      );
      centerGradient.addColorStop(0, `rgba(255, 255, 255, ${pulseAlpha})`);
      centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, intensity, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="animate-orb-pulse"
      style={{ filter: isActive ? 'brightness(1.2)' : 'brightness(1)' }}
    />
  );
}
