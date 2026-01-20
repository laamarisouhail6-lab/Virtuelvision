
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Check, Timer as TimerIcon, Undo2, Palette, Info, Navigation2, Compass } from 'lucide-react';
import { BrushType } from '../types';
import { BRUSH_CONFIGS } from '../constants';
import { getHeritageInfo } from '../services/gemini';

interface CameraViewProps {
  isPro: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[]; // Coordinates relative to the 'World Origin'
  color: string;
  brush: BrushType;
}

const CameraView: React.FC<CameraViewProps> = ({ isPro }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [currentBrush, setCurrentBrush] = useState<BrushType>(BrushType.NEON);
  const [brushColor, setBrushColor] = useState('#00f2ff');
  const [timeLeft, setTimeLeft] = useState(isPro ? 900 : 120);
  const [heritageInfo, setHeritageInfo] = useState<string | null>(null);
  const [showBrushMenu, setShowBrushMenu] = useState(false);
  
  // AR Anchoring State
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  
  // Viewport tracking
  const [viewOffset, setViewOffset] = useState<Point>({ x: 0, y: 0 });
  const [initialOrientation, setInitialOrientation] = useState<{alpha: number, beta: number} | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }, 
          audio: false 
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
      }
    };
    startCamera();

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha === null || e.beta === null) return;
      
      if (!initialOrientation) {
        setInitialOrientation({ alpha: e.alpha, beta: e.beta });
        return;
      }

      const PX_PER_DEGREE = 25;
      
      let diffAlpha = e.alpha - initialOrientation.alpha;
      if (diffAlpha > 180) diffAlpha -= 360;
      if (diffAlpha < -180) diffAlpha += 360;

      const diffBeta = e.beta - initialOrientation.beta;

      setViewOffset({
        x: -diffAlpha * PX_PER_DEGREE,
        y: diffBeta * PX_PER_DEGREE
      });
    };

    const requestMotionPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const response = await (DeviceOrientationEvent as any).requestPermission();
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (err) {
          console.error("Permission request failed", err);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestMotionPermission();

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('deviceorientation', handleOrientation);
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [initialOrientation]);

  useEffect(() => {
    const checkHeritage = async () => {
      const info = await getHeritageInfo("Sultan Hassan Mosque");
      setHeritageInfo(info || "Heritage Site - Please follow local rules");
    };
    checkHeritage();
  }, []);

  const redrawCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const drawStroke = (points: Point[], color: string, brush: BrushType) => {
      if (points.length < 2) return;
      ctx.beginPath();
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      
      if (brush === BrushType.NEON) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.moveTo(points[0].x + viewOffset.x, points[0].y + viewOffset.y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x + viewOffset.x, points[i].y + viewOffset.y);
      }
      ctx.stroke();
    };

    strokes.forEach(s => drawStroke(s.points, s.color, s.brush));
    
    if (currentStroke.length > 0) {
      drawStroke(currentStroke, brushColor, currentBrush);
    }
  }, [strokes, currentStroke, viewOffset, brushColor, currentBrush]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    setIsInteractionActive(true);
    setCurrentStroke([{ x: x - viewOffset.x, y: y - viewOffset.y }]);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isInteractionActive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;

    setCurrentStroke(prev => [...prev, { x: x - viewOffset.x, y: y - viewOffset.y }]);
  };

  const handleEnd = () => {
    if (isInteractionActive) {
      if (currentStroke.length > 1) {
        setStrokes(prev => [...prev, { points: currentStroke, color: brushColor, brush: currentBrush }]);
      }
      setCurrentStroke([]);
      setIsInteractionActive(false);
    }
  };

  const undo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  const isLookingAway = Math.abs(viewOffset.x) > 600 || Math.abs(viewOffset.y) > 800;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity"
      />
      
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute inset-0 z-10 touch-none cursor-crosshair"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />

      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className={`glass px-4 py-2 rounded-full flex items-center gap-2 border-white/20 ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            <TimerIcon size={18} />
            <span className="font-bold">{Math.floor(timeLeft/60)}:{ (timeLeft%60).toString().padStart(2,'0') }</span>
          </div>
          {heritageInfo && (
            <div className="glass p-3 rounded-2xl max-w-[220px] text-[10px] leading-relaxed bg-amber-500/20 border-amber-500/30 flex gap-2">
              <Info size={14} className="shrink-0 text-amber-500" />
              <span>{heritageInfo}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3 pointer-events-auto items-end">
          <div className="flex gap-2">
            <button onClick={undo} className="glass p-3 rounded-full text-white active:bg-white/20 transition-all active:scale-90"><Undo2 size={24}/></button>
            <button className="bg-white/10 glass p-3 rounded-full text-white active:scale-90" onClick={() => setShowBrushMenu(!showBrushMenu)}>
              <Palette size={24}/>
            </button>
          </div>
          <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-cyan-400 border-cyan-500/30">
            <Navigation2 size={12} className="animate-pulse" />
            <span>Spatial Anchoring Active</span>
          </div>
        </div>
      </div>

      {showBrushMenu && (
        <div className="absolute top-20 right-4 z-30 flex flex-col gap-2 glass p-2 rounded-3xl animate-in slide-in-from-right fade-in">
          {BRUSH_CONFIGS.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setCurrentBrush(b.id);
                setBrushColor(b.color);
                setShowBrushMenu(false);
              }}
              className={`p-3 rounded-2xl transition-all ${currentBrush === b.id ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50' : 'text-white/60 hover:bg-white/10'}`}
            >
              {b.icon}
            </button>
          ))}
        </div>
      )}

      {strokes.length > 0 && isLookingAway && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="glass p-6 rounded-full animate-pulse border-cyan-500/50">
              <Compass size={48} className="text-cyan-400" style={{ transform: `rotate(${Math.atan2(viewOffset.y, viewOffset.x) * (180/Math.PI)}deg)` }} />
            </div>
            <div className="glass px-6 py-2 rounded-full text-sm text-white/90 font-medium">
              Point camera towards your artwork
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-24 left-0 right-0 p-6 z-20 flex justify-center items-center gap-8 pointer-events-none">
        <button 
          className="p-4 rounded-full glass text-white pointer-events-auto hover:bg-red-500/20 active:scale-90 transition-all" 
          onClick={() => { if(confirm('Clear all drawings?')) setStrokes([]) }}
        >
          <X size={28} />
        </button>
        
        <div className="relative pointer-events-auto">
          <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center group active:scale-95 transition-transform">
            <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] cursor-pointer" />
          </div>
        </div>

        <button className="p-4 rounded-full bg-cyan-500 text-white pointer-events-auto shadow-lg shadow-cyan-500/50 active:scale-90 transition-all">
          <Check size={28} />
        </button>
      </div>

      {strokes.length === 0 && !isInteractionActive && (
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2 text-white/60 text-xs font-medium pointer-events-none animate-bounce">
          Touch screen to draw in space
        </div>
      )}
    </div>
  );
};

export default CameraView;
