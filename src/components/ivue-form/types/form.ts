import type { InjectionKey, SetupContext } from 'vue';
import type {
  ValidateFieldsError,
  ValidateError
} from 'async-validator';
import { isBoolean } from '@vueuse/core';
import { isString, isArray } from '@vue/shared';

import { FormItemProp, FormItemContext, FormItemRule } from './form-item';

export type Arrayable<T> = T | T[]

export interface Props {
  labelPosition: string;
  requireAsteriskPosition: string;
  labelSuffix: string;
  labelWidth: string | number;
  inline: boolean;
  model: object;
  rules: FormRules;
  scrollToError: boolean;
  showMessage: boolean;
  showSuccessStatus: boolean;
}

export type FormContext = Props & {
  default?: null;
  emit: SetupContext<FormEmits>['emit']
  // 验证具体的某个字段
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ) => FormValidationResult;
  // 添加验证字段
  addField: (field: FormItemContext) => void;
  // 删除验证字段
  removeField: (field: FormItemContext) => void;
  // 重置该表单项
  resetFields: (props?: Arrayable<FormItemProp>) => void
}

export const FormContextKey: InjectionKey<FormContext> =
  Symbol('ivue-form');

export type FormValidateCallback = (
  // 是否通过验证
  isValid: boolean,
  // 无效字段
  invalidFields?: ValidateFieldsError
) => void

// 对整个表单的内容进行验证
export type FormValidationResult = Promise<boolean>

// 表单验证规则
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

// 事件
export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
};

export type FormEmits = typeof formEmits

// 表单验证失败
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}
