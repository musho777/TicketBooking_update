import { useDispatch, useSelector } from 'react-redux';
import i18n from "i18next";

import en from "./components/lang/en.json";
import am from "./components/lang/am.json";
import ru from "./components/lang/ru.json";


import { Router } from './routes/router'
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ChangeLanguageAction } from './services/action/action';

function App() {
  const [lang, setLang] = useState('')
  const { language } = useSelector((st) => st.StaticReducer)
  const disable = useDispatch()
  useEffect(() => {
    let item = localStorage.getItem('lang')
    if (language) {
      setLang(language)
    }
    else if (item) {
      setLang(item)
      disable(ChangeLanguageAction(item))
    }
    else {
      setLang('am')
      disable(ChangeLanguageAction('am'))
    }

  }, [language])

  console.error = function () { };
  console.warn = function () { };
  i18n.init({
    lng: lang,
    resources: {
      en: { translation: en },
      am: { translation: am },
      ru: { translation: ru },

    },
  });
  return <I18nextProvider i18n={i18n}>
    <Router />
  </I18nextProvider>
}

export default App;