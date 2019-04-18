

function drawAxes(layout){
  push();
  stroke(0);
  strokeWeight(2);
  //draw horizontal line
  line(
    layout.leftMargin,
    layout.bottomMargin,
    layout.rightMargin,
    layout.bottomMargin,
  );
  //draw vertical line
  line(
    layout.leftMargin,
    layout.topMargin,
    layout.leftMargin,
    layout.bottomMargin,
  );
  pop();
}

function drawYAxisLabels(min, max, layout, mapFunction, decimalPlaces) {
  // Map function must be passed with .bind(this).
  var range = max - min ;
  var yTickStep = range / layout.numYTickLabels;

  fill(0);
  noStroke();
  textAlign('right', 'center');

  // Draw all axis tick labels and grid lines.
  for (i = 0; i <= layout.numYTickLabels; i++) {
    var value = min + (i * yTickStep);
    var y = mapFunction(value);

    text(shrinkNum(value),
         layout.leftMargin - layout.pad,
         y);

    if (layout.grid) {
      // Add grid line.
      stroke(200);
      line(layout.leftMargin, y, layout.rightMargin, y);
    }
  }
}
//
function drawTitle (title,layout) {
  push();
  fill(0);
  noStroke();
  textAlign('center', 'center');
  // debugger;
  text(title,
       (layout.plotWidth() / 2) + layout.leftMargin,
       layout.topMargin - (layout.marginSize / 2)
     );
  pop();
};
//
//
function drawEllipse(x, y, radius, mapFunctionX, mapFunctionY){
  x = mapFunctionX(x);
  y = mapFunctionY(y);
  ellipse(x, y, radius * 2);
}
//
function drawXAxisLabel(value, layout, mapFunction) {
  // Map function must be passed with .bind(this).
  var x = mapFunction(value);

  fill(0);
  noStroke();
  textAlign('center', 'center');

  // Add tick label.
  text(value,
       x,
       layout.bottomMargin + layout.marginSize / 2 + layout.pad * 2);

  if (layout.grid) {
    // Add grid line.
    stroke(220);
    line(x,
         layout.topMargin,
         x,
         layout.bottomMargin);
  }
}
//
function shrinkNum(number) {
    // 2 decimal places => 100, 3 => 1000, etc
    var decPlaces = Math.pow(10,2);

    // Enumerate number abbreviations
    var letter = [ "k", "m", "b", "t" ];

    // Go through the array backwards, so we do the largest first
    for (var i = letter.length-1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {

             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += letter[i];

             // We are done... stop
             break;
        }
    }

    return number;
}

//