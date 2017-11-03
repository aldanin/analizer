const randomNumbers = {
  img1: Math.floor((Math.random() * 999)),
  img2: Math.floor((Math.random() * 999)),
  img3: Math.floor((Math.random() * 999)),
  img4: Math.floor((Math.random() * 999)),
  img5: Math.floor((Math.random() * 999)),
  img6: Math.floor((Math.random() * 999)),
  img7: Math.floor((Math.random() * 999)),
  img8: Math.floor((Math.random() * 999)),
};

export const PERSON_DATA: any[] = [
  {
    name: 'Yuri gagarin',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img1,

    contactDetails: {}
  }, {
    name: 'Abdul Nazer',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img2,

  }, {
    name: 'Nikoly Pavlov',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img8,

  }, {
    name: 'Roger Waters',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img7,

  }, {
    name: 'Yosef Stalin',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img6,

  }, {
    name: 'King Henry iiiV',
    details: 'Minor terror details',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img5,

  }, {
    name: 'Something Erduwan',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img4,

  }, {
    name: 'Haman the evil',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img3,

  }, {
    name: 'Bernardo Gui',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img2,

  }, {
    name: 'KitKat',
    avatar: 'https://unsplash.it/500/400?image=' + randomNumbers.img1,
  },
];

PERSON_DATA.forEach((item, index) => {
  item.avatar = Math.floor((Math.random() * 7)) % 4 === 0 ? null : item.avatar;
  item.phoneHome = '07-9892154';
  // item.phoneWork = '03-6384159';
  // item.email = 'tushi@gmail.com';
  // item.address = {
  //   street: 'Dizingoff st. 15',
  //   city: 'Tel Aviv, Israel'
  // };
});

export const getPerson = () => {
  return PERSON_DATA[Math.floor((Math.random() * PERSON_DATA.length))];
}
