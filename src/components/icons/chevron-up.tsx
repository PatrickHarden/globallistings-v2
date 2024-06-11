import React, { FC } from 'react';

interface Props {
  readonly fill?: string;
  readonly height?: string;
  readonly width?: string;
}

export const ChevronUp: FC<Props> = ({ fill = '#006A4D', height = '10', width = '16' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-98.000000, -16.000000)" fill={fill}>
        <g transform="translate(106.000000, 21.000000) rotate(90.000000) translate(-106.000000, -21.000000) translate(98.000000, 13.000000)">
          <path d="M5.12862876,7.95533112 L12.1953224,13.8849911 L11.1668622,15.1106622 L3.2,8.42567111 L3.20449273,8.42031688 L3.2,8.41904297 L3.2,7.48499114 L11.1668622,0.8 L12.1953224,2.02567111 L5.12862876,7.95533112 Z" />
        </g>
      </g>
    </g>
  </svg>
);
