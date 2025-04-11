import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignatureCanvasProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SignatureCanvasComponent = forwardRef(
  ({ value, onChange }: SignatureCanvasProps, ref) => {
    const sigCanvasRef = useRef<any>(null);

    // Expose clear method to parent using ref
    useImperativeHandle(ref, () => ({
      clear: () => {
        sigCanvasRef.current.clear();
        onChange?.("");
      },
    }));

    // Load existing signature image
    useEffect(() => {
      if (value && sigCanvasRef.current) {
        sigCanvasRef.current.fromDataURL(value);
      }
    }, [value]);

    // Handle when user finishes drawing
    const handleEnd = () => {
      const canvas = sigCanvasRef.current.getCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      onChange?.(dataUrl);
    };

    return (
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        backgroundColor="rgba(255,255,255,0)"
        canvasProps={{
          style: {
            border: "1px solid #ccc",
            borderRadius: 8,
            display: "flex",
            width: "50vw",
          },
        }}
        onEnd={handleEnd}
      />
    );
  }
);

export default SignatureCanvasComponent;
