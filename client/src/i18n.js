import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Basic translations (we can expand these later)
const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "chat": "Agri Assistant",
      "disease_detection": "Disease Detection",
      "profile": "Farmer Profile",
      "settings": "Settings",
      "logout": "Logout",
      "weather_widget": "Weather Forecast",
      "market_trends": "Market Trends",
      "smart_insights": "Smart Farming Insights",
      "welcome_back": "Welcome back",
      "ask_anything": "Ask me anything about your farm...",
      "export_pdf": "Export to PDF",
      "voice_input": "Voice Input"
    }
  },
  te: {
    translation: {
      "dashboard": "డ్యాష్‌బోర్డ్",
      "chat": "వ్యవసాయ సహాయకుడు",
      "disease_detection": "వ్యాధి గుర్తింపు",
      "profile": "రైతు ప్రొఫైల్",
      "settings": "సెట్టింగులు",
      "logout": "లాగ్అవుట్",
      "weather_widget": "వాతావరణ సూచన",
      "market_trends": "మార్కెట్ ధోరణులు",
      "smart_insights": "స్మార్ట్ ఫార్మింగ్ అంతర్దృష్టులు",
      "welcome_back": "తిరిగి స్వాగతం",
      "ask_anything": "మీ వ్యవసాయం గురించి ఏదైనా అడగండి...",
      "export_pdf": "PDF కు ఎగుమతి చేయండి",
      "voice_input": "వాయిస్ ఇన్పుట్"
    }
  },
  hi: {
    translation: {
      "dashboard": "डैशबोर्ड",
      "chat": "कृषि सहायक",
      "disease_detection": "रोग का पता लगाना",
      "profile": "किसान प्रोफ़ाइल",
      "settings": "सेटिंग्स",
      "logout": "लॉग आउट",
      "weather_widget": "मौसम पूर्वानुमान",
      "market_trends": "बाजार के रुझान",
      "smart_insights": "स्मार्ट खेती अंतर्दृष्टि",
      "welcome_back": "वापसी पर स्वागत है",
      "ask_anything": "अपने खेत के बारे में कुछ भी पूछें...",
      "export_pdf": "PDF में निर्यात करें",
      "voice_input": "आवाज़ इनपुट"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
