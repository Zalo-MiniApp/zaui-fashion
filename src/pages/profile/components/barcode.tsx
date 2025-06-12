import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
}

export const Barcode = ({ value, width = 2, height = 40 }: BarcodeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128',
        width,
        height,
        displayValue: false,
      });
    }
  }, [value, width, height]);

  return <svg ref={svgRef} />;
};
