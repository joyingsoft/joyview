import 'react-i18next';
import { NsCommonType } from './en/ns-common';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      common: NsCommonType;
    };
  }
}
