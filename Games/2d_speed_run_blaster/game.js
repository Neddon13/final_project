//setup for Kaboom game library and is importated through html file
kaboom({
    global: true,
    fullscreen: true,
    scale: 3,
    debug: true,
    clearColor: [0, 0, 1, 1],
  })

// player, enemey and boss speed 
  const playerSpeed = 130
  const enemeySpeed = 100
  const bossSpeed = 150


  //laoding in sprites for game characters and objects for mapping levels though imgur account
  loadRoot('https://i.imgur.com/')
  loadSprite('bottom-wall', 'GGgrnFh.png')  // S
  loadSprite('right-wall-Y-flag','blvTV9B.png') //S
  loadSprite('right-wall-R-flag', '0M3KY1J.png')    //S
  loadSprite('right-wall-G-flag', '88Hky91.png')    //S
  loadSprite('right-wall-B-flag', 'tcdwQOu.png')    //S
  loadSprite('pillar-top', 'TEYuPFZ.png')   //S
  loadSprite('pillar-base', 'ih1tmYd.png')  //S
  loadSprite('pillar-body', 'PKYGY5T.png')  //S
  loadSprite('top-wall', 'PatuSh9.png') //S
  loadSprite('right-wall', '17t8kMm.png') //S
  loadSprite('top-right-corner', 'TOOO8Ma.png') //S
  loadSprite('top-left-corner', 'b2P8Uam.png')  //S
  loadSprite('stairs-right', '77BWeTa.png') //NS
  loadSprite('bottom-right-next-level-door', 'tWsoh5t.png') //NS
  loadSprite('bottom-left-next-level-door', 'nrN8NHD.png')  //NS
  loadSprite('ladders-up-or-down-right-side', 'yrcUwIk.png') //NS
  loadSprite('left-wall', 'eletAMJ.png') // S
  loadSprite('ladders-up', 'QFTJuE9.png') // NS
  loadSprite('ladders-up-exit-hole', 'KR0DMJJ.png') //S
  loadSprite('gunge-flow-bottom', 'VKaIwiT.png')// NS
  loadSprite('bottom-right-corner', 'xzIPIsh.png') //S
  loadSprite('bottom-left-corner', 'JDrxVjq.png') //S
  loadSprite('water-flow-top', 'yp2IeuT.png') //S
  loadSprite('water-flow-bottom', 'E4I8hh3.png') //NS
  loadSprite('shadow', 'DhrVZ0n.png') //S
  loadSprite('left-wall-Y-flag', 'rYfz2wm.png') //S
  loadSprite('left-wall-G-flag', 'm5ufziB.png') //S
  loadSprite('left-wall-R-flag', 'eHx4ppW.png') //S
  loadSprite('left-wall-B-flag', 'SIhBYWy.png') //S
  loadSprite('lava-flow-top', '5TW0ktX.png') //S
  loadSprite('lava-flow-bottom', '3DXREXE.png') //NS
  loadSprite('gunge-flow-top', 'Od2ZfHj.png') //S
  loadSprite('bg', '62HrIvb.png') //NS
  
start("game")