import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';

import { Form } from 'antd';
import React from 'react';
import { FieldValidator } from './Validators';

const { Item } = Form;

type ControllerProps = Partial<React.ComponentProps<typeof Controller>>;
type FormItemProps = React.ComponentProps<typeof Item>;

export interface ICustomComponentProps<T extends FieldValues> {
  /* Form item label. Overrides `formItemProps.label` if provided. */
  label?: string;

  /* Controller for react-hook-form. Overrides `controllerProps.control`.  */
  control: Control<T>;

  /* Entity T attribute. Overrides `controllerProps.name`. */
  name: keyof T;

  /* Antd Form.Item props */
  formItemProps?: FormItemProps;

  /* react-hook-form Controller props */
  controllerProps?: ControllerProps;

  /* Field description or information */
  tooltipText?: string;

  /* Should the item be disabled? */
  disabled?: boolean;

  /* Should the field value be obrigatory? */
  required?: boolean;

  /* Field value should have any validation? */
  rules?: FieldValidator[];
}

export type CustomFieldRenderArgs = {
  field: ControllerRenderProps<Record<string, any>, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<Record<string, any>>;
};
