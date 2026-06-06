var pokemon;
var dex;
var speed;
var ability2poke;
var move2poke;
var movestatus2poke;
var regulation = "M-A";
var regulationText = "M-A";
var listID;
var listText;
var searchIDPrefix;
var lastSearchWord;
var onlyLastEvo;
var useChoiceItem;
var choiceMinVal;
var choiceMaxVal;

document.getElementById("main-display-area").style.display ="none";

readCSVData('db/ダメージ計算 - def_pokemon.csv', OnParsePokemonData, OnGaDataFailed);
readCSVData('db/ダメージ計算 - def_dex_paldea.csv', OnParseDexData, OnGaDataFailed);
readCSVData('db/ダメージ計算 - list_speed.csv', OnParseSpeedData, OnGaDataFailed);
readCSVData('db/ダメージ計算 - list_ability2poke.csv', OnParseAbility2PokeData, OnGaDataFailed);
readCSVData('db/ダメージ計算 - list_move2poke.csv', OnParseMove2PokeData, OnGaDataFailed);
readCSVData('db/ダメージ計算 - list_movestatus2poke.csv', OnParseMoveStatus2PokeData, OnGaDataFailed);

//google.script.run.withSuccessHandler(OnParsePokemonData).withFailureHandler(OnGaDataFailed).getPokemonData();
//google.script.run.withSuccessHandler(OnParseDexData).withFailureHandler(OnGaDataFailed).getDexData();
//google.script.run.withSuccessHandler(OnParseSpeedData).withFailureHandler(OnGaDataFailed).getSpeedData();

var pokeDataLoaded = false;
var dexDataLoaded = false;
var speedDataLoaded = false;
var ability2pokeLoaded = false;
var move2pokeLoaded = false;
var movestatus2pokeLoaded = false;
var pokeID2dexID = [];

function Result(data)
{
  alert( "callbacked" );
}
function OnParseAbility2PokeData(data)
{
  ability2poke = data;
  ability2pokeLoaded = true;
  CheckDisplay();
}
function OnParseMove2PokeData(data)
{
  move2poke = data;
  move2pokeLoaded = true;
  CheckDisplay();
}
function OnParseMoveStatus2PokeData(data)
{
  movestatus2poke = data;
  movestatus2pokeLoaded = true;
  CheckDisplay();
}
function OnParsePokemonData(data)
{
  pokemon = data;
  pokeDataLoaded = true;
  CheckDisplay();
}

function OnParseDexData(data)
{
  dex = data;
  dexDataLoaded = true;
  /*
  var dataList = document.getElementById('pokenames');
  for (const d of dex)
  {
    var option = document.createElement('option');
    option.value = d[0];
    dataList.appendChild(option);
  }
  */
  CheckDisplay();
}

function OnParseSpeedData(data)
{
  speed = data;
  speedDataLoaded = true;
  CheckDisplay();
}

function InitRegulation(selector)
{
  const idx = selector.selectedIndex;
  const value = selector.options[idx].value;
  const text  = selector.options[idx].text;
  regulation = value;
  regulationText = text;
}
function InitList(selector)
{
  const idx = selector.selectedIndex;
  const value = selector.options[idx].value;
  const text  = selector.options[idx].text;
  listID = value;
  listText = text;
}
function InitLastEvo(obj)
{
  onlyLastEvo = obj.checked;
}
function InitChoice(obj)
{
  useChoiceItem = obj.checked;
}

function UpdateOptions()
{
  const selectorRegulation = document.getElementById("SelectorRegulation");
  InitRegulation(selectorRegulation);
  const selectorList = document.getElementById("SelectorList");
  InitList(selectorList);
  const checkboxEvo = document.getElementById("CheckboxOptionEvo");
  InitLastEvo(checkboxEvo);
  const checkboxChoice = document.getElementById("CheckboxOptionChoice");
  InitChoice(checkboxChoice);
}

function Initialize()
{
  var slider = document.getElementById('slider');
  noUiSlider.create(slider, {
      start: [80, 110],
      connect: true,
      range: {
          'min': 0,
          'max': 200
      }
  });
  var min = document.getElementById('min-box');
  var max = document.getElementById('max-box');
  slider.noUiSlider.on('update', function( values, handle ) {
    var value = Math.floor(values[handle]);
    if ( handle ) {
      max.value = value;
      choiceMaxVal = value;
    } else {
      min.value = value;
      choiceMinVal = value;
    }
    UpdateTable();
  });
  min.onchange = function(){
    slider.noUiSlider.set([this.value, null]);
    choiceMinVal = this.value;
    UpdateTable();
  };
  max.onchange = function(){
    slider.noUiSlider.set([null, this.value]);
    choiceMaxVal = this.value;
    UpdateTable();
  };

  UpdateTable();
}

function CheckDisplay()
{
    var initialized = pokeDataLoaded && dexDataLoaded && speedDataLoaded && ability2pokeLoaded && move2pokeLoaded && movestatus2pokeLoaded;
    if (initialized)
    {
      document.getElementById("main-display-area").style.display ="block";
      document.getElementById("loading-area").style.display ="none";
      Initialize();
    }
}

function OnGaDataFailed()
{
  alert("GAの読み込みに失敗しました.");
}

function getRegulationIndex()
{
  const regID = (regulation == "M-A") ? 11
  : (regulation == "F") ? 11
  : (regulation == "D") ? 0
  : (regulation == "C") ? 1
  : (regulation == "B") ? 2
  : (regulation == "A") ? 3
  : (regulation == "INDIGO") ? 10
  : (regulation == "TEAL") ? 6
  : (regulation == "TRICK") ? 8
  : (regulation == "DRAGON") ? 9
  : (regulation == "E") ? 7
  : (regulation == "G") ? 12
  : (regulation == "G_LEGEND") ? 13
  : (regulation == "H") ? 14
  : (regulation == "STAR") ? 15
  : 11;
  return regID;
}

function InnerSetupSearchList(searchword, listData)
{
  searchIDPrefix = "row-";
  var search = document.getElementById("poke-search");
  search.setAttribute("placeholder", searchword + "名で検索");

  //var parent = document.getElementById("main-content-area");
  var parent = document.getElementById("pokelist");
  
  var tmp = document.createDocumentFragment();

  var table = document.createElement("table");
  table.setAttribute("class", "table table-hover table-striped");
  {
    var thead = document.createElement("thead");
    {
      var tr = document.createElement("tr");
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = searchword;
        tr.appendChild(th);
      }
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = "ポケモン";
        tr.appendChild(th);
      }
      thead.appendChild(tr);
    }
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    tbody.setAttribute("id", "poke-list-body");

    for (const data of listData)
    {
      const text = data[1];
      const pokeIDsStr = data[3 + getRegulationIndex()];
      if (pokeIDsStr == "") continue;
  
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = text;
      th.setAttribute("id", "row-" + text);
      tr.appendChild(th);
  
      var tdPoke = document.createElement("td");
  
      if (text == "まもる" || text == "テラバースト")
      {
        const koiking = GetPokemon(161);
        const metamon = GetPokemon(164);
        const iconKoiking = getPokeIconElement(koiking);
        const iconMetamon = getPokeIconElement(metamon);
        tdPoke.appendChild(iconKoiking);
        tdPoke.appendChild(iconMetamon);
        var postText = document.createElement("a");
        postText.textContent = "以外";
        tdPoke.appendChild(postText);
      }
      else
      {
        const pokeIDs = pokeIDsStr.split(',');
        for (const pokeID of pokeIDs)
        {
          const poke = GetPokemon(pokeID);

          if (onlyLastEvo && poke.hasEvo) continue;

          const icon = getPokeIconElement(poke);
          tdPoke.appendChild(icon);
        }
      }
      tr.appendChild(tdPoke);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
  }
  tmp.appendChild(table);
  parent.appendChild(tmp);
}

function InnerSetupAvailable(searchword)
{
  searchIDPrefix = "pm-";
  var search = document.getElementById("poke-search");
  search.setAttribute("placeholder", searchword + "名で検索");

  var pokelisNode = document.getElementById("pokelist");

  var table = document.createElement("table");
  table.setAttribute("class", "table table-hover table-striped");
  table.setAttribute("id", "speed-table");
  if (regulation == "TEAL")
  {
    table.classList.add("teal");
  }
  else if (regulation == "INDIGO")
  {
    table.classList.add("indigo");
  }
  else if (regulation == "TRICK")
  {
    table.classList.add("trickmagick");
  }
  {
    var thead = document.createElement("thead");
    {
      var tr = document.createElement("tr");
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = "#";
        tr.appendChild(th);
      }
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = regulationText+"ポケモン";
        tr.appendChild(th);
      }
      thead.appendChild(tr);
    }

    var tbody = document.createElement("tbody");
    var gens = [1,2,3,4,5,6,7,8,8.5,9];
    for (const gen of gens)
    {
      var idtex = "list-available-" + gen; 
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.setAttribute("scope", "row");
      th.textContent = gen;
      var td = document.createElement("td");
      td.setAttribute("id", idtex);
      td.textContent = "";
      tr.appendChild(th);
      tr.appendChild(td);
      tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
  }
  pokelisNode.appendChild(table);

  for (const d of dex)
  {
    const dexID = d[0];
    const pokeID = d[2];
    if (!CheckAvailable(dexID)) continue;

    const p = GetPokemon(pokeID);

    if (onlyLastEvo && p.hasEvo) continue;

    const idtex = "list-available-" + p.gen;
    var parent = document.getElementById(idtex);

    var icon = getPokeIconElement(p);

    parent.appendChild(icon);
  }
}

function SetupTable()
{
  // クリーン    
  var oldNode = document.getElementById("pokelist");
  var pokelisNode = oldNode.cloneNode(false);
  oldNode.parentNode.replaceChild(pokelisNode, oldNode);

  switch (listID)
  {
    case "AVAILABLE":
      InnerSetupAvailable("ポケモン");
      break;
    case "SPEED":
      InnerSetupSpeedList("ポケモン");
      break;
    case "ABILITY":
      InnerSetupSearchList("とくせい", ability2poke);
      break;
    case "MOVE_ATTACK":
      InnerSetupSearchList("わざ", move2poke);
      break;
    case "MOVE_STATUS":
      InnerSetupSearchList("わざ", movestatus2poke);
      break;
    default:
      break;
  }
}

function getPokeIconElement(poke)
{
  var link = document.createElement("a");
  link.href = 'https://yakkun.com/sv/zukan/' + poke.tetteiID;
  var img = document.createElement("div");
  img.setAttribute("class", "icon-" + poke.iconName);
  img.setAttribute("style", "display: inline-block;");
  img.setAttribute("loading", "lazy");
  img.setAttribute("id", "pm-" + poke.name);
  link.appendChild(img);
  return link;
}

function CheckAvailable(dexID)
{
  const d = dex[dexID];
  if (!d) return false;
  const regID = getRegulationIndex() + 3;
  return (d[regID] == "X") ? false : true;
}

function GetPokemon(pokeID)
{
  const p = pokemon[pokeID];
  const poke = {
    pokeID: pokeID,
    name: p[11],
    gen: p[4],
    hasEvo: (p[27] > 0) ? true : false,
    iconName: p[28],
    iconID: p[29],
    tetteiID: p[30]
  }
  return poke;
}

function InnerSetupSpeedList(searchword)
{
  searchIDPrefix = "pm-";
  var search = document.getElementById("poke-search");
  search.setAttribute("placeholder", searchword + "で検索");

  //var parent = document.getElementById("main-content-area");
  var parent = document.getElementById("pokelist");
  
  var table = document.createElement("table");
  table.setAttribute("content-visibility", "auto");
  table.setAttribute("contain-intrinsic-size", "500px");
  table.setAttribute("class", "table table-hover table-striped");
  {
    var thead = document.createElement("thead");
    {
      var tr = document.createElement("tr");
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = "実数";
        tr.appendChild(th);
      }
      {
        var th = document.createElement("th");
        th.setAttribute("scope", "col");
        th.textContent = "ポケモン";
        tr.appendChild(th);
      }
      thead.appendChild(tr);
    }

    var lastVal = 999;
    var lastTd;
    var lastPrefix;
    var tbody = document.createElement("tbody");
    for (const s of speed)
    {
      const pokeID = s[1];
      const dexID = s[2];
      if (!CheckAvailable(dexID)) continue;

      const poke = GetPokemon(pokeID);

      if (onlyLastEvo && poke.hasEvo) continue;

      const pokeWarming = s[3];
      const pokeBoost = s[4];
      const pokeStat = parseInt(s[5]);
      const pokeRank = parseInt(s[6]);
      const pokeVal = parseInt(s[7]);

      var prefix = pokeWarming + pokeStat + "族";
      prefix += (pokeRank > 0) ? "(" +  pokeBoost + "+" + pokeRank + ")" : "";
      if (useChoiceItem)
      {
        if (pokeBoost == "スカーフ" && (pokeStat < choiceMinVal || choiceMaxVal < pokeStat)) continue;
        prefix += (pokeBoost == "スカーフ" || pokeBoost == "鉄球") ? "(" + pokeBoost + ")" : "";
      }
      else if (pokeBoost == "スカーフ" || pokeBoost == "鉄球")
      {
        continue;
      }
      if (pokeVal < lastVal)
      {
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.textContent = pokeVal;

        var tdPoke = document.createElement("td");
        tdPoke.setAttribute("id", "speed-" + pokeVal);
        tdPoke.textContent = prefix;
        
        var icon = getPokeIconElement(poke);
        tdPoke.appendChild(icon);

        tr.appendChild(th);
        tr.appendChild(tdPoke);
        tbody.appendChild(tr);
        lastVal = pokeVal;
        lastTd = tdPoke;
        lastPrefix = prefix;
      }
      else
      {
        if (lastPrefix != prefix)
        {
          var tex = document.createElement("a");
          tex.textContent = "  " + prefix;
          lastTd.appendChild(tex);
          lastPrefix = prefix;
        }

        var icon = getPokeIconElement(poke);
        lastTd.appendChild(icon);
      }
    }

    table.appendChild(thead);
    table.appendChild(tbody);
  }
  parent.appendChild(table);
}

function TableLoader(isLoading)
{
  if (isLoading)
  {
    document.getElementById("pokelist").style.display ="none";
    document.getElementById("loader").style.display ="block";
  }
  else
  {
    document.getElementById("pokelist").style.display ="block";
    document.getElementById("loader").style.display ="none";
  }
}

function UpdateTable()
{
  TableLoader(true);
  UpdateOptions();
  SetupTable();
  $(document).ready(function () {
    TableLoader(false);
  });
}

function OnChangeRegulation(obj)
{
  InitRegulation(obj);
  UpdateTable();
}

function OnChangeList(obj)
{
  InitList(obj);
  UpdateTable();
}

function OnChangeOptionEvo(obj)
{
  InitLastEvo(obj);
  UpdateTable();
}

function OnChangeOptionChoice(obj)
{
  InitChoice(obj);
  UpdateTable();
}

function Hilight()
{
  const word = document.getElementById("poke-search").value;
  if (word == undefined) return;

  {
    let targets = document.querySelectorAll(`[id^=`+lastSearchWord+`]`);
    for (var t of targets)
    {
      t.classList.remove("searched");
    }
  }
  {
    const classID = searchIDPrefix + word;
    let targets = document.querySelectorAll(`[id^=`+classID+`]`);
    for (var t of targets)
    {
      t.classList.add("searched");
    }
    targets[0].scrollIntoView();
    lastSearchWord = classID;
  }

  document.getElementById("poke-search").value = "";
}

function OnSearch()
{
  Hilight();
}
