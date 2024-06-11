import React, { FC } from 'react';

interface Props {
  readonly backgroundFill?: string;
  readonly fill?: string;
  readonly height?: string;
  readonly width?: string;
}

export const MagnifyingGlass: FC<Props> = ({ fill = '#006A4D', height = '24', width = '24' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-52.000000, -244.000000)" fill={fill}>
        <g transform="translate(16.000000, 161.000000)">
          <g transform="translate(16.000000, 67.000000)">
            <g>
              <g transform="translate(16.000000, 12.000000)">
                <g>
                  <g transform="translate(4.000000, 4.000000)">
                    <path
                      d="M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z M9,16 C12.8659932,16 16,12.8659932 16,9 C16,5.13400675 12.8659932,2 9,2 C5.13400675,2 2,5.13400675 2,9 C2,12.8659932 5.13400675,16 9,16 Z"
                      fillRule="nonzero"
                    />
                    <rect
                      transform="translate(18.949747, 18.949747) rotate(-45.000000) translate(-18.949747, -18.949747) "
                      x="17.9497475"
                      y="12.9497475"
                      width="2"
                      height="12"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

/*


  <svg
    width={width}
    height={height}
    viewBox="0 0 17 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-38.000000, -17.000000)">
        <g transform="translate(38.000000, 17.000000)">
          <path
            stroke={fill}
            strokeWidth="3"
            strokeLinecap="round"
            d="M7.40625,8.140625 L15,14.46875"
          />
          <g>
            <path
              fill={backgroundFill}
              fillRule="evenodd"
              d="M14,7 C14,3.13400656 10.8659934,0 7,0 C3.13400659,0 0,3.13400656 0,7 C0,10.8659934 3.13400659,14 7,14 C10.8659934,14 14,10.8659934 14,7 Z"
            />
            <path
              stroke={fill}
              strokeWidth="3"
              d="M12.5,7 C12.5,3.96243369 10.0375663,1.5 7,1.5 C3.9624337,1.5 1.5,3.96243369 1.5,7 C1.5,10.0375663 3.96243371,12.5 7,12.5 C10.0375663,12.5 12.5,10.0375663 12.5,7 Z"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
  */
