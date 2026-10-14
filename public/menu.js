const MENU = {
  P: { title:"Primer plat", groups:[
    ["Ensaladas",[
      ["Rollitos de salmón ahumado con ensaladilla rusa, mango y frutos secos","Huevo, pescado, frutos secos"],
      ["Ensalada de jamón ibérico, granada, frutos secos y tomates secos","Frutos secos"],
      ["Ensalada de conejo en escabeche casero y verduritas",""]]],
    ["Verduras naturales",[
      ["Judietas verdes con patata asada y virutas de jamón",""]]],
    ["Tomate rosa de Barbastro",[
      ["Ensalada de tomate rosa de Barbastro con parmesano y arbequina","Lácteo, gluten opcional"],
      ["Crep de queso de cabra, jamón ibérico, mermelada y tomate rosa gratinada","Lácteo, huevo, gluten"]]],
    ["Plato de cuchara",[
      ["Plato de cuchara del día (a consultar)",""]]],
    ["Pasta fresca artesana",[
      ["Raviolis de carne rustida en salsa de cinco quesos y parmesano","Gluten, lácteo, huevo"]]],
    ["Arroz",[
      ["Risotto de boletus edulis y parmesano","Lácteo"],
      ["Arroz de setas de temporada con toque picante",""]]],
    ["Fideuá",[
      ["Fideuá de pescado con calamar y gamba, con alioli","Gluten, pescado, crustáceos, molusco, huevo"]]],
    ["Milhojas",[
      ["Milhojas de patata con beicon, queso y salsa de 5 quesos","Lácteo"],
      ["Milhojas de berenjena con brandada de bacalao, salmón y salsa de piquillos","Lácteo, sésamo"]]],
    ["Producto especial de temporada",[
      ["Canelones de capón con salsa de boletus trufada y parmesano","Gluten, lácteo, huevo"]]]
  ]},
  S: { title:"Segon plat", groups:[
    ["Pescados",[
      ["Atún rojo a la plancha con salsa de miel y soja y patatas","Sésamo, pescado, soja"],
      ["Bacalao tradicional con tomate y patatas","Pescado"],
      ["Salmón salvaje noruego con salsa de pak choi y sésamo","Pescado, lácteo, sésamo, huevo"],
      ["Rodaballo a la plancha con crema de calabaza y patatas",""],
      ["Pata de pulpo a la plancha con cremoso de patata","Huevo"],
      ["Calamar a la plancha con ajo y perejil y mahonesa de lima y albahaca",""]]],
    ["Carnes",[
      ["Magret de pato con salsa de oporto y pasas y patatas","Salsa: lácteo"],
      ["Secreto ibérico con salsa de roquefort y patatas","Salsa: lácteo"],
      ["Confit de pato con manzana, cebolla, pimiento y ciruelas y patatas",""],
      ["Entrecot de ternera del Pirineo con salsa de boletus y patatas","Salsa: lácteo"],
      ["Hamburguesa de ternera Angus con queso de cabra y patatas","Lácteo, huevo"]]],
    ["Guisos",[
      ["Caracoles guisados a la antigua",""],
      ["Caldereta de ternasco de Aragón con patatas",""],
      ["Guiso de callos y manitas de ternasco",""]]]
  ]},
  D: { title:"Postres", groups:[
    ["Clásicos",[
      ["Ensalada de frutas",""],
      ["Yogurt natural con nueces","Lácteo"],
      ["Requesón con nueces y miel","Lácteo, frutos secos"],
      ["Panna cotta con salsa de chocolate","Lácteo"],
      ["Panna cotta con salsa de frambuesa","Lácteo"],
      ["Cuajada casera con miel y nueces","Lácteo"]]],
    ["Lamineros",[
      ["Carpaccio de piña con helado de coco",""],
      ["Carpaccio de piña con sorbete de mojito",""],
      ["Tarta de queso con coulis de frambuesa","Lácteo, gluten, frutos secos, huevo"],
      ["Lemon pie","Lácteo, gluten, huevo"],
      ["Brownie de chocolate con helado","Lácteo, frutos secos, gluten, huevo"],
      ["Coulant de turrón de Jijona con helado","Lácteo, gluten, frutos secos, huevo"],
      ["Coulant de chocolate negro con helado","Lácteo, gluten, frutos secos, huevo"],
      ["Cremoso de chocolate y café con galleta y helado de nata","Lácteo, frutos secos, huevo, gluten opc."],
      ["Crema de vainilla bourbon caramelizada","Lácteo, huevo"],
      ["Carrot cake","Lácteo, gluten, huevo"]]],
    ["Helados artesanos",[
      ["Helado de vainilla natural","Lácteo, huevo"],
      ["Helado de vainilla con chocolate","Lácteo, huevo"],
      ["Helado de vainilla sin azúcar","Lácteo, huevo"],
      ["Helado de chocolate","Lácteo"],
      ["Helado de chocolate sin azúcar","Lácteo"],
      ["Helado de nata","Lácteo"],
      ["Helado de nata con nuez y miel","Frutos secos, lácteo"],
      ["Helado de galleta Lotus","Lácteo, gluten, huevo"],
      ["Helado de pistacho","Lácteo, huevo"],
      ["Helado de yogurt de oveja de Fonz con frambuesa","Lácteo"],
      ["Helado de horchata","Lácteo"],
      ["Helado de mandarina","Lácteo"],
      ["Helado de limón","Lácteo"]]],
    ["Helados sin lactosa",[
      ["Helado de coco (sin lactosa)",""],
      ["Helado de mango y fruta de la pasión (sin lactosa)",""],
      ["Helado de mojito (sin lactosa)",""]]]
  ]}
};
const IDX = {};
for (const k in MENU){ IDX[k]=[]; MENU[k].groups.forEach(([g,items])=>items.forEach(([n,a])=>IDX[k].push({n,a,g}))); }
