import React, { useEffect, useRef, useState } from 'react';
import Palette from '../components/palette';
import '../styles/Quiz.css';

const Quiz = () => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const brushRef = useRef();

  const [ctx, setCtx] = useState();
  const [brush, setBrush] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 600;

    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    ctxRef.current = context;

    brushRef.current.style.pointerEvents = 'none';
    brushRef.current.style.backgroundColor = 'black';

    setCtx(context);
    setBrush(brushRef.current);
  }, []);

  const startPainting = () => {
    setIsDrawing(true);
  };

  const stopPainting = () => {
    setIsDrawing(false);
  };

  const onDrawing = ({ nativeEvent }) => {
    const x = nativeEvent.offsetX;
    const y = nativeEvent.offsetY;
    brush.style.top = y - ctx.lineWidth / 2 + 'px';
    brush.style.left = x - ctx.lineWidth / 2 + 'px';
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const changeLineWidth = (event) => {
    ctx.lineWidth = event.target.value;
    brush.style.padding = event.target.value / 2 + 'px';
  };

  const changeBrushColor = (event) => {
    console.log(event);
  };

  return (
    <div>
      <div className="canvas">
        <canvas
          ref={canvasRef}
          id="canvas"
          onMouseDown={startPainting}
          onMouseUp={stopPainting}
          onMouseMove={onDrawing}
        />
        <div ref={brushRef} id="brush"></div>
      </div>
      <input placeholder="문제의 정답을 입력해주세요!"></input>
      <button>제출</button>
      <Palette
        changeLineWidth={changeLineWidth}
        changeBrushColor={changeBrushColor}
      />
    </div>
  );
};

export default Quiz;