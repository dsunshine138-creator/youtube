
"use client";

import { useEffect, useRef, useState } from "react";

function gamepage() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  const [status, setStatus] = useState("start");
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [best, setBest] = useState(0);

  const statusRef = useRef("start");

  // INITIAL GAME DATA

  if (!gameRef.current) {
    gameRef.current = {
      lane: 1,
      jump: 0,
      slide: 0,
      objects: [],
      score: 0,
      coins: 0,
      speed: 5,
      spawn: 0,
      running: false,
      lastTime: 0,
    };
  }

  // CHANGE GAME STATUS

  const changeStatus = (value) => {
    statusRef.current = value;
    setStatus(value);
    gameRef.current.running = value === "playing";
  };

  // START GAME

  const startGame = () => {
    const game = gameRef.current;

    game.lane = 1;
    game.jump = 0;
    game.slide = 0;
    game.objects = [];
    game.score = 0;
    game.coins = 0;
    game.speed = 5;
    game.spawn = 0;
    game.lastTime = 0;

    setScore(0);
    setCoins(0);

    changeStatus("playing");
  };

  // MOVEMENT

  const left = () => {
    if (statusRef.current !== "playing") return;

    gameRef.current.lane = Math.max(
      0,
      gameRef.current.lane - 1
    );
  };

  const right = () => {
    if (statusRef.current !== "playing") return;

    gameRef.current.lane = Math.min(
      2,
      gameRef.current.lane + 1
    );
  };

  const jump = () => {
    const game = gameRef.current;

    if (
      statusRef.current === "playing" &&
      game.jump <= 0 &&
      game.slide <= 0
    ) {
      game.jump = 0.8;
    }
  };

  const slide = () => {
    const game = gameRef.current;

    if (
      statusRef.current === "playing" &&
      game.slide <= 0 &&
      game.jump <= 0
    ) {
      game.slide = 0.7;
    }
  };

  // KEYBOARD CONTROLS

  useEffect(() => {
    const handleKey = (e) => {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "]
          .includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.repeat) return;

      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") left();
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") right();
      if (e.key === "ArrowUp" || e.key === " ") jump();
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") slide();

      if (e.key === "Escape") {
        if (statusRef.current === "playing") {
          changeStatus("paused");
        } else if (statusRef.current === "paused") {
          changeStatus("playing");
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  });

  // GAME ENGINE

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const game = gameRef.current;

    const W = 900;
    const H = 500;

    const lanes = [300, 450, 600];

    let animation;
    let previousTime = 0;
    let hudTime = 0;

    // DRAW RECTANGLE

    const rect = (x, y, w, h, color, radius = 5) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, radius);
      ctx.fill();
    };

    // BACKGROUND

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, H);

      gradient.addColorStop(0, "#55b9ef");
      gradient.addColorStop(0.55, "#b5e4f5");
      gradient.addColorStop(1, "#c6a36a");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // SUN

      ctx.fillStyle = "#fff1a5";
      ctx.beginPath();
      ctx.arc(750, 75, 38, 0, Math.PI * 2);
      ctx.fill();

      // BUILDINGS

      for (let i = 0; i < 12; i++) {
        const x = i * 85;
        const bh = 100 + (i % 4) * 35;

        rect(
          x,
          230 - bh,
          65,
          bh,
          i % 2 === 0 ? "#638da4" : "#789daf",
          2
        );

        for (let j = 0; j < 3; j++) {
          rect(
            x + 10 + j * 18,
            150 - bh / 2,
            9,
            14,
            "#ffe6a3",
            1
          );
        }
      }

      // TREES

      for (let i = 0; i < 8; i++) {
        const x = i < 4 ? 30 + i * 50 : 700 + (i - 4) * 55;

        rect(x, 260, 12, 90, "#75452a");

        ctx.fillStyle = "#13834b";
        ctx.beginPath();
        ctx.arc(x + 6, 245, 32, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // RAILWAY

    const drawRoad = () => {
      ctx.fillStyle = "#5b5d63";

      ctx.beginPath();
      ctx.moveTo(220, 175);
      ctx.lineTo(680, 175);
      ctx.lineTo(880, 500);
      ctx.lineTo(20, 500);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#34383e";

      ctx.beginPath();
      ctx.moveTo(250, 175);
      ctx.lineTo(650, 175);
      ctx.lineTo(790, 500);
      ctx.lineTo(110, 500);
      ctx.closePath();
      ctx.fill();

      // RAILS

      ctx.strokeStyle = "#d3d3d3";
      ctx.lineWidth = 5;

      const railLines = [
        [270, 150],
        [330, 570],
        [470, 430],
        [530, 470],
        [630, 750],
        [690, 850],
      ];

      ctx.beginPath();
      ctx.moveTo(270, 175);
      ctx.lineTo(150, 500);
      ctx.moveTo(330, 175);
      ctx.lineTo(290, 500);
      ctx.moveTo(570, 175);
      ctx.lineTo(610, 500);
      ctx.moveTo(630, 175);
      ctx.lineTo(750, 500);
      ctx.stroke();

      // SLEEPERS

      for (let i = 0; i < 12; i++) {
        const y = 190 + i * 28;
        const p = (y - 175) / 325;

        ctx.strokeStyle = "#b6b7ba";
        ctx.lineWidth = 3 + p * 5;

        ctx.beginPath();
        ctx.moveTo(250 - p * 140, y);
        ctx.lineTo(650 + p * 140, y);
        ctx.stroke();
      }
    };

    // PLAYER

    const drawPlayer = () => {
      const x = lanes[game.lane];

      const jumpHeight =
        game.jump > 0
          ? Math.sin((1 - game.jump / 0.8) * Math.PI) * 110
          : 0;

      const y = 390 - jumpHeight;

      // SHADOW

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath();
      ctx.ellipse(x, 455, 35, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      if (game.slide > 0) {
        // SLIDE

        rect(x - 38, y + 10, 75, 32, "#f97316", 12);
        rect(x + 18, y + 7, 30, 25, "#f3bd8e", 10);
        rect(x - 30, y + 35, 25, 12, "#182b49");
        rect(x + 8, y + 35, 25, 12, "#182b49");

      } else {
        // LEGS

        ctx.strokeStyle = "#172d50";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x - 10, y + 45);
        ctx.lineTo(x - 20, y + 78);
        ctx.moveTo(x + 10, y + 45);
        ctx.lineTo(x + 20, y + 78);
        ctx.stroke();

        // SHOES

        rect(x - 36, y + 70, 29, 12, "#ffffff");
        rect(x + 8, y + 70, 29, 12, "#ffffff");

        // BODY

        rect(x - 24, y + 10, 48, 48, "#f97316", 12);

        // ARMS

        ctx.strokeStyle = "#f2bd8e";
        ctx.lineWidth = 10;

        ctx.beginPath();
        ctx.moveTo(x - 20, y + 20);
        ctx.lineTo(x - 37, y + 43);
        ctx.moveTo(x + 20, y + 20);
        ctx.lineTo(x + 37, y + 43);
        ctx.stroke();

        // HEAD

        ctx.fillStyle = "#f2bd8e";
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        // HAIR

        ctx.fillStyle = "#29201a";
        ctx.beginPath();
        ctx.arc(x, y - 8, 22, Math.PI, Math.PI * 2);
        ctx.fill();

        // EYES

        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(x - 8, y, 2, 0, Math.PI * 2);
        ctx.arc(x + 8, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // DRAW OBSTACLES AND COINS

    const drawObjects = () => {
      game.objects.forEach((obj) => {
        const x = lanes[obj.lane];
        const y = obj.y;

        if (obj.type === "coin") {
          ctx.fillStyle = "#ffd700";
          ctx.beginPath();
          ctx.arc(x, y, 13, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "#fff4a3";
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = "#a66b00";
          ctx.font = "bold 15px Arial";
          ctx.textAlign = "center";
          ctx.fillText("$", x, y + 5);
        }

        if (obj.type === "barrier") {
          rect(x - 42, y - 35, 84, 55, "#e63946", 6);
          rect(x - 42, y - 25, 84, 12, "#ffd166", 2);

          ctx.fillStyle = "white";
          ctx.font = "bold 13px Arial";
          ctx.textAlign = "center";
          ctx.fillText("JUMP", x, y + 5);
        }

        if (obj.type === "train") {
          rect(x - 48, y - 95, 96, 120, "#2563eb", 12);
          rect(x - 35, y - 78, 70, 35, "#a5e8ff", 7);
          rect(x - 35, y - 33, 70, 5, "#ffffff");
          rect(x - 30, y - 12, 18, 18, "#facc15");
          rect(x + 12, y - 12, 18, 18, "#facc15");
        }

        if (obj.type === "bar") {
          rect(x - 43, y - 70, 10, 70, "#80532c");
          rect(x + 33, y - 70, 10, 70);
          rect(x - 48, y - 80, 96, 16, "#facc15");
        }
      });
    };

    // CREATE OBJECTS

    const spawnObjects = () => {
      const lane = Math.floor(Math.random() * 3);
      const random = Math.random();

      let type = "coin";

      if (random > 0.84) type = "train";
      else if (random > 0.68) type = "barrier";
      else if (random > 0.5) type = "bar";

      game.objects.push({
        lane,
        y: 175,
        type,
        collected: false,
      });

      if (type === "coin") {
        for (let i = 1; i <= 3; i++) {
          game.objects.push({
            lane,
            y: 175 - i * 30,
            type: "coin",
            collected: false,
          });
        }
      }
    };

    // GAME UPDATE

    const updateGame = (delta) => {
      if (!game.running) return;

      const dt = Math.min(delta / 1000, 0.04);

      game.score += dt * 12;
      game.speed = Math.min(5 + game.score / 100, 13);

      if (game.jump > 0) {
        game.jump = Math.max(0, game.jump - dt);
      }

      if (game.slide > 0) {
        game.slide = Math.max(0, game.slide - dt);
      }

      game.spawn += dt;

      if (game.spawn > Math.max(0.55, 1.1 - game.score / 1500)) {
        spawnObjects();
        game.spawn = 0;
      }

      game.objects.forEach((obj) => {
        obj.y += game.speed * 60 * dt;
      });

      // COLLISION DETECTION

      game.objects.forEach((obj) => {
        if (obj.collected) return;

        if (
          obj.lane === game.lane &&
          obj.y > 365 &&
          obj.y < 445
        ) {
          if (obj.type === "coin") {
            obj.collected = true;
            game.coins++;
          }

          if (obj.type === "barrier" && game.jump <= 0.08) {
            game.running = false;
            changeStatus("over");
            setBest((previous) => Math.max(previous, Math.floor(game.score)));
          }

          if (obj.type === "bar" && game.slide <= 0.08) {
            game.running = false;
            changeStatus("over");
            setBest((previous) => Math.max(previous, Math.floor(game.score)));
          }

          if (obj.type === "train") {
            game.running = false;
            changeStatus("over");
            setBest((previous) => Math.max(previous, Math.floor(game.score)));
          }
        }
      });

      game.objects = game.objects.filter(
        (obj) => obj.y < 540 && !obj.collected
      );
    };

    // DRAW GAME

    const drawGame = () => {
      ctx.clearRect(0, 0, W, H);

      drawBackground();
      drawRoad();
      drawObjects();
      drawPlayer();

      // SCORE DISPLAY

      rect(20, 18, 170, 75, "rgba(0,0,0,0.7)", 12);

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.font = "bold 17px Arial";
      ctx.fillText("SCORE", 35, 43);

      ctx.font = "bold 29px Arial";
      ctx.fillText(Math.floor(game.score), 35, 76);

      rect(710, 18, 160, 55, "rgba(0,0,0,0.7)", 12);

      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 20px Arial";
      ctx.fillText("🪙 " + game.coins, 730, 53);
    };

    // ANIMATION LOOP

    const animate = (time) => {
      if (!previousTime) previousTime = time;

      const delta = time - previousTime;
      previousTime = time;

      updateGame(delta);
      drawGame();

      if (time - hudTime > 100) {
        setScore(Math.floor(game.score));
        setCoins(game.coins);
        hudTime = time;
      }

      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, []);

  // TOUCH SWIPE CONTROLS

  const touchStart = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 25) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? right() : left();
    } else {
      dy > 0 ? slide() : jump();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white px-3 py-6 md:px-8">

      {/* HEADER */}

      <header className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4 mb-7">

        <div>
          <h1 className="text-3xl md:text-5xl font-black italic text-yellow-400">
            SUBWAY RUNNER
          </h1>

          <p className="text-blue-200 text-xs tracking-widest mt-2">
            ENDLESS RUNNING ADVENTURE
          </p>
        </div>

        <div className="flex gap-3">

          <div className="bg-white/10 p-3 rounded-xl text-center">
            <p className="text-yellow-400 text-xs">BEST SCORE</p>
            <p className="text-2xl font-bold">{best}</p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl text-center">
            <p className="text-yellow-400 text-xs">COINS</p>
            <p className="text-2xl font-bold">{coins} 🪙</p>
          </div>

        </div>

      </header>

      {/* GAME */}

      <main className="max-w-5xl mx-auto">

        <div
          className="relative overflow-hidden rounded-2xl border-4 border-blue-400 shadow-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          <canvas
            ref={canvasRef}
            width={900}
            height={500}
            className="block w-full aspect-[9/5]"
          />

          {/* START SCREEN */}

          {status === "start" && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-4">

              <div>
                <div className="text-7xl mb-4">🚆</div>

                <h2 className="text-3xl md:text-5xl font-black text-yellow-400 mb-3">
                  SUBWAY RUNNER
                </h2>

                <p className="mb-7 text-blue-100">
                  Run, jump, slide and collect coins!
                </p>

                <button
                  onClick={startGame}
                  className="bg-yellow-400 text-black px-10 py-4 rounded-full text-xl font-black hover:bg-yellow-300 hover:scale-105 transition"
                >
                  ▶ START GAME
                </button>
              </div>

            </div>
          )}

          {/* PAUSE SCREEN */}

          {status === "paused" && (
            <div className="absolute inset-0 bg-black/75 flex items-center justify-center">

              <div className="text-center">
                <h2 className="text-4xl font-black mb-6">
                  GAME PAUSED
                </h2>

                <button
                  onClick={() => changeStatus("playing")}
                  className="bg-green-500 px-9 py-3 rounded-full font-bold hover:bg-green-400"
                >
                  ▶ RESUME
                </button>
              </div>

            </div>
          )}

          {/* GAME OVER */}

          {status === "over" && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-center p-4">

              <div>
                <div className="text-6xl mb-3">💥</div>

                <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-4">
                  GAME OVER
                </h2>

                <p className="text-lg">
                  Your Score: <b className="text-yellow-400">{score}</b>
                </p>

                <p className="mb-6 mt-2">
                  Coins Collected: 🪙 {coins}
                </p>

                <button
                  onClick={startGame}
                  className="bg-yellow-400 text-black px-9 py-3 rounded-full font-black hover:bg-yellow-300"
                >
                  ↻ PLAY AGAIN
                </button>
              </div>

            </div>
          )}

        </div>

        {/* SCORE CARDS */}

        <div className="grid grid-cols-3 gap-3 mt-5">

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-blue-300 text-xs">YOUR SCORE</p>
            <p className="text-2xl font-black text-yellow-400">{score}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-blue-300 text-xs">COINS</p>
            <p className="text-2xl font-black text-yellow-400">{coins} 🪙</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <p className="text-blue-300 text-xs">BEST SCORE</p>
            <p className="text-2xl font-black text-yellow-400">{best}</p>
          </div>

        </div>

        {/* CONTROLS */}

        <section className="mt-7 bg-white/10 rounded-2xl p-5">

          <h3 className="text-center text-xl font-bold mb-5">
            🎮 GAME CONTROLS
          </h3>

          <div className="flex justify-center gap-3 md:gap-6">

            <button
              onClick={left}
              className="bg-blue-600 hover:bg-blue-500 w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold active:scale-90"
            >
              ←
            </button>

            <button
              onClick={jump}
              className="bg-green-600 hover:bg-green-500 w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold active:scale-90"
            >
              ↑
            </button>

            <button
              onClick={slide}
              className="bg-orange-600 hover:bg-orange-500 w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold active:scale-90"
            >
              ↓
            </button>

            <button
              onClick={right}
              className="bg-blue-600 hover:bg-blue-500 w-16 h-16 md:w-20 md:h-20 rounded-xl text-3xl font-bold active:scale-90"
            >
              →
            </button>

          </div>

          <div className="flex justify-center gap-3 mt-6">

            {status === "playing" && (
              <button
                onClick={() => changeStatus("paused")}
                className="bg-white text-black px-7 py-2 rounded-full font-bold"
              >
                Ⅱ PAUSE
              </button>
            )}

            {status === "paused" && (
              <button
                onClick={() => changeStatus("playing")}
                className="bg-green-500 px-7 py-2 rounded-full font-bold"
              >
                ▶ RESUME
              </button>
            )}

            {status !== "playing" && (
              <button
                onClick={startGame}
                className="bg-yellow-400 text-black px-7 py-2 rounded-full font-bold"
              >
                ↻ RESTART
              </button>
            )}

          </div>

        </section>

        {/* INSTRUCTIONS */}

        <section className="mt-6 mb-8 bg-blue-900/40 border border-blue-400/30 rounded-xl p-5">

          <h3 className="font-bold text-lg text-yellow-400 mb-4">
            📖 HOW TO PLAY
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 text-sm text-blue-100">

            <p>⬅️ Left Arrow: Move left</p>
            <p>➡️ Right Arrow: Move right</p>
            <p>⬆️ Up Arrow / Space: Jump</p>
            <p>⬇️ Down Arrow: Slide</p>
            <p>🪙 Collect coins to increase your coin count.</p>
            <p>🚆 Avoid trains and obstacles.</p>

          </div>

          <p className="text-center text-yellow-300 mt-5 text-sm font-bold">
            The longer you run, the faster the game becomes!
          </p>

          <p className="text-center text-blue-200 text-xs mt-3">
            Mobile: Swipe left, right, up or down on the game screen.
          </p>

        </section>

      </main>

      <footer className="text-center text-gray-400 text-xs">
        SUBWAY RUNNER © 2026 | JavaScript + Tailwind CSS
      </footer>

    </div>
  );
}

export default gamepage;

