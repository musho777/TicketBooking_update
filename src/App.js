import { useDispatch, useSelector } from 'react-redux';
import i18n from "i18next";

import en from "./components/lang/en.json";
import am from "./components/lang/am.json";
import ru from "./components/lang/ru.json";
import './fonts/Montserratarm-Black.otf'
import './fonts/Montserratarm-Bold.otf'
import './fonts/Montserratarm-ExtraBold.otf'
import './fonts/Montserratarm-ExtraLight.otf'
import './fonts/Montserratarm-Light.otf'
import './fonts/Montserratarm-Medium.otf'
import './fonts/Montserratarm-Regular.otf'
import './fonts/Montserratarm-SemiBold.otf'
import './fonts/Montserratarm-Thin.otf'
import './index.css'





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
    {/* <div style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
      <img src='data:image/png;base64,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' />
    </div> */}
    <Router />
  </I18nextProvider>
}

export default App;