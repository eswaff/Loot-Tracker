var bladeCount = 0;
var gobletCount = 0;
var bootsCount = 0;
var necklaceCount = 0;
var totalLoot = 0;
var sinciroFuse = 0;
var lootList = [bladeCount,necklaceCount,bootsCount,gobletCount];
var testNum = 0;
var fusedList = [1,2,3,4] 
var order = [4,2,3,1]
function lootGet(num, type){
  if (type == 1 && bladeCount + num >= 0){
    bladeCount += num;
    bladeNum.innerText = bladeCount;
  }
  if (type == 2 && necklaceCount + num >= 0){
    necklaceCount += num;
    necklaceNum.innerText = necklaceCount;
  }
  if (type == 3 && bootsCount + num >= 0){
    bootsCount += num;
    bootsNum.innerText = bootsCount;
  }
  if (type == 4 && gobletCount + num >= 0){
    gobletCount += num;
    gobletNum.innerText = gobletCount;
  }
  totalUpdate();
}
function setZero(typeList){
  if (1 in typeList){
    bladeCount = 0;
    bladeNum.innerText = bladeCount;
  }
  if (2 in typeList){
    necklaceCount = 0;
    necklaceNum.innerText = necklaceCount;
  }
  if (3 in typeList){
    bootsCount = 0;
    bootsNum.innerText = bootsCount;
  }
  if (4 in typeList){
    gobletCount = 0;
    gobletNum.innerText = gobletCount;
  }
  totalUpdate();
}
function totalUpdate(){
  totalLoot = bladeCount + gobletCount + bootsCount + necklaceCount;
  total.innerText = "Total Loot: " + totalLoot;
  lootList =[bladeCount,necklaceCount,bootsCount,gobletCount];
}
function fuseSinciro(num){
  if (num == totalLoot){
    for (loot in lootList){
      if(lootList[loot]>0){
        missingToggle(parseInt(loot)+1);
      }
    }
    setZero([1,2,3,4,5]);
  }else{
    if(uniqueCount() == num){
      for (loot in lootList){
        if(lootList[loot]>0){
          missingToggle(parseInt(loot)+1);
          lootGet(-1,parseInt(loot)+1);
        }
      }
    }else if (fusedList.length == num && checkIfValid()){
      var i = 0;
      while (i < fusedList.length){
        lootGet(-1,fusedList[i]);
        missingToggle(fusedList[i]);
      }
    }else{
      var i = 0;
      var j = 0;
      while (i<num){
        if ((lootList[order[j]-1] > 0 && isIn(order[j],fusedList))){
          lootGet(-1,order[j]);
          missingToggle(order[j]);
          i+=1;
          j=0;
        }
        j+=1
      }
    }
  }
  sinciroFuse += num;
  fused.style.left = 752+'px';
  fused.innerText = "Fused: " + sinciroFuse;
}
function fuseSlash(){
  var i = 0;
  while (i < 4){
    if(lootList[order[i]-1] > 0){
      lootGet(-1,order[i]);
      i=4;
    }
    i+=1;
  }
}
function sinciroReset(){
  sinciroFuse = 0;
  fused.innerText = "Fused: 0";
  bladeList.style.display = "block";
  necklaceList.style.display = "block";
  bootsList.style.display = "block";
  gobletList.style.display = "block";
  fusedList = [1,2,3,4];
}
function missingToggle(num){
  if (num == 1){
    bladeList.style.display = "none";
    fusedList.splice(fusedList.indexOf(num),1)
  }
  if (num == 2){
    necklaceList.style.display = "none";
    fusedList.splice(fusedList.indexOf(num),1)
  }
  if (num == 3){
    bootsList.style.display = "none";
    fusedList.splice(fusedList.indexOf(num),1)
  }
  if (num == 4){
    gobletList.style.display = "none";
    fusedList.splice(fusedList.indexOf(num),1)
  }
}
function questionMarkToggle(num){
  if (num == 1){
    unOne.innerText = "?";
    bladeList.innerText = "Blade ?";
  }
  if (num == 2){
    unTwo.innerText = "?";
    necklaceList.innerText = "Necklace ?";
  }
  if (num == 3){
    unThree.innerText = "?";
    bootsList.innerText = "Boots ?";
  }
  if (num == 4){
    unFour.innerText = "?";
    gobletList.innerText = "Goblet ?";
  }
}
function uniqueCount(){
  var count = 0;
  for (loot in lootList){
    if (lootList[loot]>0){
      count+=1;
    }
  }
  return count;
}
function checkIfValid(){
  for (loot in fusedList){
    if(lootList[fusedList[loot]-1] < 1){
      return false;
    }
  }
  return true;
}
function isIn(number,listInput){
  var i = 0;
  while (i<listInput.length){
    if(listInput[i] == number){
      return true;
    }
    i+=1;
  }
  return false;
}