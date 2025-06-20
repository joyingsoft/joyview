import i18n from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { nsCommon } from './en/ns-common';
import { nsCommon as nsCommonCn } from './cn/ns-common';

export const defaultNS = nsCommon.namespace;

export const resources = {
  en: { [nsCommon.namespace]: nsCommon.en },
  zh: { [nsCommon.namespace]: nsCommonCn },
} as const;

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    ns: [nsCommon.namespace],
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    defaultNS,
    resources,
  });

export default i18n;
