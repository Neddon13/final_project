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


  //loading in sprites for game characters and objects for mapping levels though imgur account
  loadRoot('https://i.imgur.com/')

  loadSprite('top-wall', 'PatuSh9.png') //S
  loadSprite('bottom-wall', 'GGgrnFh.png')  // S
  loadSprite('right-wall', '17t8kMm.png') //S
  loadSprite('left-wall', 'eletAMJ.png') // S
  loadSprite('top-right-corner', 'TOOO8Ma.png') //S
  loadSprite('top-left-corner', 'b2P8Uam.png')  //S
  loadSprite('bottom-right-corner', 'xzIPIsh.png') //S
  loadSprite('bottom-left-corner', 'JDrxVjq.png') //S

  loadSprite('left-wall-Y-flag', 'rYfz2wm.png') //S
  loadSprite('left-wall-G-flag', 'm5ufziB.png') //S
  loadSprite('left-wall-R-flag', 'eHx4ppW.png') //S
  loadSprite('left-wall-B-flag', 'SIhBYWy.png') //S

  loadSprite('right-wall-Y-flag','blvTV9B.png') //S
  loadSprite('right-wall-R-flag', '0M3KY1J.png')    //S
  loadSprite('right-wall-G-flag', '88Hky91.png')    //S
  loadSprite('right-wall-B-flag', 'tcdwQOu.png')    //S

  loadSprite('pillar-top', 'TEYuPFZ.png')   //S
  loadSprite('pillar-base', 'ih1tmYd.png')  //S
  loadSprite('pillar-body', 'PKYGY5T.png')  //S

  loadSprite('stairs-right', '77BWeTa.png') //NS

  loadSprite('bottom-right-next-level-door', 'tWsoh5t.png') //NS
  loadSprite('bottom-left-next-level-door', 'nrN8NHD.png')  //NS

  loadSprite('ladders-up-or-down-right-side', 'yrcUwIk.png') //NS

  loadSprite('ladders-up', 'QFTJuE9.png') // NS
  loadSprite('ladders-up-exit-hole', 'KR0DMJJ.png') //S

  loadSprite('gunge-flow-top', 'Od2ZfHj.png') //S
  loadSprite('gunge-flow-bottom', 'VKaIwiT.png')// NS
  loadSprite('water-flow-top', 'yp2IeuT.png') //S
  loadSprite('water-flow-bottom', 'E4I8hh3.png') //NS
  loadSprite('lava-flow-top', '5TW0ktX.png') //S
  loadSprite('lava-flow-bottom', '3DXREXE.png') //NS

  loadSprite('shadow', 'DhrVZ0n.png') //S

  loadSprite('bg', '62HrIvb.png') //NS


  //below we create the first map 
scene("game", () => {

    const map = [
    [
        '',
        '',
        'a',
        'a',
        'a',
        'a',
        'q',
        'z',
        'x',
        'c',
        'd',
        'e',
    ],  
    [

    ],

    
    ]
    //assigning key values to loaded sprites to use in making the maps 
    const level_creation = {
        width: 16, // sprites px size 
        height: 16, // sprites px size

        // walls - non decorated
        q: [sprite('top-left-corner'), solid(), 'wall'],
        w: [sprite('top-wall'), solid(), 'wall'],
        e: [sprite('top-right-corner'), solid(), 'wall'],
        a: [sprite('left-wall'), solid(), 'wall'],
        z: [sprite('bottom-left-corner'), solid(), 'wall'],
        x: [sprite('bottom-wall'), solid(), 'wall'],
        c: [sprite('bottom-right-corner'), solid(), 'wall'],
        d: [sprite('right-wall'), solid(), 'wall'],
        
        
        f: [sprite('left-wall-Y-flag'), solid(), 'wall'],
        r: [sprite('left-wall-G-flag'), solid(), 'wall'],
        v: [sprite('left-wall-R-flag'), solid(), 'wall'],
        b: [sprite('left-wall-B-flag'), solid(), 'wall'],

        t: [sprite('right-wall-Y-flag'), solid(), 'wall'],
        g: [sprite('right-wall-G-flag'), solid(), 'wall'],
        y: [sprite('right-wall-R-flag'), solid(), 'wall'],
        h: [sprite('right-wall-B-flag'), solid(), 'wall'],

        n: [sprite('pillar-top'), solid(), 'wall'],
        u: [sprite('pillar-body'), solid(), 'wall'],
        j: [sprite('pillar-base'), solid(), 'wall'],

        m: [sprite('ladders-up-or-down-right-side'), 'next-level'],
        i: [sprite('ladders-up'), 'next-level'],
        k: [sprite('ladders-up-exit-hole'), solid(), 'wall'],

        o: [sprite('bottom-right-next-level-door'), 'next-level'],
        l: [sprite('bottom-left-next-level-door'), 'next-level'],

        p: [sprite('stairs-right'), 'next-level'],

        '~': [sprite('gunge-flow-top'), solid(), 'wall'],
        '$': [sprite('water-flow-top'), solid(), 'wall'],
        '^': [sprite('lava-flow-top'), solid(), 'wall'],
        '(': [sprite('gunge-flow-bottom'), 'cool' ],
        ')': [sprite('water-flow-bottom'), 'cool'],
        '_': [sprite('lava-flow-bottom'), 'cool'],
        '-': [sprite('shadow'), solid()],
    }
    addLevel(map, level_creation)
})
  
start("game")