type LocalStorageKey =
  | 'imageSpace'
  //   | 'imageColumns'
  | 'language'
  | 'theme'
  | 'view';

const save = (key: LocalStorageKey, value: string) => {
  localStorage.setItem(key, value.toString());
};

const load = (key: LocalStorageKey): string | null => {
  return localStorage.getItem(key);
};

export const LocalStorageUtils = {
  save,
  load,
};
