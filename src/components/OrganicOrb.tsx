import { useEffect, useRef } from 'react';

interface OrganicOrbProps {
  isActive?: boolean;
  intensity?: number;
  size?: number;
}

// Perlin noise implementation (simplified from Stefan Gustavson)
function perlin3D(x: number, y: number, z: number): number {
  const permute = (x: number) => ((x * 34.0) + 1.0) * x % 289.0;
  
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const zi = Math.floor(z) & 255;
  
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);
  
  const u = xf * xf * xf * (xf * (xf * 6.0 - 15.0) + 10.0);
  const v = yf * yf * yf * (yf * (yf * 6.0 - 15.0) + 10.0);
  const w = zf * zf * zf * (zf * (zf * 6.0 - 15.0) + 10.0);
  
  // Hash coordinates of cube corners
  const p = [permute, permute];
  const a = permute(xi) + yi;
  const aa = permute(a) + zi;
  const ab = permute(a + 1) + zi;
  const b = permute(xi + 1) + yi;
  const ba = permute(b) + zi;
  const bb = permute(b + 1) + zi;
  
  // Gradient dot product
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  };
  
  const x1 = lerp(grad(aa, xf, yf, zf), grad(ba, xf - 1, yf, zf), u);
  const x2 = lerp(grad(ab, xf, yf - 1, zf), grad(bb, xf - 1, yf - 1, zf), u);
  const x3 = lerp(grad(aa + 1, xf, yf, zf - 1), grad(ba + 1, xf - 1, yf, zf - 1), u);
  const x4 = lerp(grad(ab + 1, xf, yf - 1, zf - 1), grad(bb + 1, xf - 1, yf - 1, zf - 1), u);
  
  const y1 = lerp(x1, x2, v);
  const y2 = lerp(x3, x4, v);
  
  return lerp(y1, y2, w) * 2.2;
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

export default function OrganicOrb({ isActive = false, intensity = 1.0, size = 300 }: OrganicOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size * 2; // Higher resolution
    canvas.height = size * 2;
    ctx.scale(2, 2);

    const centerX = size / 2;
    const centerY = size / 2;
    const baseRadius = size * 0.35;

    let time = 0;

    function animate() {
      ctx.clearRect(0, 0, size, size);
      time += 0.008;

      // Draw sphere with smooth displacement
      const steps = 120;
      const points: Array<{ x: number; y: number; nx: number; ny: number }> = [];

      // Generate displaced points
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const x3d = Math.cos(angle);
        const y3d = Math.sin(angle);
        const z3d = 0;

        // Perlin noise displacement (mimicking the shader)
        const distortionFreq = 1.5;
        const distortionStrength = 0.08 * intensity;
        const displacementFreq = 1.2;
        const displacementStrength = 0.12 * intensity;

        const distoredPos = {
          x: x3d + perlin3D(x3d * distortionFreq, y3d * distortionFreq, time) * distortionStrength,
          y: y3d + perlin3D(x3d * distortionFreq, y3d * distortionFreq, time + 100) * distortionStrength,
          z: z3d,
        };

        const perlinStrength = perlin3D(
          distoredPos.x * displacementFreq,
          distoredPos.y * displacementFreq,
          time * 0.5
        );

        const displacement = perlinStrength * displacementStrength;
        const radius = baseRadius * (1 + displacement);

        points.push({
          x: centerX + x3d * radius,
          y: centerY + y3d * radius,
          nx: x3d,
          ny: y3d,
        });
      }

      // Create gradient fill
      const gradient = ctx.createRadialGradient(
        centerX - baseRadius * 0.3,
        centerY - baseRadius * 0.3,
        0,
        centerX,
        centerY,
        baseRadius * 1.4
      );

      // Color scheme based on theorb.boltai.com
      const hue1 = 220; // Blue
      const hue2 = 270; // Purple
      const hue3 = 340; // Pink/red highlight

      gradient.addColorStop(0, `hsla(${hue1}, 80%, 75%, 0.9)`);
      gradient.addColorStop(0.3, `hsla(${hue1}, 70%, 60%, 0.85)`);
      gradient.addColorStop(0.6, `hsla(${hue2}, 60%, 50%, 0.8)`);
      gradient.addColorStop(0.85, `hsla(${hue2}, 70%, 40%, 0.75)`);
      gradient.addColorStop(1, `hsla(${hue3}, 60%, 35%, 0.7)`);

      // Draw smooth curve through points
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[(i + 1) % points.length];
        const p2 = points[(i + 2) % points.length];

        const cp1x = p0.x + (p1.x - p0.x) * 0.5;
        const cp1y = p0.y + (p1.y - p0.y) * 0.5;
        const cp2x = p1.x + (p2.x - p1.x) * 0.5;
        const cp2y = p1.y + (p2.y - p1.y) * 0.5;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p1.x, p1.y);
      }

      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add fresnel-like edge glow
      ctx.strokeStyle = isActive
        ? 'rgba(200, 180, 255, 0.6)'
        : 'rgba(180, 160, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add inner highlight (specular reflection)
      const highlightGrad = ctx.createRadialGradient(
        centerX - baseRadius * 0.35,
        centerY - baseRadius * 0.35,
        0,
        centerX - baseRadius * 0.2,
        centerY - baseRadius * 0.2,
        baseRadius * 0.6
      );

      highlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      highlightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = highlightGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Add outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.8,
        centerX,
        centerY,
        baseRadius * 1.5
      );

      outerGlow.addColorStop(0, 'rgba(120, 100, 255, 0)');
      outerGlow.addColorStop(0.7, 'rgba(120, 100, 255, 0.05)');
      outerGlow.addColorStop(1, 'rgba(120, 100, 255, 0)');

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.5, 0, Math.PI * 2);
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
      style={{ 
        width: size, 
        height: size,
        filter: isActive ? 'brightness(1.1) saturate(1.2)' : 'brightness(1) saturate(1)'
      }}
    />
  );
}
