import React, { useRef, useState } from "react";

export default function RectanglePage() {
  const canvasRef = useRef(null);
  const [state, setState] = useState({ llx: 100, lly: 300, urx: 400, ury: 100 });
  const [dragging, setDragging] = useState(null); // 'll' | 'ur' | null
  const [mouse, setMouse] = useState({ x: null, y: null });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const w = 600;
  const h = 400;
  const llx = clamp(state.llx, 0, w);
  const lly = clamp(state.lly, 0, h);
  const urx = clamp(state.urx, 0, w);
  const ury = clamp(state.ury, 0, h);

  const x1 = Math.min(llx, urx);
  const y1 = Math.min(lly, ury);
  const x2 = Math.max(llx, urx);
  const y2 = Math.max(lly, ury);

  const onCanvasMove = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (x >= 0 && y >= 0 && x <= w && y <= h) {
      setMouse({ x: Math.round(x), y: Math.round(y) });
    } else {
      setMouse({ x: null, y: null });
    }
    if (!dragging) return;
    setState((s) => ({
      ...s,
      llx: dragging === 'll' ? x : s.llx,
      lly: dragging === 'll' ? y : s.lly,
      urx: dragging === 'ur' ? x : s.urx,
      ury: dragging === 'ur' ? y : s.ury,
    }));
  };

  const onCanvasLeave = () => setMouse({ x: null, y: null });

  const ticksX = Array.from({ length: Math.floor(w / 50) + 1 }, (_, i) => i * 50);
  const ticksY = Array.from({ length: Math.floor(h / 50) + 1 }, (_, i) => i * 50);

  const cx = (llx + urx) / 2;
  const cy = (lly + ury) / 2;
  const distCenter = (mouse.x == null || mouse.y == null)
    ? null
    : Math.hypot(mouse.x - cx, mouse.y - cy);

  return (
    <div style={{ padding: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", sans-serif' }}>
      <h2>拖动调节矩形（ll 与 ur）</h2>
      <div style={{ marginBottom: 6, color: '#444' }}>
        鼠标位置（原点左上，单位 px）：
        <strong>
          {mouse.x == null || mouse.y == null ? ' (—, —)' : ` (${mouse.x}, ${mouse.y})`}
        </strong>
  {"  |  中心距: "}
  <strong>{distCenter == null ? '—' : (Math.round(distCenter * 100) / 100)} px</strong>
      </div>
      <div
        id="canvas"
        ref={canvasRef}
        onMouseMove={onCanvasMove}
        onMouseLeave={onCanvasLeave}
        onMouseUp={() => setDragging(null)}
        style={{
          width: w,
          height: h,
          border: '1px solid #222',
          position: 'relative',
          background: '#fafafa',
          userSelect: 'none',
        }}
      >
        {/* Axes (bottom X-axis and left Y-axis) */}
        <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
          {/* X axis */}
          <line x1={0} y1={h - 1} x2={w} y2={h - 1} stroke="#666" strokeWidth={1} />
          {/* Y axis */}
          <line x1={0} y1={0} x2={0} y2={h} stroke="#666" strokeWidth={1} />
          {/* X ticks and labels */}
          {ticksX.map((tx) => (
            <g key={`tx-${tx}`}>
              <line x1={tx} y1={h - 6} x2={tx} y2={h} stroke="#666" strokeWidth={1} />
              <text x={tx + 2} y={h - 8} fontSize={10} fill="#555">{tx}</text>
            </g>
          ))}
          {/* Y ticks and labels */}
          {ticksY.map((ty) => (
            <g key={`ty-${ty}`}>
              <line x1={0} y1={ty} x2={6} y2={ty} stroke="#666" strokeWidth={1} />
              <text x={8} y={ty - 2} fontSize={10} fill="#555">{ty}</text>
            </g>
          ))}
        </svg>

        {/* Rectangle outline */}
        <div
          className="rect-outline"
          style={{
            position: 'absolute',
            left: x1,
            top: y1,
            width: x2 - x1,
            height: y2 - y1,
            border: '2px dashed #1976d2',
            background: 'rgba(25, 118, 210, 0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* ll handle */}
        <Handle left={llx} top={lly} onMouseDown={() => setDragging('ll')} />
        {/* ur handle */}
        <Handle left={urx} top={ury} onMouseDown={() => setDragging('ur')} />
      </div>

      <div style={{ marginTop: 8, color: '#555' }}>
        <label style={{ display: 'inline-block', minWidth: 36 }}>llx</label>
        <input
          type="number"
          step="1"
          value={Math.round(llx)}
          onChange={(e) => setState((s) => ({ ...s, llx: parseFloat(e.target.value) }))}
          style={{ width: 70, marginRight: 8 }}
        />
        <label style={{ display: 'inline-block', minWidth: 36 }}>lly</label>
        <input
          type="number"
          step="1"
          value={Math.round(lly)}
          onChange={(e) => setState((s) => ({ ...s, lly: parseFloat(e.target.value) }))}
          style={{ width: 70, marginRight: 8 }}
        />
        <label style={{ display: 'inline-block', minWidth: 36 }}>urx</label>
        <input
          type="number"
          step="1"
          value={Math.round(urx)}
          onChange={(e) => setState((s) => ({ ...s, urx: parseFloat(e.target.value) }))}
          style={{ width: 70, marginRight: 8 }}
        />
        <label style={{ display: 'inline-block', minWidth: 36 }}>ury</label>
        <input
          type="number"
          step="1"
          value={Math.round(ury)}
          onChange={(e) => setState((s) => ({ ...s, ury: parseFloat(e.target.value) }))}
          style={{ width: 70, marginRight: 8 }}
        />
      </div>
    </div>
  );
}

function Handle({ left, top, onMouseDown }) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="draggable"
      style={{
        width: 12,
        height: 12,
        background: '#e53935',
        borderRadius: 2,
        position: 'absolute',
        cursor: 'grab',
        transform: 'translate(-50%, -50%)',
        left,
        top,
      }}
      title="拖动控制点"
    />
  );
}
