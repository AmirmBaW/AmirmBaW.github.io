document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.cinema-container');
  const canvas = document.getElementById('beamCanvas');
  const ctx = canvas.getContext('2d');

  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let beamStart = { x: 0, y: 0 };

  const maxBeamLength = 1100;
  const beamWidth = 200;

  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    beamStart.x = container.clientWidth;
    beamStart.y = 0;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
  });

  function drawBeam() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let dx = mousePos.x - beamStart.x;
    let dy = mousePos.y - beamStart.y;
    let dist = Math.hypot(dx, dy);

    if (dist === 0) dist = 0.01;

    let beamLength = Math.min(dist, maxBeamLength);

    let endX = beamStart.x + (dx / dist) * beamLength;
    let endY = beamStart.y + (dy / dist) * beamLength;

    let intensity = 1 - beamLength / maxBeamLength;
    intensity = Math.max(intensity, 0.1);

    let perpX = -dy / dist;
    let perpY = dx / dist;

    const grad = ctx.createLinearGradient(beamStart.x, beamStart.y, endX, endY);
    grad.addColorStop(0, `rgba(255, 255, 200, ${intensity})`);
    grad.addColorStop(1, 'rgba(255, 255, 200, 0)');

    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(beamStart.x, beamStart.y);
    ctx.lineTo(endX + perpX * beamWidth / 2, endY + perpY * beamWidth / 2);
    ctx.lineTo(endX - perpX * beamWidth / 2, endY - perpY * beamWidth / 2);
    ctx.closePath();

    ctx.fill();

    requestAnimationFrame(drawBeam);
  }

  drawBeam();
});
