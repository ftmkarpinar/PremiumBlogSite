/* ============================================================
   SHADER BACKGROUND — Grid Run by Matthias Hurrle (@atzedent)
   Stripped-down renderer for fixed background use.
   ============================================================ */
(function () {
  'use strict';

  const canvas = document.getElementById('shaderBg');
  if (!canvas) return;

  // Check WebGL2 support
  const gl = canvas.getContext('webgl2', { alpha: false, antialias: false });
  if (!gl) {
    console.warn('WebGL2 not supported — shader background disabled.');
    canvas.style.display = 'none';
    return;
  }

  // Performance: half DPR for heavy shader
  const dpr = Math.max(1, 0.4 * window.devicePixelRatio);

  const vertSrc =
    '#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}';

  const fragSrc = document.querySelector(
    "script[type='x-shader/x-fragment']"
  );
  if (!fragSrc) return;

  let program, startTime = performance.now();
  let mouseMove = [0, 0], wheelDelta = 0, wheelOffset = 0;
  let ex = 0, ey = 0, active = false;

  /* ——— Resize ——— */
  function resize() {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  /* ——— Shader compilation ——— */
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(s));
    }
    return s;
  }

  /* ——— Init program ——— */
  function init() {
    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc.textContent.trim());
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    program.resolution = gl.getUniformLocation(program, 'resolution');
    program.time = gl.getUniformLocation(program, 'time');
    program.move = gl.getUniformLocation(program, 'move');
    program.wheel = gl.getUniformLocation(program, 'wheel');
  }

  /* ——— Render loop ——— */
  function loop(now) {
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(program.resolution, canvas.width, canvas.height);
    gl.uniform1f(program.time, (now - startTime) * 1e-3);
    gl.uniform2f(program.move, ...mouseMove);
    gl.uniform2f(program.wheel, wheelDelta, wheelOffset);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(loop);
  }

  /* ——— Pointer interaction ——— */
  document.addEventListener(
    'pointermove',
    (e) => {
      if (!active) return;
      mouseMove = [
        mouseMove[0] + (e.clientX - ex),
        mouseMove[1] + (ey - e.clientY),
      ];
      ex = e.clientX;
      ey = e.clientY;
    },
    { passive: true }
  );

  document.addEventListener('pointerdown', (e) => {
    active = true;
    ex = e.clientX;
    ey = e.clientY;
  });

  document.addEventListener('pointerup', () => {
    active = false;
  });

  window.addEventListener(
    'wheel',
    (e) => {
      if (wheelDelta * e.deltaY < 0) wheelDelta = e.deltaY;
      else wheelDelta += (e.deltaY - wheelDelta) * 0.05;
      wheelOffset += wheelDelta;
    },
    { passive: true }
  );

  /* ——— Start ——— */
  window.addEventListener('resize', resize);
  resize();
  init();
  requestAnimationFrame(loop);
})();
