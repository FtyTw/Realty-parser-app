import axios from "axios";
import { OSAppId } from "../constants";
// {"olx_odessa_appartaments":[,{"uri":"https://www.olx.ua/d/obyavlenie/prodaetsya-1-aya-kvartira-v-20zhemchuzhine-s-remontom-IDMMFud.html#8b5cf025f9;promoted","title":"Продаеться 1-ая квартира в 20Жемчужине с ремонтом."},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-svoyu-kvartiru-pod-odessoy-4komnaty-petrodolina-IDK8CK9.html#8b5cf025f9;promoted","title":"Продам Свою Квартиру, под Одессой, 4комнаты, Петродолина"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-svoyu-3-h-komnatnuyu-kvartiru-na-poselke-IDISqWs.html#8b5cf025f9;promoted","title":"Продам свою 3-х комнатную квартиру на Поселке"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2-h-komnatnuyu-kvartiru-zhk-grand-park-ot-hozyaina-IDMJEAI.html#8b5cf025f9;promoted","title":"Продам 2-х комнатную квартиру ЖК \"Гранд Парк\" от хозяина"},{"uri":"https://www.olx.ua/d/obyavlenie/luchshe-predlozhenie-suvorovskiy-rayon-rieltoram-prosba-ne-bespokoit-IDNynRg.html#8b5cf025f9","title":"Лучше предложение! Суворовский район. Риелторам просьба не беспокоить!"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-prostornuyu-5ti-komnatnuyu-kvartiru-IDMXSyI.html#8b5cf025f9","title":"Продам просторную 5ти комнатную квартиру"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2-h-komnatnuyu-kvartiru-IDMcqpR.html#8b5cf025f9;promoted","title":"Продам 2-х комнатную квартиру"},{"uri":"https://www.olx.ua/d/obyavlenie/tsena-snizhena-do-15-12-21-prodam-2h-k-kvartiru-bez-komissii-IDNaQQ2.html#8b5cf025f9;promoted","title":"Цена снижена до 15.12. 21. Продам 2х.к квартиру БЕЗ КОМИССИИ"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-kvartiru-zhk-chayka-odessa-IDJD648.html#8b5cf025f9","title":"Продам квартиру Жк Чайка Одесса"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-3-h-komnatnuyu-kvartiru-IDKhya5.html#8b5cf025f9","title":"Продам 3-х комнатную квартиру"},{"uri":"https://www.olx.ua/d/obyavlenie/1-kom-48-m2-panorama-vid-novyy-sdannyy-dom-hozyain-IDKiZzW.html#8b5cf025f9","title":"1 ком. (48 м2) Панорама-вид/Новый сданный Дом/ Хозяин"},{"uri":"https://www.olx.ua/d/obyavlenie/otlichnaya-kvartira-v-otlichnom-rayone-IDNq8ES.html#8b5cf025f9;promoted","title":"Отличная квартира , в отличном районе"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-kvartiru-v-sun-sity-solnechnyy-gorod-IDMXkYt.html#8b5cf025f9","title":"Продам квартиру в Sun Sity Солнечный город"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2-h-komnatnuyu-kvartiru-ot-hozyaina-ul-izvestkovaya-IDJ5SxS.html#8b5cf025f9;promoted","title":"Продам 2-х комнатную квартиру от Хозяина, ул. Известковая"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-horoshuyu-chistuyu-uyutnuyu-kvartiru-IDNxMDU.html#8b5cf025f9","title":"Продам хорошую, чистую, уютную квартиру."},{"uri":"https://www.olx.ua/d/obyavlenie/kvartira-trehkomnatnaya-IDMnj9B.html#8b5cf025f9","title":"Квартира трехкомнатная"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-svoyu-3-k-kvartiru-v-zhk-odesskiy-traditsii-remont-ot-stroiteley-IDNxgeh.html#8b5cf025f9","title":"Продам свою 3- к квартиру в ЖК Одесский Традиции. Ремонт от строителей"},{"uri":"https://www.olx.ua/d/obyavlenie/tsena-snizhena-do-15-12-prodam-2-h-komn-kvart-45-kv-m-vozle-morya-IDN3rN8.html#8b5cf025f9;promoted","title":"ЦЕНА СНИЖЕНА ДО 15.12. Продам 2-х комн. кварт. 45 кв.м. ВОЗЛЕ МОРЯ!"},{"uri":"https://www.olx.ua/d/obyavlenie/kvartira-IDs5CpG.html#8b5cf025f9","title":"Квартира"},{"uri":"https://www.olx.ua/d/obyavlenie/1-k-svoya-59-zhemchuzhina-vidovaya-srochno-IDNra40.html#8b5cf025f9","title":"1-к _своя_ 59 Жемчужина_видовая_срочно"},{"uri":"https://www.olx.ua/d/obyavlenie/prodazha-2h-komnatnoy-kvartiry-bez-remonta-gorod-odessa-IDNx7AD.html#8b5cf025f9","title":"Продажа 2х комнатной квартиры без ремонта ,город Одесса"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-svoyu-kvartiru-51-kv-m-IDMPU8S.html#8b5cf025f9","title":"Продам свою квартиру 51 кв.м"},{"uri":"https://www.olx.ua/d/obyavlenie/2-komnatnaya-kvartira-s-remontom-i-mebelyu-IDMVfv6.html#8b5cf025f9","title":"2 комнатная квартира с ремонтом и мебелью"},{"uri":"https://www.olx.ua/d/obyavlenie/2-komnatnaya-kvartira-s-garazhom-more-ryadom-ul-baltskaya-doroga-IDNaDCK.html#8b5cf025f9;promoted","title":"2-комнатная квартира с гаражом, море рядом ул. Балтская дорога"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2-h-komnatnuyu-kvartiru-v-grand-parke-odessa-IDM4HsV.html#8b5cf025f9","title":"Продам 2-х комнатную квартиру в Гранд Парке Одесса"},{"uri":"https://www.olx.ua/d/obyavlenie/3-h-komnatnaya-kvartira-na-atamana-chepigi-IDNvvNx.html#8b5cf025f9","title":"3-Х Комнатная квартира на Атамана Чепиги"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2-h-komnatnuyu-kvartiru-rynok-severnyy-IDMf0zq.html#8b5cf025f9","title":"Продам 2-х комнатную квартиру, рынок \"Северный”"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-2k-kvartiru-50m-slobodskaya-IDNvc6N.html#8b5cf025f9","title":"продам 2к квартиру 50м. Слободская"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-4-komnatnuyu-kvartiru-IDHNryO.html#8b5cf025f9","title":"Продам 4 комнатную квартиру."},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-3-h-komn-kvartiru-na-ul-zabolotnogo-IDN184S.html#8b5cf025f9","title":"Продам 3-х комн.квартиру на ул.Заболотного"},{"uri":"https://www.olx.ua/d/obyavlenie/prodaetsya-4-komnatnaya-kvartira-razdelena-na-2-2-vhoda-IDLLMWm.html#8b5cf025f9","title":"Продается 4 комнатная квартира , разделена на 2 . 2 входа ."},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-kvartiru-2k-dobrovolskogo-IDMUVCe.html#8b5cf025f9","title":"Продам квартиру 2к Добровольского"},{"uri":"https://www.olx.ua/d/obyavlenie/prodam-3h-komnatnuyu-kvartiru-v-zelenom-myse-dom-premium-residence-4-IDKz7Sk.html#8b5cf025f9","title":"Продам 3х комнатную квартиру в Зеленом Мысе дом Premium Residence 4"},{"uri":"https://www.olx.ua/d/obyavlenie/kvartira-ot-hozyaina-sobstvennika-s-remontom-IDMcq88.html#8b5cf025f9","title":"Квартира от хозяина собственника с ремонтом"},{"uri":"https://www.olx.ua/d/obyavlenie/srochnaya-prodazha-2-h-komnatnoy-kvartiry-s-remontom-v-suvorovskom-rayone-IDMlM60.html#8b5cf025f9","title":"Срочная продажа 2-х комнатной квартиры с ремонтом в суворовском районе"},{"uri":"https://www.olx.ua/d/obyavlenie/1-komnatnaya-kvartira-s-malenkoy-komunalkoy-IDNuS5t.html#8b5cf025f9","title":"1 комнатная Квартира с маленькой комуналкой"},{"uri":"https://www.olx.ua/d/obyavlenie/zhk-yantarnyy-prodam-1-kom-kvartiru-s-remontom-i-mebelyu-IDMft0V.html#8b5cf025f9","title":"ЖК Янтарный продам 1 ком.квартиру с ремонтом и мебелью"},]
export const TestData = [
  {
    category: "olx_odessa_appartaments",
    uri: "https://www.olx.ua/d/obyavlenie/kvartira-v-novom-dome-s-vidom-na-more-IDMWM6Q.html#8b5cf025f9;promoted",
    title: "Квартира в новом доме с видом на море",
  },
  {
    category: "olx_odessa_appartaments",
    uri: "https://www.olx.ua/d/obyavlenie/prodam-2-h-urovnevuyu-kvartiru-zhk-smart-na-bocharova-IDHrMCY.html#8b5cf025f9",
    title: 'Продам 2-х уровневую квартиру ЖК "СМАРТ" на Бочарова',
  },
  {
    category: "olx_odessa_appartaments",
    uri: "https://www.olx.ua/d/obyavlenie/dvuhkomnatnaya-kvartira-IDMOmZI.html#8b5cf025f9",
    title: "Двухкомнатная квартира",
  },
];

export const sendTestPush = async (testData, index = 0) => {
  // for (let i = 0; i < 1; i++) {
  const { category, uri, title } = testData[index];
  const uriFinal = `${uri}cat_split${category}`;
  try {
    const result = await axios({
      method: "post",
      url: "https://onesignal.com/api/v1/notifications",
      data: {
        app_id: "53dc8ca7-fd32-49c2-8a23-69d68075f36f",
        contents: { en: uriFinal },
        headings: { en: title },
        included_segments: ["Subscribed Users"],
        data: {
          uri: uriFinal,
          title,
        },
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Basic ZGEyN2NmZjItODEzYy00MTRlLTgzNjYtN2NmMDRkMjZhMzJi",
      },
    });
  } catch (error) {
    console.log("sendNotification", error);
  }
  // }
};

export default {
  TestData,
  sendTestPush,
};
