import 'babel-polyfill'
import config from './Config/config'
import Game from './Game'

new Game(config)
const gameWrapper = document.getElementById('game')
gameWrapper.style.width = config.scale.width + 'px'
gameWrapper.style.height = config.scale.height + 'px'

