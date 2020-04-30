---
layout: index
headerCustom: >
    <img 
      class="custom-hero__img custom-hero__img1"
      src="/media/assets/parallax.jpg" 
      >
    <img 
      class="custom-hero__img custom-hero__img2"
      src="/media/assets/parallax-2.jpg" 
      >
      
    <style type="text/css">
    body{
      background: linear-gradient(to bottom, #2d91c2 0%,#1e528e 200px,white 220px);
      background-attachment: fixed;
      padding-top:50%;
    }
    .index__wrap{
      background:white;
    }
    .custom-hero__img{
      width: 100%;
      -webkit-mask-size: contain;
    }
    .custom-hero__img1{
      position:fixed;
      left:0;
      top:0;
      z-index:-1;
      -webkit-mask-image:url(/media/assets/parallax-mask.png);
      mask-image:url(/media/assets/parallax-mask.png);
    }
    .custom-hero__img2{
      position:absolute;
      left:0;
      top:0;
      z-index:2;
      -webkit-mask-image:url(/media/assets/parallax-mask-2.png);
      mask-image:url(/media/assets/parallax-mask-2.png);
    }
    .header{
      background:transparent;
        position:absolute;
        left:0;
        top:0;
        width:100%;
    }
    .header-inner{
      text-align:center;
    }
    .header__logo{
      width:100%;
      z-index:3;
    }
    </style>
---
hi