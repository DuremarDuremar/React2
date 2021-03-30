import axios from "axios";

export default class Server {
  data = [
    {
      id: 1,
      title: "Бойцовая рыбка",
      author: "Фрэнсис Форд Коппола",
      year: 1983,
      price: 10,
      country: "США",
      image:
        "https://st.kp.yandex.net/im/poster/2/5/5/kinopoisk.ru-Rumble-Fish-2556316.jpg",
      filmId: 3751,
    },
    {
      id: 2,
      title: "Седьмая печать",
      author: "Ингмар Бергман",
      year: 1957,
      price: 12,
      country: "Швеция",
      image:
        "https://st.kp.yandex.net/im/poster/5/8/6/kinopoisk.ru-Det-sjunde-inseglet-586720.jpg",
      filmId: 425,
    },
    {
      id: 3,
      title: "Сладкая жизнь",
      author: "Федерико Феллини",
      year: 1960,
      price: 12,
      country: "Италия, Франция",
      image:
        "https://st.kp.yandex.net/im/poster/7/7/3/kinopoisk.ru-La-dolce-vita-773780.jpg",
      filmId: 7722,
    },
    {
      id: 4,
      title: "Затмение",
      author: "Микеланджело Антониони",
      year: 1962,
      price: 9,
      country: "Италия, Франция",
      image:
        "https://st.kp.yandex.net/im/poster/6/0/7/kinopoisk.ru-L_27eclisse-607301.jpg",
      filmId: 59123,
    },
    {
      id: 5,
      title: "Смерть в Венеции",
      author: "Лукино Висконти",
      year: 1971,
      price: 10,
      country: "Италия, Франция",
      image:
        "https://st.kp.yandex.net/im/poster/1/6/0/kinopoisk.ru-Morte-a-Venezia-1608185.jpg",
      filmId: 32970,
    },
    {
      id: 6,
      title: "Гражданин Кейн",
      author: "Орсон Уэллс",
      year: 1941,
      price: 14,
      country: "США",
      image:
        "https://st.kp.yandex.net/im/poster/6/3/8/kinopoisk.ru-Citizen-Kane-638967.jpg",
      filmId: 331,
    },
    {
      id: 7,
      title: "Трамвай «Желание»",
      author: "Элиа Казан",
      year: 1951,
      price: 11,
      country: "США",
      image:
        "https://st.kp.yandex.net/im/poster/1/5/2/kinopoisk.ru-A-Streetcar-Named-Desire-1522223.jpg",
      filmId: 486,
    },
    {
      id: 8,
      title: "Похитители велосипедов",
      author: "Витторио Де Сика",
      year: 1948,
      price: 10,
      country: "Италия",
      image:
        "https://st.kp.yandex.net/im/poster/1/7/3/kinopoisk.ru-Ladri-di-biciclette-1736437.jpg",
      filmId: 432,
    },
    {
      id: 9,
      title: "Огни большого города",
      author: "Чарльз Чаплин",
      year: 1931,
      price: 15,
      country: "США",
      image:
        "https://st.kp.yandex.net/im/poster/1/2/5/kinopoisk.ru-City-Lights-1258948.jpg",
      filmId: 414,
    },
    {
      id: 10,
      title: "Плата за страх",
      author: "Анри-Жорж Клузо",
      year: 1952,
      price: 12,
      country: "Франция, Италия",
      image:
        "https://st.kp.yandex.net/im/poster/7/3/0/kinopoisk.ru-Le-salaire-de-la-peur-730585.jpg",
      filmId: 7727,
    },
    {
      id: 11,
      title: "Его девушка Пятница",
      author: "Ховард Хоукс",
      year: 1940,
      price: 10,
      country: "США",
      image:
        "https://st.kp.yandex.net/im/poster/7/6/2/kinopoisk.ru-His-Girl-Friday-762439.jpg",
      filmId: 470,
    },
    {
      id: 12,
      title: "Небо над Берлином",
      author: "Вим Вендерс",
      year: 1987,
      price: 12,
      country: "Германия (ФРГ), Франция",
      image:
        "https://st.kp.yandex.net/im/poster/5/2/8/kinopoisk.ru-Der-Himmel-_26uuml_3Bber-Berlin-528958.jpg",
      filmId: 8403,
    },
    {
      id: 13,
      title: "Слово",
      author: "Карл Теодор Дрейер",
      year: 1955,
      price: 10,
      country: "Дания",
      image:
        "https://st.kp.yandex.net/im/poster/2/9/5/kinopoisk.ru-Ordet-2952325.jpg",
      filmId: 74507,
    },
    {
      id: 14,
      title: "Андрей Рублев",
      author: "Андрей Тарковский",
      year: 1966,
      price: 13,
      country: "СССР",
      image:
        "https://st.kp.yandex.net/im/poster/2/4/4/kinopoisk.ru-Andrey-Rublyov-2447504.jpg",
      filmId: 8385,
    },
    {
      id: 15,
      title: "Развод по-итальянски",
      author: "Пьетро Джерми",
      year: 1961,
      price: 12,
      country: "Италия",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/5a978d35-f975-430e-8688-4cd657d8b1c5/800x800",
      filmId: 57000,
    },
    {
      id: 16,
      title: "Таксист",
      author: "Мартин Скорсезе",
      year: 1976,
      price: 13,
      country: "США",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/c98c2cc9-aae0-4320-a3fd-29a7d6858553/800x800",
      filmId: 358,
    },
    {
      id: 17,
      title: "Пустоши",
      author: "Терренс Малик",
      year: 1973,
      price: 15,
      country: "США",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/958e7a24-659b-4420-b257-22abd5696145/800x800",
      filmId: 6977,
    },
    {
      id: 18,
      title: "Бразилия",
      author: "Терри Гиллиам",
      year: 1985,
      price: 10,
      country: "Великобритания, США",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/57b2f4f4-9a28-4a7c-b211-690bf62edf29/800x800",
      filmId: 483,
    },
    {
      id: 19,
      title: "Выкорми ворона",
      author: "Карлос Саура",
      year: 1975,
      price: 12,
      country: "Испания",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/f687cde3-d150-4378-8e8e-62c60b89cc74/800x800",
      filmId: 59011,
    },
    {
      id: 20,
      title: "Наконец в безопасности!",
      author: "Фред С. Ньюмейер, Сэм Тейлор",
      year: 1923,
      price: 14,
      country: "США",
      image:
        "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/9b2266dc-291b-4921-9b7a-8cc9334d3c17/800x800",
      filmId: 76976,
    },
  ];

  getServer() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }
}

export const getAxiosFrames = async (id, num) => {
  const res = await axios.get(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "9fbbb1e4-8c01-4ed2-ac4c-9d8a1ac83e48",
      },
    }
  );
  return res.data.frames.slice(0, num);
};

export const getAxiosDescription = async (id) => {
  const res = await axios.get(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}?append_to_response=`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": "9fbbb1e4-8c01-4ed2-ac4c-9d8a1ac83e48",
      },
    }
  );
  return res.data.data.description;
};

export const getAxiosLogin = async (
  email,
  password,
  sub,
  url,
  name,
  log,
  settoken,
  logname,
  logError
) => {
  const Users = () => {
    if (url === "users") {
      return {
        email: email,
        password: password,
        username: name,
      };
    } else {
      return {
        email: email,
        password: password,
      };
    }
  };

  // console.log("password", password);

  axios(`https://conduit.productionready.io/api/${url}`, {
    method: "post",
    data: {
      user: Users(),
    },
  })
    .then((res) => {
      sub(false);
      log(true);
      logname(res.data.user.username);
      settoken(res.data.user.token);
      logError(null);
    })
    .catch((error) => {
      sub(false);
      logError(error);
    });
};
