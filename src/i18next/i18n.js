import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "./locales/ru.json";
import kg from "./locales/kg.json";

const savedLang = localStorage.getItem("language") || "ru";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    kg: { translation: kg },
  },
  lng: savedLang,
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;
