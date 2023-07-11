import { Control, Controller, FieldValues } from 'react-hook-form';
import { ICustomComponentProps, CustomFieldRenderArgs } from './FieldProps';
import React, { useCallback, useEffect, useState } from 'react';

import { Form } from 'antd';

const { Item } = Form;

type ReactHookFormRules = React.ComponentProps<typeof Controller>['rules'];
type CustomFieldRender = (args: Partial<CustomFieldRenderArgs>) => React.ReactElement;

interface ICustomFieldProps {
  render?: CustomFieldRender;
  children?: React.ReactNode;
}

type CustomFieldProps<T extends FieldValues> = ICustomComponentProps<T> & ICustomFieldProps;

const CustomField = <T extends FieldValues>({
  label,
  name,
  tooltipText,
  control,
  rules,
  required,
  formItemProps,
  controllerProps,
  render,
  children,
}: CustomFieldProps<T>) => {
  const [formRules, setFormRules] = useState<ReactHookFormRules>({});

  //TODO: also accept form context methods
  //const methods = useFormContext();
  //const formMethods = control || methods.control;

  useEffect(() => {
    setFormRules((previous) => ({
      ...previous,
      required: { value: !!required, message: 'Este campo é obrigatório' },
    }));

    rules?.forEach((rule) => {
      /* validator function is custom */
      if (typeof rule === 'function')
        setFormRules((previous) => ({
          ...previous,
          validate: { ...previous?.validate, [rule.name]: rule },
        }));
      else
        setFormRules((previous) => ({
          ...previous,
          [rule.name]: rule,
        }));
    });
  }, [rules, required, setFormRules]);

  const Component = useCallback(
    ({ field, fieldState }: CustomFieldRenderArgs) => {
      const Component = render as (params: Partial<CustomFieldRenderArgs>) => JSX.Element;

      return (
        <Item
          {...formItemProps}
          label={label}
          tooltip={tooltipText}
          htmlFor={name as string}
          required={required}
          validateStatus={fieldState.error?.message && 'error'}
          help={fieldState.error?.message}
          hasFeedback
        >
          {/* {render && render({ field })}
           */}
          <Component field={field} />
          {React.isValidElement(children) && React.cloneElement(children, { ...field })}
        </Item>
      );
    },
    [render, formItemProps, label, tooltipText, name, required, children],
  );

  return (
    <Controller
      {...controllerProps}
      control={control as Control<Record<string, any>>}
      name={name as string}
      render={Component}
      rules={formRules}
    />
  );
};

export default CustomField;
