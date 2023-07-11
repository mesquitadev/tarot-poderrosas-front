import 'moment/locale/pt-br';

import { Switch } from 'antd';
import React, { useCallback } from 'react';

import { FieldValues } from 'react-hook-form';
import CustomField, { CustomFieldRenderArgs, ICustomComponentProps } from '../Field';

export interface ICustomSwitchProps<T extends FieldValues> extends ICustomComponentProps<T> {
  /* Antd Input props */
  switchProps?: React.ComponentProps<typeof Switch>;
}

const CustomSwitch = <T extends FieldValues>({
  disabled,
  switchProps,
  ...rest
}: ICustomSwitchProps<T>) => {
  const _render = useCallback(
    ({ field }: Partial<CustomFieldRenderArgs>) => {
      return <Switch {...field} {...switchProps} disabled={disabled} data-testid={'input-field'} />;
    },
    [switchProps, disabled],
  );

  return <CustomField {...rest} render={_render} />;
};

export default CustomSwitch;
