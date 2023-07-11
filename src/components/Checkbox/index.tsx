import { FieldValues } from 'react-hook-form';
import { Checkbox } from 'antd';
import React, { useCallback } from 'react';
import CustomField, { ICustomComponentProps, CustomFieldRenderArgs } from '../Field';

export interface ICustomCheckboxProps<T extends FieldValues> extends ICustomComponentProps<T> {
  /** Antd @type {Checkbox} props */
  checkboxProps?: React.ComponentProps<typeof Checkbox>;
}

const CustomCheckbox = <T extends FieldValues>({
  checkboxProps,
  disabled,
  ...rest
}: ICustomCheckboxProps<T>) => {
  const _render = useCallback(
    ({ field }: Partial<CustomFieldRenderArgs>) => (
      <Checkbox {...field} {...checkboxProps} disabled={disabled} checked={!!field?.value} />
    ),
    [checkboxProps, disabled],
  );

  return <CustomField {...rest} render={_render} />;
};

export default CustomCheckbox;
