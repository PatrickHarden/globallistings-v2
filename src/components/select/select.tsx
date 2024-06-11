import React, { createRef, PureComponent } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import { ChevronDown } from '../icons/chevron-down';
import { ChevronUp } from '../icons/chevron-up';
import StringHighlighter from '../string-highlighter/string-highlighter';

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div``;

const Label = styled.label``;

interface InputWrapperProps {
  readonly onClick: Function;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  background-color: ${props => props.theme.colours.light};
  border: ${props => props.theme.borders.fine};

  svg {
    margin: auto 10px;
  }
`;

interface TextFieldProps {
  readonly ref: any;
}
const TextField = styled.input<TextFieldProps>`
  width: 100%;
  flex-grow: 1;
  box-shadow: none;
  background: none;
  border: 0;
  padding: calc(${props => props.theme.gutter.s} + 2px);

  &:focus {
    outline: none;
  }
`;

interface ResultsContainerProps {
  readonly hasIcon?: boolean;
}
const ResultsContainer = styled.div<ResultsContainerProps>`
  position: absolute;
  z-index: 1000;
  left: 0;
  right: 0;
  max-height: 400%;
  margin-top: -1px;
  overflow: auto;
  background-color: ${props => props.theme.colours.light};
  border: ${props => props.theme.borders.fine};
  border-top: none;
  overflow-x: hidden;
  padding: ${({ hasIcon, theme }) =>
    hasIcon ? `${theme.gutter.s} ${theme.gutter.s} ${theme.gutter.s} 46px` : theme.gutter.s};
`;

interface ResultProps {
  readonly highlight: boolean;
}
const Result = styled.button.attrs({ type: 'button' })<ResultProps>`
  -webkit-appearance: none;
  display: block;
  width: 100%;
  padding: ${props => props.theme.gutter.s};
  background-color: ${props => props.theme.colours.light};
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover,
  &.highlighted {
    color: ${props => props.theme.colours.light};
    background-color: ${props => props.theme.colours.primary};
  }
`;

const Sponsor = styled.div`
  text-align: right;
  margin: ${props => props.theme.gutter.s};
`;

interface BaseSelectItem {
  readonly label: string;
  readonly value: string;
  readonly default: boolean;
}

interface Props<T extends BaseSelectItem> {
  readonly items: T[];
  readonly handleSelect: (selection: T) => void;
  readonly autocomplete?: boolean;
  readonly textEditable?: boolean;
  readonly className?: string;
  readonly defaultToFirstValue?: boolean;
  readonly handleInput?: (searchTerm: string) => void;
  readonly highlightCurrentValue?: boolean;
  readonly icon?: React.ReactElement<any>;
  readonly initialInputValue?: string;
  readonly labelText?: string;
  readonly placeholder?: string;
  readonly selectedItem?: T;
  readonly sponsor?: React.ReactElement<any>;
  readonly value?: string;
  readonly sortAlphabetical?: boolean;
  readonly openOnClick?: boolean;
}

const itemToString = (item: BaseSelectItem | string | null): string => {
  if (!item) {
    return '';
  }
  if (typeof item === 'string') {
    return item;
  }

  return item.label;
};

class Select<T extends BaseSelectItem> extends PureComponent<Props<T>> {
  private inputRef = createRef<HTMLInputElement>();

  public handleInput = (str: string) => {
    const { handleInput } = this.props;
    if (str && handleInput) {
      handleInput(str);
    }
  };

  public handleClick = (menuAction: Function) => {
    if (this.inputRef.current) {
      this.inputRef.current.select();
      if (this.props.openOnClick) {
        menuAction();
      }
    }
    if (!this.props.autocomplete) {
      menuAction();
    }
  };

  public render() {
    const {
      autocomplete = false,
      textEditable = true,
      className,
      defaultToFirstValue,
      handleSelect,
      highlightCurrentValue,
      icon,
      initialInputValue,
      items,
      labelText,
      placeholder,
      selectedItem,
      sponsor,
      sortAlphabetical,
    } = this.props;

    const chevronIcon = (isOpen: boolean) => (isOpen ? <ChevronUp /> : <ChevronDown />);
    const inputString = (str: string, input: string) => (
      <StringHighlighter str={str} enabled={!!highlightCurrentValue} highlightSection={input} />
    );

    const customStringify = (v: any) => {
      const cache = new Set();
      return JSON.stringify(v, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.has(value)) {
            // Circular reference found
            try {
              // If this value does not reference a parent it can be deduped
              return JSON.parse(JSON.stringify(value));
            } catch (err) {
              // discard key if value cannot be deduped
              return;
            }
          }
          // Store value in our set
          cache.add(value);
        }
        return value;
      });
    };

    const getUniqueOnClickEventId = () => {
      // https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
      let uniqueString = customStringify(this.props);
      uniqueString = uniqueString.replace(/['"]+/g, ''); // remove quotes
      uniqueString = uniqueString.replace(/[{}]/g, ''); // remove curly braces
      uniqueString = uniqueString.replace(/\s+/g, ''); // remove spaces
      uniqueString = uniqueString.replace(/[\[\]']+/g, ''); // remove square brackets
      uniqueString = uniqueString.replace(/,/g, ''); // remove commas
      uniqueString = uniqueString.replace(/\\|\//g, ''); // remove slashes
      uniqueString = uniqueString.replace(/:/g, ''); // remove colon
      uniqueString = uniqueString.substring(1, Math.min(50, uniqueString.length)); // Cap the length to 50 characters

      return `onClickEvent_${uniqueString}`;
    };

    const initialSelectedItem =
      selectedItem ||
      items.find((item: T) => item.default) ||
      (defaultToFirstValue ? items[0] : undefined);

    const initValue = {
      initialSelectedItem,
      initialInputValue: initialSelectedItem ? undefined : initialInputValue || '',
    };

    // sort the options alphabetically by label if the sortAlphabetical flag is set
    if (sortAlphabetical) {
      items.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
    }

    return (
      <Downshift
        onInputValueChange={this.handleInput}
        onChange={handleSelect}
        itemToString={itemToString}
        {...initValue}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          toggleMenu,
        }) => (
          <div className={className}>
            <Container>
              {labelText && <Label {...getLabelProps()}>{labelText}</Label>}
              <Wrapper>
                <InputWrapper
                  onClick={() => this.handleClick(toggleMenu)}
                  id={getUniqueOnClickEventId()}
                >
                  {!!icon && icon}
                  {textEditable ? (
                    <TextField {...getInputProps()} placeholder={placeholder} ref={this.inputRef} />
                  ) : (
                    <TextField
                      {...getInputProps()}
                      placeholder={placeholder}
                      ref={this.inputRef}
                      readOnly={true}
                    />
                  )}
                  {!autocomplete && chevronIcon(isOpen)}
                </InputWrapper>
                {isOpen && !!items.length && (
                  <ResultsContainer {...getMenuProps()} hasIcon={!!icon}>
                    {items
                      // .filter((item: T) => inputValue !== item.label)
                      .map((item: T, index: number) => (
                        <Result
                          {...getItemProps({
                            key: `${item.value}_${item.label}`,
                            className: highlightedIndex === index ? 'highlighted' : undefined,
                            index,
                            item,
                          })}
                          id={`dropdown_${item.label}_${index}`}
                        >
                          {inputString(item.label, inputValue || '')}
                        </Result>
                      ))}
                    {!!sponsor && <Sponsor>{sponsor}</Sponsor>}
                  </ResultsContainer>
                )}
              </Wrapper>
            </Container>
          </div>
        )}
      </Downshift>
    );
  }
}

export default Select;
