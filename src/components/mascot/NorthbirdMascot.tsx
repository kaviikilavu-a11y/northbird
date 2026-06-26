"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type MascotState = "idle" | "flying" | "landing" | "perched" | "singing";
export type MascotFacing = "right" | "left";

export interface NorthbirdMascotHandle {
  fly: () => void;
  land: () => void;
  turn: (direction: MascotFacing) => void;
  idle: () => void;
}

interface Props {
  size?: number;
  className?: string;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

const NorthbirdMascot = forwardRef<NorthbirdMascotHandle, Props>(function NorthbirdMascot(
  { size = 64, className = "", onHover, onHoverEnd },
  ref
) {
  const [state, setState] = useState<MascotState>("idle");
  const [facing, setFacing] = useState<MascotFacing>("right");
  const [hovered, setHovered] = useState(false);
  const landingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    fly() {
      setState("flying");
    },
    land() {
      setState("landing");
      if (landingTimer.current) clearTimeout(landingTimer.current);
      landingTimer.current = setTimeout(() => setState("perched"), 600);
    },
    turn(dir: MascotFacing) {
      setFacing(dir);
    },
    idle() {
      setState("idle");
    },
  }));

  const handleMouseEnter = () => {
    setHovered(true);
    if (state === "perched") setState("singing");
    onHover?.();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (state === "singing") setState("perched");
    onHoverEnd?.();
  };

  const isFlipped = facing === "left";

  return (
    <div
      className={`select-none cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Northbird mascot"
      role="img"
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        style={{
          transform: isFlipped ? "scaleX(-1)" : undefined,
          transition: "transform 0.3s ease",
        }}
        className={[
          state === "idle" || state === "perched" ? "animate-bird-bob" : "",
          state === "flying" ? "animate-bird-fly" : "",
          state === "landing" ? "animate-bird-land" : "",
          state === "singing" ? "animate-bird-sing" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Body */}
        <ellipse cx="32" cy="38" rx="13" ry="11" fill="#4F7C81" />

        {/* Breast */}
        <ellipse cx="35" cy="41" rx="8" ry="7" fill="#FBF7EE" />

        {/* Head */}
        <circle cx="36" cy="24" r="11" fill="#4F7C81" />

        {/* Crown tuft */}
        <path d="M36 13 Q34 8 37 6 Q39 10 38 13Z" fill="#E8AE3F" />
        <path d="M38 14 Q37 8 40 7 Q41 11 39 14Z" fill="#E8AE3F" />

        {/* Eye */}
        <circle cx="39" cy="22" r="3.5" fill="white" />
        <circle
          cx="39.5"
          cy="22"
          r="2"
          fill="#2c1a0e"
          className={state === "idle" ? "animate-blink" : ""}
        />
        <circle cx="40.2" cy="21.3" r="0.6" fill="white" />

        {/* Beak */}
        <path d="M47 23 L52 24 L47 25Z" fill="#D97B2B" />

        {/* Wing */}
        <path
          d="M23 34 Q18 28 20 22 Q24 26 26 32Z"
          fill="#7FA8AD"
          className={
            state === "singing" || state === "flying"
              ? "animate-wing-flap"
              : state === "idle"
              ? "animate-wing-rest"
              : ""
          }
        />
        <path
          d="M25 36 Q20 31 22 26 Q26 30 28 35Z"
          fill="#4F7C81"
          opacity="0.7"
          className={
            state === "singing" || state === "flying"
              ? "animate-wing-flap"
              : state === "idle"
              ? "animate-wing-rest"
              : ""
          }
        />

        {/* Tail */}
        <path d="M19 42 Q14 48 17 52 Q22 46 26 44Z" fill="#4F7C81" />
        <path d="M22 44 Q17 50 20 53 Q25 47 28 46Z" fill="#7FA8AD" opacity="0.7" />

        {/* Feet (visible when perched) */}
        {(state === "perched" || state === "singing" || state === "landing") && (
          <>
            <path d="M29 48 L27 54 M27 54 L24 56 M27 54 L28 57 M27 54 L30 56" stroke="#D97B2B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M33 49 L31 55 M31 55 L28 57 M31 55 L32 58 M31 55 L34 57" stroke="#D97B2B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Singing notes */}
        {state === "singing" && (
          <>
            <text x="46" y="16" fontSize="8" fill="#E8AE3F" className="animate-note-1">♪</text>
            <text x="50" y="10" fontSize="6" fill="#D97B2B" className="animate-note-2">♫</text>
          </>
        )}
      </svg>
    </div>
  );
});

export default NorthbirdMascot;
