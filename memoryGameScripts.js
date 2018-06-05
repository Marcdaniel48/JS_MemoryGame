/*
 * Marc-Daniel Dialogo
 * 1539756
 */

"use struct";

// All javascript code will be evaluated after the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function() {

  // Places all the img elements of the tile layer into an array
  var arrayOfTiles = document.getElementById("tileLayer").getElementsByTagName("img");
  // Places all the img elements of the middle layer into an array
  var middleLayerArray = document.getElementById("middleLayer").getElementsByTagName("img");

  // Puts all the possible middlel layer image sources into an array
  var arrayOfMidImages = [
      "images/middleLayer/middle_AssassinationClassroom.jpg", "images/middleLayer/middle_AssassinationClassroom.jpg",
      "images/middleLayer/middle_Gintama.jpg", "images/middleLayer/middle_Gintama.jpg",
      "images/middleLayer/middle_KonoSuba.jpg", "images/middleLayer/middle_KonoSuba.jpg",
      "images/middleLayer/middle_LovelyComplex.jpg", "images/middleLayer/middle_LovelyComplex.jpg",
      "images/middleLayer/middle_Monogatari.jpg", "images/middleLayer/middle_Monogatari.jpg",
      "images/middleLayer/middle_OnePunchMan.jpg", "images/middleLayer/middle_OnePunchMan.jpg",
      "images/middleLayer/middle_Raildex.jpg", "images/middleLayer/middle_Raildex.jpg",
      "images/middleLayer/middle_Toradora.png", "images/middleLayer/middle_Toradora.png"];

  // Puts all the possible gameboard/grid background sources into an array
  var bottomLayerBackground = [
      "images/baseBackgrounds/background_Digimon.png",
      "images/baseBackgrounds/background_LittleWitchAcademia.jpg",
      "images/baseBackgrounds/background_Nichijou.jpg",
      "images/baseBackgrounds/background_Totoro.jpg",
      "images/baseBackgrounds/background_Yotsubato.jpg"];

  // Keeps track of the number of selected tiles, the first and second selected tiles, and
  // has an index for setting the background of the gameboard/grid
  var game = {
  numSelectedTiles: 0,
  selectedTile1: undefined,
  selectedTile2: undefined,
  backgroundIndex: 0};

  /**
  * Function that handles the event where a tile is clicked on.
  * When a tile is clicked on, the tile will become hidden, showing the
  * images under it.
  * Then, the evaluateTiles function is called after a short delay.
  * @param {*} e - The event itself
  */
  function selectTile(e)
  {
    if(game.numSelectedTiles < 2)
    {
      e.target.style.visibility = "hidden";

      if(game.numSelectedTiles == 0)
      {
        game.selectedTile1 = e.target.className;
      }
      else if(game.numSelectedTiles == 1)
      {
        game.selectedTile2 = e.target.className;
      }
      game.numSelectedTiles++;
    }

    /**
     * Checks to see if two tiles have been clicked on, and if two tiles have been selected,
     * checks to see if the images under the two tiles are the same.
     * If the two images under the two selected tiles are the same, then the tiles will remain hidden.
     * If the two images under the two selected tiles are not the same, then the tiles will become visible again.
     */
    function evaluateTiles()
    {
      if(game.numSelectedTiles == 2)
      {
        game.numSelectedTiles = 0;

        if(document.getElementById("middleLayer").getElementsByClassName(game.selectedTile1)[0].src == document.getElementById("middleLayer").getElementsByClassName(game.selectedTile2)[0].src)
        {
          document.getElementById("middleLayer").getElementsByClassName(game.selectedTile1)[0].style.visibility = "hidden";
          document.getElementById("middleLayer").getElementsByClassName(game.selectedTile2)[0].style.visibility = "hidden";
        }
        else
        {
          document.getElementById("tileLayer").getElementsByClassName(game.selectedTile1)[0].style.visibility = "visible";
          document.getElementById("tileLayer").getElementsByClassName(game.selectedTile2)[0].style.visibility = "visible";
        }
      }
    }
    window.setTimeout(evaluateTiles, 2000);
  }


  /**
   * Function that handles the event where a tile is selected through a keydown event.
   * When a tile is selected, the tile will become hidden, showing the
   * images under it.
   * Then, the evaluateTiles function is called after a short delay.
   * @param {*} e - The event itself
   */
  function selectTileKeydown(e)
  {
      var keyLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
      for(var i = 0; i < keyLetters.length; i++)
      {
        if(e.code == "Key"+keyLetters[i])
        {
          validKey(document.getElementsByClassName("letter"+keyLetters[i])[1]);
        }
      }

      /**
       * Makes the currently selected tile hidden.
       * Notes if it's the first or second selected tile of the turn.
       * @param {*} pressedTile - The currently selected tile, selected through a keydown event
       */
      function validKey(pressedTile)
      {

        if(game.numSelectedTiles < 2)
        {
          pressedTile.style.visibility = "hidden";

          if(game.numSelectedTiles == 0)
          {
            game.selectedTile1 = pressedTile.className;
          }
          else if(game.numSelectedTiles == 1)
          {
            game.selectedTile2 = pressedTile.className;
          }
          game.numSelectedTiles++;
      }

      /**
       * Tweaked for keydown event.
       *
       * Checks to see if two tiles have been clicked on, and if two tiles have been selected,
       * checks to see if the images under the two tiles are the same.
       * If the two images under the two selected tiles are the same, then the tiles will remain hidden.
       * If the two images under the two selected tiles are not the same, then the tiles will become visible again.
       */
      function evaluateTiles()
      {
        if(game.numSelectedTiles == 2)
        {
          game.numSelectedTiles = 0;

          if(document.getElementById("middleLayer").getElementsByClassName(game.selectedTile1)[0].src == document.getElementById("middleLayer").getElementsByClassName(game.selectedTile2)[0].src)
          {
            document.getElementById("middleLayer").getElementsByClassName(game.selectedTile1)[0].style.visibility = "hidden";
            document.getElementById("middleLayer").getElementsByClassName(game.selectedTile2)[0].style.visibility = "hidden";
          }
          else
          {
            document.getElementById("tileLayer").getElementsByClassName(game.selectedTile1)[0].style.visibility = "visible";
            document.getElementById("tileLayer").getElementsByClassName(game.selectedTile2)[0].style.visibility = "visible";
          }
        }
      }
      window.setTimeout(evaluateTiles, 2000);
    }
  }


  // Gives each tile an event listener that handles a click event
  for(var i = 0; i < arrayOfTiles.length; i++)
  {
  	arrayOfTiles[i].addEventListener("click", selectTile);
  }
  document.body.addEventListener("keydown", selectTileKeydown);


  /**
   * Randomizes the images of the middle layer, using the arrayOfMidImagesArray.
   */
  function middleRandomizer()
  {
  	for(var i = 0; i < middleLayerArray.length; i++)
  	{
      var imageIndex = Math.floor(Math.random()*arrayOfMidImages.length);

      while(arrayOfMidImages[imageIndex] == "")
      {
  		  imageIndex = Math.floor(Math.random()*arrayOfMidImages.length);
      }

      middleLayerArray[i].src = arrayOfMidImages[imageIndex];
      arrayOfMidImages[imageIndex] = "";
  	}

    arrayOfMidImages = [
        "images/middleLayer/middle_AssassinationClassroom.jpg", "images/middleLayer/middle_AssassinationClassroom.jpg",
        "images/middleLayer/middle_Gintama.jpg", "images/middleLayer/middle_Gintama.jpg",
        "images/middleLayer/middle_KonoSuba.jpg", "images/middleLayer/middle_KonoSuba.jpg",
        "images/middleLayer/middle_LovelyComplex.jpg", "images/middleLayer/middle_LovelyComplex.jpg",
        "images/middleLayer/middle_Monogatari.jpg", "images/middleLayer/middle_Monogatari.jpg",
        "images/middleLayer/middle_OnePunchMan.jpg", "images/middleLayer/middle_OnePunchMan.jpg",
        "images/middleLayer/middle_Raildex.jpg", "images/middleLayer/middle_Raildex.jpg",
        "images/middleLayer/middle_Toradora.png", "images/middleLayer/middle_Toradora.png"];
  }
  middleRandomizer();


  /**
   * Sets a background for the gameboard/grid
   */
  function gridBackgroundSetter()
  {
    if(game.backgroundIndex == (bottomLayerBackground.length - 1))
    {
      game.backgroundIndex = 0;
    }
    else
    {
      game.backgroundIndex++;
    };

    document.getElementById("middleLayer").style.backgroundImage = "url(" + bottomLayerBackground[game.backgroundIndex] + ")";
  }
  gridBackgroundSetter();


  /**
   * when the "New Game" button is clicked:
   * Makes all tiles visible again, randomizes the middle layer, sets the gameboard background,
   * with the help of the middleRandomizer & gridBackgroundSetter functions.
   * Also, resets the selected tiles
   */
  function newGameBtn()
  {
    for(var i = 0; i < arrayOfTiles.length; i++)
    {
      arrayOfTiles[i].style.visibility = "visible";
      middleLayerArray[i].style.visibility = "visible";
    }

    middleRandomizer();
    gridBackgroundSetter();

    game.numSelectedTiles = 0;
    game.selectedTile1 = undefined;
    game.selectedTile2 = undefined;
  }
  document.getElementById("newGame").addEventListener("click", newGameBtn);


  /**
   * When the "End Game" button is clicked:
   * Reveals the background of the grid, by making all of the tiles and middle layer images hidden
   */
  function endGameBtn()
  {
    for(var i = 0; i < arrayOfTiles.length; i++)
    {
      arrayOfTiles[i].style.visibility = "hidden";
      middleLayerArray[i].style.visibility = "hidden";
    }
  }
  document.getElementById("endGame").addEventListener("click", endGameBtn);

});
