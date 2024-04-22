let cont = document.getElementsByClassName("editor")[0];

function ChangeSizeEvent(size) {
  let text = document.getElementsByClassName("TextSize")[0];
  text.value = size;
  cont.style.fontSize = size + 'px';
}
function ChangeFontEvent(font) {
  let text = document.getElementsByClassName("FontFamily")[0];
  text.value = font;
  cont.style.fontFamily = font;
}

BoldTextEventFlag = 0;
function BoldTextEvent()
{
  let text = document.getElementById("bold");
  if(BoldTextEventFlag == 1)
  {
    cont.style.fontWeight = "normal";
    text.style.backgroundColor = "lightgray";
    BoldTextEventFlag = 0;
  }
  else{
    cont.style.fontWeight = "bold";
    text.style.backgroundColor = "lightblue";
    BoldTextEventFlag = 1;
  }
  text.style.border = "none";
}

ItalicTextEventFlag = 0;
function ItalicTextEvent()
{
  let text = document.getElementById("italic");
  if(ItalicTextEventFlag == 1)
  {
    cont.style.fontStyle = "normal";
    text.style.backgroundColor = "lightgray";
    ItalicTextEventFlag = 0;
  }
  else{
    cont.style.fontStyle = "italic";
    text.style.backgroundColor = "lightblue";
    ItalicTextEventFlag = 1;
  }
  text.style.border = "none";
}


UnderscoreTextEventFlag = 0;
function UnderscoreTextEvent()
{
  let text = document.getElementById("underscore");
  if(UnderscoreTextEventFlag == 1)
  {
    cont.style.textDecoration = "initial";
    text.style.backgroundColor = "lightgray";
    UnderscoreTextEventFlag = 0;
  }
  else{
    cont.style.textDecoration = "underline";
    text.style.backgroundColor = "lightblue";
    UnderscoreTextEventFlag = 1;
  }
  text.style.border = "none";
}

function ChangeAlignEvent(value)
{
  cont.style.textAlign = value;
}

