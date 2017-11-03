import * as React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Checkbox from '../Checkbox'
import * as Theme from './Theme';
import { withTheme } from 'styled-components';
import * as Prod from '../../../types/Product'
import styled from 'styled-components';

export interface LcheckboxProps {
  filter?: string,
  onChange?: (key: string, state: boolean, id?: Prod.ProductID) => void,
  setChecked?: boolean,
  caption: string,
  id?: Prod.ProductID,
  labelColor?: string
  labelPaddingLeft?: string,
  style?: any,
  iconName?: string,
  theme?: Theme.ThemeProps
}

interface LabelProps {
  paddingLeft?: string,
}

const Label = styled.span`
  padding-left: ${(props: LabelProps) => props.paddingLeft};
  padding-top: 2px;
`;

const iconStyles: any = {
  fontSize: 18,
  paddingLeft: 4,
  paddingRight: 4,
};

const LabeledCheckbox: React.SFC<LcheckboxProps> = (props: LcheckboxProps) => {
  {
    iconStyles.color = props.labelColor || 'black';
    const style = props.style;

    const className = 'base_icons icon_' + props.iconName;
    style.cursor = 'pointer';
    style.color = props.labelColor;

    const onChange = (isChecked) => {
      if (props.onChange && props.filter) {
        props.onChange(props.filter, isChecked, props.id);
      }
    };

    const myStyle = Object.assign(
      {
        display: 'flex'
      },
      props.style);

    return (
      <label style={myStyle}>
        <Checkbox onCheck={onChange} theme={props.theme.checkbox} setChecked={props.setChecked}/>
        {props.iconName
          ? <FontIcon className={className} style={iconStyles}/>
          : <span/>
        }
        <Label paddingLeft={props.labelPaddingLeft}>{props.caption} </Label>
      </label>
    );
  }
};

export default withTheme(LabeledCheckbox);

LabeledCheckbox.defaultProps = {
  filter: 'none',
  id: '-1',
  onChange: () => null,
  setChecked: null,
  labelColor: 'black',
  labelPaddingLeft: '0',
  style: {},
  iconName: '',
  theme: Theme.defaultTheme,
}
