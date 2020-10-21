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
    },
  ];

  getServer() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }
}
