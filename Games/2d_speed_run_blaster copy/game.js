
//
const refreshButton = document.querySelector('.refresh-button');

const refreshPage = () => {
  location.reload();
}

refreshButton.addEventListener('click', refreshPage)
//



kaboom({  // setup for Kaboom game library and is importated through html file
  global: true,
 
  scale: 3.25,
  debug: true,
  clearColor: [0, 0, 0, 1],
})

// // player, enemey and boss speed 
const player_Speed = 60
const goblin_Speed = 40
const Skelly_Speed = 30

// Game Logic
loadRoot('https://i.imgur.com/') //loading in sprites for game characters and objects for mapping levels though imgur account


loadSprite('player-right', '57CVUdA.png')
loadSprite('player-left', '/EFvXfj7.png')
loadSprite('player-up', '/nXDqcLj.png')
loadSprite('player-facing', 'XZJWPP1.png')

loadSprite('top-wall', 'PatuSh9.png') //S
loadSprite('bottom-wall', 'GGgrnFh.png')  // S
loadSprite('right-wall', '17t8kMm.png') //S
loadSprite('left-wall', 'eletAMJ.png') // S
loadSprite('top-right-corner', 'TOOO8Ma.png') //S
loadSprite('top-left-corner', 'b2P8Uam.png')  //S
loadSprite('bottom-right-corner', 'xzIPIsh.png') //S
loadSprite('bottom-left-corner', 'JDrxVjq.png') //S

loadSprite('top-wall-yellow', 'ki9l070.png') //S
loadSprite('top-wall-blue', '8OYDR99.png')  //S
loadSprite('top-wall-red', 'zBzVAIh.png') //S
loadSprite('top-wall-green', 'aNxOpPj.png') //S

loadSprite('bottom-wall-yellow', 'VOpa7oN.png') //S
loadSprite('bottom-wall-red', '/YEK335k.png')  //S
loadSprite('bottom-wall-green', '/INb8Jju.png') //S
//   loadSprite('bottom-wall-blue', '') //S

loadSprite('top-left-door', 'uypslqm.png') //S
loadSprite('top-right-door', 'w1xJH1S.png')  //S

loadSprite('left-wall-Y-flag', 'rYfz2wm.png') //S
loadSprite('left-wall-G-flag', 'm5ufziB.png') //S
loadSprite('left-wall-R-flag', 'eHx4ppW.png') //S
loadSprite('left-wall-B-flag', 'SIhBYWy.png') //S

loadSprite('right-wall-Y-flag', 'blvTV9B.png') //S
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

loadSprite('coin', 'w9iby1M.png') //NS
loadSprite('chest', 'nIDAjja.png') //NS






loadSprite('shadow', 'DhrVZ0n.png') //S

loadSprite('bg', 'TwsHMKh.png') //NS

loadSprite('goblin', 'fQjAh0x.png')
loadSprite('goblin-still', 'fQjAh0x.png')
loadSprite('skelly-still', '1K34y4u.png')
loadSprite('skelly', '1K34y4u.png')
loadSprite('bullet', 'vYBHauP.png')



scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '--------------',
      '-qw~w$<>^w~we-',
      '-aC( )lo_ (Cd-',
      '-r n     Gn d-',
      '-a uC  G Cu d-',
      '-a u      u d-',
      '-a j G    j d-',
      '-a n    G n d-',
      '-a u      u d-',
      '-a uC    Cu d-',
      '-a j      j d-',
      '-a          d-',
      '-zxAxxxxxxAxc-',
      '--------------'
    ],
    [
      '---------------',
      '-qww~ww<>ww~we-',
      '-aC (  lo  (Cd-',
      '-r n      *n d-',
      '-a uCCC*CCCu d-',
      '-a u*      u d-',
      '-a j       j d-',
      '-a n   Z   n d-',
      '-a u  Z Z  u d-',
      '-a uCZ   ZCu d-',
      '-a j       j d-',
      '-aC         Cd-',
      '-zxAxxxxxxAxxc-',
      '---------------'

    ],
    [
      '--------------',
      '-qw~wwwwww~we-',
      '-aC(  WW  (Cd-',
      '-r n CC * n d-',
      '-a uC }} Cu d-',
      '-a u  *   u d-',
      '-aCj  }}CCj d-',
      '-a n      n d-',
      '-aCu  }}  u d-',
      '-a u      u d-',
      '-a j      j d-',
      '-aC        Cd-',
      '-zxAxxxxxxAxc-',
      '--------------'

    ]

  ]

  const levelCreator = {
    width: 16, // px size for sprites
    height: 16, // px size for sprites

    // undecorated walls
    'q': [sprite('top-left-corner'), solid(), 'wall'],
    'w': [sprite('top-wall'), solid(), 'wall'],
    'e': [sprite('top-right-corner'), solid(), 'wall'],
    'a': [sprite('left-wall'), solid(), 'wall'],
    'z': [sprite('bottom-left-corner'), solid(), 'wall'],
    'x': [sprite('bottom-wall'), solid(), 'wall'],
    'c': [sprite('bottom-right-corner'), solid(), 'wall'],
    'd': [sprite('right-wall'), solid(), 'wall'],
    //


    // top wall flag decoration
    '@': [sprite('top-wall-yellow'), solid(), 'wall'],
    '±': [sprite('top-wall-blue'), solid(), 'wall'],
    '£': [sprite('top-wall-red'), solid(), 'wall'],
    '^': [sprite('top-wall-green'), solid(), 'wall'],
    //


    // bottom wall decorated flags
    '`': [sprite('bottom-wall-green'), solid(), 'wall'],
    'A': [sprite('bottom-wall-red'), solid(), 'wall'],
    'B': [sprite('bottom-wall-yellow'), solid(), 'wall'],
    //


    // left wall decorations
    'f': [sprite('left-wall-Y-flag'), solid(), 'wall'],
    'r': [sprite('left-wall-G-flag'), solid(), 'wall'],
    'v': [sprite('left-wall-R-flag'), solid(), 'wall'],
    'b': [sprite('left-wall-B-flag'), solid(), 'wall'],
    //


    // right wall decorations
    't': [sprite('right-wall-Y-flag'), solid(), 'wall'],
    'g': [sprite('right-wall-G-flag'), solid(), 'wall'],
    'y': [sprite('right-wall-R-flag'), solid(), 'wall'],
    'h': [sprite('right-wall-B-flag'), solid(), 'wall'],
    //


    // pillar 
    'n': [sprite('pillar-top'), solid(), 'wall'],
    'u': [sprite('pillar-body'), solid(), 'wall'],
    'j': [sprite('pillar-base'), 'wall'],
    //


    // ladders
    'm': [sprite('ladders-up-or-down-right-side'), 'next-level'],
    'i': [sprite('ladders-up'), 'next-level'],
    'k': [sprite('ladders-up-exit-hole'), solid(), 'wall'],
    //


    // door
    'o': [sprite('bottom-right-next-level-door'), 'next-level', 'door'],
    'l': [sprite('bottom-left-next-level-door'), 'next-level', 'door'],
    '<': [sprite('top-left-door'), solid(), 'wall', 'door'],
    '>': [sprite('top-right-door'), solid(), 'wall', 'door'],
    //


    //stairs
    'p': [sprite('stairs-right'), 'next-level'],
    //

    // decorations
    '~': [sprite('gunge-flow-top'), solid(), 'wall'],
    '$': [sprite('water-flow-top'), solid(), 'wall'],
    '^': [sprite('lava-flow-top'), solid(), 'wall'],
    '(': [sprite('gunge-flow-bottom'), 'cool'],
    ')': [sprite('water-flow-bottom'), 'cool'],
    '_': [sprite('lava-flow-bottom'), 'cool'],
    'C': [sprite('coin'), 'point'],
    'W': [sprite('chest'), 'win', solid(), 'wall'],
    //

    // enemies
    '-': [sprite('shadow'), solid(), 'wall'],
    '*': [sprite('goblin'), 'goblin', { dir: -1 }, 'dangerous'],
    'G': [sprite('goblin-still'), 'goblin', { dir: 0 }, 'dangerous'],
    '}': [sprite('skelly'), 'dangerous', 'skelly', { dir: -1, timer: 0 }],
    'Z': [sprite('skelly-still'), 'dangerous', 'skelly', { dir: 0, timer: 0 }],

  }

  //
  addLevel(maps[level], levelCreator)

  //
  add([sprite('bg'), layer('bg')])

  //
  const scoreLabel = add([
    text(' score: 0'),
    pos(238, 100),
    layer('ui'),
    {
      value: score,
    },
    scale(1.5),
  ])

  // shows what level you are on 
  add([text('level ' + parseInt(level + 1)), pos(250, 125), scale(1.5)])
  //


  //
  const player = add([
    sprite('player-up'),
    pos(114, 173),
    {
      dir: vec2(1, 0),
    },
  ])
  //


  // makes effects of solid and non solid work with correct outcomes for next-level
  player.action(() => {
    player.resolve()
  })
  //


  //
  player.overlaps('next-level', () => {
    go('game', {
      level: (level + 1) % maps.length,
      score: scoreLabel.value,
    })
  })
  //


  // taken out as dont see real game use/purpose for this 
  // player.overlaps('previous-level', () => {
  //   go('game', {
  //     level: (level - 1) % maps.length,
  //     score: scoreLabel.value,
  //   })
  // })
  //


  // controls for player 
  keyDown('left', () => {
    player.changeSprite('player-left')
    player.move(-player_Speed, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('player-right')
    player.move(player_Speed, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('player-up')
    player.move(0, -player_Speed)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('player-facing')
    player.move(0, player_Speed)
    player.dir = vec2(0, 1)
  })
  //


  //
  function fire(bullet) {
    const obj = add([sprite('bullet'), pos(bullet), 'bullet'])
    wait(0.2, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    fire(player.pos.add(player.dir.scale(22)))
  })
  //


  //
  collides('bullet', 'goblin', (bullet, goblin) => {
    camShake(4)
    wait(0.5, () => {
      destroy(bullet)
    })
    destroy(goblin)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })
  //

  //
  collides('bullet', 'skelly', (bullet, skelly) => {
    camShake(1)
    wait(0.5, () => {
      destroy(bullet)
    })
    destroy(skelly)
    scoreLabel.value + 2
    scoreLabel.text = scoreLabel.value
  })
  //

  player.collides('point', (point) => {
    destroy(point)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  //
  action('goblin', (goblin) => {
    goblin.move(goblin.dir * goblin_Speed, 0)
  })

  collides('goblin', 'wall', (goblin) => {
    goblin.dir = -goblin.dir
  })
  //


  //
  action('skelly', (skelly) => {
    skelly.move(0, skelly.dir * Skelly_Speed)
    skelly.timer -= dt()
    if (skelly.timer <= 0) {
      skelly.dir = -skelly.dir
      skelly.timer = rand(5)
    }
  })

  collides('skelly', 'wall', (skelly) => {
    skelly.dir = -skelly.dir
  })
  //


  //
  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value })
  })


  player.collides('win', () => {
    go('win', { score: scoreLabel.value })
  })


})
// game logic finsihed 




//
scene('lose', ({ score }) => {
  add([text(' You lose try again! Score: ' + parseInt(score)), origin('center'), pos(width() / 2, height() / 2)])

})

scene('win', ({ score }) => {
  add([text(' Congrats you completed the game! With a final Score: ' + parseInt(score)), origin('center'), pos(width() / 2, height() / 2)])

})

start('game', { level: 0, score: 0 })


