import { BaseProps } from '../../interfaces/BaseProps';

interface PlaceholdeProps extends BaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
}

export default function Placeholder({
  id,
  width = '100%',
  height = '100%',
  borderRadius = 'none',
  backgroundColor = 'var(--color-positive)',
  style,
}: PlaceholdeProps): JSX.Element {
  return (
    <div
      id={id}
      style={{
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        borderRadius: borderRadius,
        ...style,
      }}
    />
  );
}
