'use strict';

{
  //グローバルナビ
  const overlay = Vue.createApp({
    data() {
      return {
        open: false,
        links: [
          {id: 1, name: "Top", href: "#"},
          {id: 2, name: "Menu", href: "#menu"},
          {id: 3, name: "Gallery", href: "#gallery"},
          {id: 4, name: "Reservation", href: "#reservation"},
          {id: 5, name: "Shop", href: "#shop"},
        ]
      }
    }
  }).mount('#overlay');

  //ページ内スクロール
  const anchors = document.querySelectorAll('.page__scroll');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const href = anchor.getAttribute('href').replace('#', '');
      const target = document.getElementById(href);
      target.scrollIntoView({
        behavior: 'smooth'
      })
    });
  });

  //フッターロゴからページトップへスクロール
  const footerLogo = document.querySelector('.footer__logo');
  footerLogo.addEventListener('click', () => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });

  //スクロールイベント
  window.addEventListener('scroll', () => {
    const showTargets = document.querySelectorAll('.smoothIn');
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    showTargets.forEach(showTarget => {
      const rect = showTarget.getBoundingClientRect().top;
      const offset = rect + scroll;
      if(scroll > offset - windowHeight + 100) {
        showTarget.classList.add('show');
      }
    }) 
  });

  //ギャラリー表示・モーダルウィンドウ
  const thumbnailList = {
    count: 15,
    items: [
      {thumbnail: 'img/pic-gallery01@2x.jpg', href: 'img/pic-gallery01-l.jpg'},
      {thumbnail: 'img/pic-gallery02@2x.jpg', href: 'img/pic-gallery02-l.jpg'},
      {thumbnail: 'img/pic-gallery03@2x.jpg', href: 'img/pic-gallery03-l.jpg'},
      {thumbnail: 'img/pic-gallery04@2x.jpg', href: 'img/pic-gallery04-l.jpg'},
      {thumbnail: 'img/pic-gallery05@2x.jpg', href: 'img/pic-gallery05-l.jpg'},
      {thumbnail: 'img/pic-gallery06@2x.jpg', href: 'img/pic-gallery06-l.jpg'},
      {thumbnail: 'img/pic-gallery07@2x.jpg', href: 'img/pic-gallery07-l.jpg'},
      {thumbnail: 'img/pic-gallery08@2x.jpg', href: 'img/pic-gallery08-l.jpg'},
      {thumbnail: 'img/pic-gallery09@2x.jpg', href: 'img/pic-gallery09-l.jpg'},
      {thumbnail: 'img/pic-gallery10@2x.jpg', href: 'img/pic-gallery10-l.jpg'},
      {thumbnail: 'img/pic-gallery11@2x.jpg', href: 'img/pic-gallery11-l.jpg'},
      {thumbnail: 'img/pic-gallery12@2x.jpg', href: 'img/pic-gallery12-l.jpg'},
      {thumbnail: 'img/pic-gallery13@2x.jpg', href: 'img/pic-gallery13-l.jpg'},
      {thumbnail: 'img/pic-gallery14@2x.jpg', href: 'img/pic-gallery14-l.jpg'},
      {thumbnail: 'img/pic-gallery15@2x.jpg', href: 'img/pic-gallery15-l.jpg'}
    ]
  }

  let loadNum = 2;

  const gallery = Vue.createApp({
    data() {
      return {
        items: [],
        hasNext: true,
        src: null,
        show: false
      }
    },
    mounted: function() {
      if (window.matchMedia('(max-width:767px)').matches) {
        this.items = this.items.concat(thumbnailList.items.slice(0, 2));
      } else if (window.matchMedia('(max-width:991px)').matches) {
        this.items = this.items.concat(thumbnailList.items.slice(0, 3));
      } else if (window.matchMedia('(min-width:992px)').matches) {
        this.items = this.items.concat(thumbnailList.items.slice(0, 4));
      }
    },
    methods: {
      load() {
        if (window.matchMedia('(max-width:767px)').matches) {
          ;
        } else if (window.matchMedia('(max-width:991px)').matches) {
          loadNum = 3;
        } else if (window.matchMedia('(min-width:992px)').matches) {
          loadNum = 4;
        }
        this.items = this.items.concat(thumbnailList.items.slice(this.items.length, this.items.length + loadNum));
        if (this.items.length >= thumbnailList.count) {
          this.hasNext = false;
        }
      },
      zoom(e) {
        this.src = e.currentTarget.getAttribute('href');
        this.show = true;
      },
      close() {
        this.show = false;
      },
      afterLeave: function() {
        this.src = null;
      }
    }
  }).mount('#gallery')

  




}