import React, { FC } from 'react';

interface Props {
  readonly fill?: string;
  readonly height?: string;
  readonly width?: string;
}

export const ChevronRight: FC<Props> = ({ fill = '#000', height = '21', width = '10' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-221.000000, -315.000000)" fill={fill}>
        <g transform="translate(16.000000, 161.000000)">
          <g transform="translate(16.000000, 139.000000)">
            <g transform="translate(185.000000, 15.000000)">
              <path
                d="M5.92862876,7.95533112 L12.9953224,13.8849911 L11.9668622,15.1106622 L4,8.42567111 L4.00449273,8.42031688 L4,8.41904297 L4,7.48499114 L11.9668622,0.8 L12.9953224,2.02567111 L5.92862876,7.95533112 Z"
                transform="translate(8.497661, 7.955331) scale(-1, 1) translate(-8.497661, -7.955331) "
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
