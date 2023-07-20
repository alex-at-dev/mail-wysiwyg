import { ComponentPropsWithoutRef, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { cx } from '../modules/util';

interface ResizableContainerProps extends ComponentPropsWithoutRef<'div'> {
  side: 'left' | 'right' | 'top' | 'bottom';
}

/**
 * Resizable container. Choose the side resizing handle via {@link props.side}.
 * TODO: Doesn't work on scrolled down containers.
 */
export const ResizableContainer: React.FC<ResizableContainerProps> = ({
  side,
  className,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [baseCoord, setBaseCoord] = useState<number | null>(null);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!ref.current) return;

    if (side === 'right') setBaseCoord(ref.current.offsetLeft);
    else if (side === 'left') setBaseCoord(ref.current.offsetLeft + ref.current.offsetWidth);
    else if (side === 'bottom') setBaseCoord(ref.current.offsetTop);
    else if (side === 'top') setBaseCoord(ref.current.offsetTop + ref.current.offsetHeight);
  }, [ref, side]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });

  const handleMouseDown: MouseEventHandler = (ev) => {
    ev.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (ev: MouseEvent) => {
    if (!isDragging || !ref.current || baseCoord === null) return;
    if (side === 'top' || side === 'bottom') {
      const height = Math.abs(ev.pageY - baseCoord);
      setStyle({ height });
    }
    if (side === 'left' || side === 'right') {
      const width = Math.abs(ev.pageX - baseCoord);
      setStyle({ width });
    }
  };
  const handleMouseUp = (ev: MouseEvent) => {
    console.log('up');
    setIsDragging(false);
  };

  return (
    <div {...props} className={cx(className, 'relative')} ref={ref} style={style}>
      {children}
      <div
        className={cx('absolute ', {
          'left-0 top-0': side === 'left' || side === 'top',
          'right-0 bottom-0': side === 'right' || side === 'bottom',
          'h-1 w-full cursor-ns-resize': side === 'top' || side === 'bottom',
          'h-full w-1 cursor-ew-resize': side === 'left' || side === 'right',
        })}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};
