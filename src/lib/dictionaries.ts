import 'server-only';
import type { Locale } from '../../i18n-config';

const dictionaries = {
  en: () => import('../../dictionaries/en.json'),
  ru: () => import('../../dictionaries/ru.json'),
  he: () => import('../../dictionaries/he.json'),
};

export const getDictionary = async (locale: Locale) => {
  // Добавляем проверку на случай, если locale не соответствует ожидаемым ключам
  // или если функция загрузки словаря по какой-то причине не определена.
  // В идеале, с правильной настройкой i18n-config и middleware, этого не должно происходить.
  const dictionaryLoader = dictionaries[locale];
  if (typeof dictionaryLoader !== 'function') {
    console.error(`Invalid locale or dictionary loader not found for "${locale}". Falling back to 'en'.`);
    // Возвращаемся к английскому языку как к запасному варианту
    return (await dictionaries.en()).default;
  }
  const module = await dictionaryLoader();
  return module.default;
};