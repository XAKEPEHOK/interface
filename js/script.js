function chance(percent) {
   if (rand(1,100)<=percent) return true;
      else return false;
}

function jsonCompress(json) {
   return json;
   json = str_replace('top','t',json);
   json = str_replace('left','l',json);
   json = str_replace('width','w',json);
   json = str_replace('height','h',json);
   json = str_replace('rotate','rt',json);
   json = str_replace('radius_1','r1',json);
   json = str_replace('radius_2','r2',json);
   json = str_replace('radius_3','r3',json);
   json = str_replace('radius_4','r4',json);
   return json;
}
function jsonDecompress(json) {
   return json;
   json = str_replace('"t','"top',json);
   json = str_replace('"l','"left',json);
   json = str_replace('"w','"width',json);
   json = str_replace('"h','"height',json);
   json = str_replace('"rt','"rotate',json);
   json = str_replace('"r1','"radius_1',json);
   json = str_replace('"r2','"radius_2',json);
   json = str_replace('"r3','"radius_3',json);
   json = str_replace('"r4','"radius_4',json);
   return json;
}

function renderElement(block) {
   return '<div style="' +
          'width: '+block.width+'%; ' +
          'height: '+block.height+'%; ' +
          'top: '+block.top+'%; ' +
          'left: '+block.left+'%;' +
          'left: '+block.left+'%;' +
          '-webkit-transform: rotate('+block.rotate+'deg);' +
          '-moz-transform: rotate('+block.rotate+'deg);' +
          '-o-transform: rotate('+block.rotate+'deg);' +
         'border-radius: '+block.radius_1+'% '+block.radius_2+'% '+block.radius_3+'% '+block.radius_4+'% ;' +
       '"></div>';
}
function renderBlock(block,object) {
   var result = '';
   centrized = centrizeBlock(block);
   for (var element in centrized) result+=renderElement(centrized[element]);
   $(object).html(result);
   var code = JSON.stringify(block);
   $(object).attr('data-code',jsonCompress(code));
   $(object).attr('data-selected','0');
   return true;
}

function randomElement(){
   var borderRadiusChance = rand(10,40);
   var rotateChance = rand(3,8);
   return {
      top: rand(1,100),
      left: rand(1,100),
      width: rand(1,100),
      height: rand(1,100),
      //radiusChance: borderRadiusChance,
      //rotateChance: borderRadiusChance,
      rotate: chance(rotateChance)==true ? rand(-360,360) : 0,
      radius_1: chance(borderRadiusChance)==true ? rand(0,100) : 0,
      radius_2: chance(borderRadiusChance)==true ? rand(0,100) : 0,
      radius_3: chance(borderRadiusChance)==true ? rand(0,100) : 0,
      radius_4: chance(borderRadiusChance)==true ? rand(0,100) : 0
   }
}
function generateRandomBlock(){
   var content = [];
   var count = rand(5,15);
   for (var i = 1; i<=count; i++) content.push(randomElement());
   return content;
}
function generateBlocks(block){
   if (!block) {
      block = [];
      for (var i=1; i<=6; i++)
         block.push(generateRandomBlock());
   }
   $('.block').each(function(id,obj){
      renderBlock(block[id],obj);
   });
}

function centrizeBlock(block) {
   var minLeft = 100;
   var minTop = 100;
   for (var i in block) {
      if (block[i].left<minLeft) minLeft = block[i].left;
      if (block[i].top<minTop) minTop = block[i].top;
   }
   for (var i in block) {
      block[i].left = block[i].left - minLeft;
      block[i].top = block[i].top - minTop;
   }
   return block;
}

function elementHybridization(element1,element2) {
   var mutation = 2;
   if (!chance(mutation)) element1.top = chance(50)==true ? element1.top : element2.top; else element1.top = rand(1,100);
   if (!chance(mutation)) element1.left = chance(50)==true ? element1.left : element2.left; else element1.left = rand(1,100);
   if (!chance(mutation)) element1.width = chance(50)==true ? element1.width : element2.width; else element1.width = rand(1,100);
   if (!chance(mutation)) element1.height = chance(50)==true ? element1.height : element2.height; else element1.height = rand(1,100);
   if (!chance(mutation)) element1.rotate = chance(50)==true ? element1.rotate : element2.rotate; else element1.rotate = rand(-360,360);
   if (!chance(mutation)) element1.radius_1 = chance(50)==true ? element1.radius_1 : element2.radius_1; else element1.radius_1 = rand(0,100);
   if (!chance(mutation)) element1.radius_2 = chance(50)==true ? element1.radius_2 : element2.radius_2; else element1.radius_2 = rand(0,100);
   if (!chance(mutation)) element1.radius_3 = chance(50)==true ? element1.radius_3 : element2.radius_3; else element1.radius_3 = rand(0,100);
   if (!chance(mutation)) element1.radius_4 = chance(50)==true ? element1.radius_4 : element2.radius_4; else element1.radius_4 = rand(0,100);
   return element1;
}
function blockHybridization(block1,block2) {
   //Перемешиваем массивы
   shuffle(block1);
   shuffle(block2);

   //Определяем какой процент какого массива мы будем брать
   var block1Percent = chance(50)==true ? 60 : (chance(50)==true ? 40 : 50);
   var block2Percent = 100 - block1Percent;

   //Переводим процент в количество элементов
   var block1Count = Math.round(block1.length / 100 * block1Percent);
   var block2Count = Math.round(block2.length / 100 * block2Percent);

   var newBlock = [];

   if (chance(35)) {
      for (var i=0; i<block1Count; i++) newBlock.push(block1[i]);
      for (i=0; i<block2Count; i++) newBlock.push(block2[i]);
   } else {
      var min = 0;
      if (block1.length>block2.length) min = block2.length;
      else if (block1.length<block2.length) min = block1.length;
      else min = block1.length;
      for (i=0; i<min; i++) newBlock.push(elementHybridization(block1[i],block2[i]));
   }

   //return centrizeBlock(newBlock);
   return newBlock;
}

function bornNewBlocks(blocks) {
   var result = [];
   var block1, block2;
   for (var i=1; i<=60; i++) {
      block1 = rand(0,blocks.length-1);
      block2 = rand(0,blocks.length-1);
      while (block1==block2) block2 = rand(0,blocks.length-1);
      result.push(blockHybridization(blocks[block1],blocks[block2]));
   }
   return result;
}

$(document).ready(function(){

   window.interface = {
      count: 1,
      individuals: [],
      childs: [],
      generation: 1
   };

   generateBlocks();

   $('.block').on('click',function(){
      if ($(this).attr('data-selected')==0) {
         $(this).find('*').addClass('selected');
         $(this).attr('data-selected','1');
         var block = $(this).attr('data-code');
         block = jsonDecompress(block);
         block = JSON.parse(block);
         window.interface.individuals.push(block);
         if (window.interface.count == 10) {
            window.interface.count = 0;
            window.interface.generation++;
            $('#generation').text(window.interface.generation);
            window.interface.childs = bornNewBlocks(window.interface.individuals);
            window.interface.individuals = [];
         }
         window.interface.count++;
         $('#set').text(window.interface.count);
         if (window.interface.generation == 1) {
            generateBlocks();
         } else {
            var blockSet = [];
            var count = 0;
            for (var i in window.interface.childs) {
               count++;
               blockSet.push(window.interface.childs[i]);
               delete window.interface.childs[i];
               if (count==6) break;
            }
            generateBlocks(blockSet);
         }
      }
   });

   /*
   $('.block').on('dblclick',function(){
      var url = $(this).attr('data-code');
      url = encodeURIComponent(url);
      prompt('Ссылка на данную конструкцию:',url);
   });
   */
})