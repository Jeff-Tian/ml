import React, { useEffect, useRef, useState } from "react";

export default function RectanglePage() {
  const canvasRef = useRef(null);
  const [state, setState] = useState({ llx: 100, lly: 300, urx: 400, ury: 100 });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dragging = null; // 'll' | 'ur' | null

    const onMouseDown = (which) => () => {
      dragging = which;
    };
    const onMouseMove = (e) => {
      if (!dragging) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      setState((s) => ({
        ...s,
        llx: dragging === 'll' ? x : s.llx,
        lly: dragging === 'll' ? y : s.lly,
        urx: dragging === 'ur' ? x : s.urx,
        ury: dragging === 'ur' ? y : s.ury,
      }));
    };
    const onMouseUp = () => { dragging = null; };

    // Attach global listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

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

  return (
    <div style={{ padding: 12, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", sans-serif' }}>
      <h2>拖动调节矩形（ll 与 ur）</h2>
      <div
        id="canvas"
        ref={canvasRef}
        style={{
          width: w,
          height: h,
          border: '1px solid #222',
          position: 'relative',
          background: '#fafafa',
        }}
      >
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
        <Handle
          left={llx}
          top={lly}
          onMouseDown={() => {
            const ev = new MouseEvent('mousedown');
            window.dispatchEvent(ev);
          }}
          onPointerDown={() => {}}
          which="ll"
          setDragging={() => {}}
        />
        {/* ur handle */}
        <Handle
          left={urx}
          top={ury}
          which="ur"
          setDragging={() => {}}
        />
        {/* Transparent overlays to capture mousedown */}
        <div
          onMouseDown={() => (window._dragging = 'll')}
          style={{ position: 'absolute', left: llx - 8, top: lly - 8, width: 16, height: 16, cursor: 'grab' }}
        />
        <div
          onMouseDown={() => (window._dragging = 'ur')}
          style={{ position: 'absolute', left: urx - 8, top: ury - 8, width: 16, height: 16, cursor: 'grab' }}
        />
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
      <p>如果你仍在这页遇到 404，请刷新开发服务（yarn develop）并清理缓存（可选：gatsby clean）。</p>
    </div>
  );
}

function Handle({ left, top }) {
  return (
    <div
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
        pointerEvents: 'none', // purely presentational; capture on transparent overlay
      }}
      title="拖动控制点"
    />
  );
}
