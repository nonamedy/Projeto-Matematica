

import { button } from "./modules/tabuada.mjs";
import { select,verify,static_tab,randow_tab } from "./modules/selectab.mjs";
import { chose,buttonE1 } from "./modules/operação.mjs";



button.addEventListener('click',verify)
static_tab.addEventListener('click',select.bind(verify,static_tab))
randow_tab.addEventListener('click',select.bind(verify,randow_tab))
buttonE1.addEventListener('click',chose)





