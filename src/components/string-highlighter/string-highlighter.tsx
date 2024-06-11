import React, { FC } from 'react';

interface Props {
  readonly enabled: boolean;
  readonly highlightSection: string;
  readonly str: string;
  readonly highlightClass?: string;
  readonly highlightComponent?: string;
}

const StringHighlighter: FC<Props> = ({
  enabled,
  highlightClass,
  highlightComponent = 'strong',
  highlightSection,
  str,
}) => {
  if (!enabled) {
    return <span>{str}</span>;
  }
  const regExp = new RegExp(highlightSection, 'i');
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: str.replace(
          regExp,
          (subString: string) =>
            `<${highlightComponent}${
              highlightClass ? ` class=${highlightClass}` : ''
            }>${subString}</${highlightComponent}>`
        ),
      }}
    />
  );
};

export default StringHighlighter;
