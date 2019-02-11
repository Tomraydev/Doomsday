$( document ).ready(function() {


  var date = new Date();
  $('#day').val( date.getDate() );
  $('#month').val( date.getMonth() + 1 );
  $('#year').val( date.getFullYear() );

  function getWeekDay(day, month, year) {
    day = parseInt(day);
    month = parseInt(month);
    year = parseInt(year);

    if (year < 1582) {
      return "The Gregorian calendar was first introduced in 1582. Please choose a later year.";
    }
    if ( month < 1 || month > 12) {
      return "Please enter a valid month (1-12)";
    }
    if ( day < 1 || day > 31) {
      return "Please enter a valid day";
    }

    // Determining if it's a leap year
    if ( year % 4 == 0 && year % 100 != 0) {
      isLeap = true;
    }
    else if ( year % 400 == 0){
      isLeap = true;
    }
    else {
      isLeap = false;
    }
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11:
        maxDay = 30;
        break;
      case 2:
        if (isLeap) {
          maxDay = 29;
        } else {
          maxDay = 28;
        }
        break;
      default:
        maxDay = 31;
    }
    if (day > maxDay) {
      return "Please enter a valid day";
    }
    // Getting the Anchor Day
    century = ( (year - (year % 100) ) / 100) + 1;
    switch (century % 4) {
      case 0:
          anchorDay = 3;
          break;
      case 1:
          anchorDay = 2;
          break;
      case 2:
          anchorDay = 0;
          break;
      case 3:
          anchorDay = 5;
          break;
    }

    // Getting the doomsday
    doomsday = year % 100;
    if (doomsday % 2 == 1) {
      doomsday += 11;
    }
    doomsday = doomsday/2;
    if (doomsday % 2 == 1) {
      doomsday += 11;
    }

    doomsday = doomsday % 7;
    doomsday = 7 - doomsday;
    doomsday = (anchorDay + doomsday) % 7;

    // Determining the day number
    dayNum = day;
    switch (month) {
      case 1:
          dayNum = dayNum;
          break;
      case 2:
          dayNum = dayNum + 31;
          break;
      case 3:
          dayNum = dayNum + 31+28;
          break;
      case 4:
          dayNum = dayNum + 31+28+31;
          break;
      case 5:
          dayNum = dayNum + 31+28+31+30;
          break;
      case 6:
          dayNum = dayNum + 31+28+31+30+31;
          break;
      case 7:
          dayNum = dayNum + 31+28+31+30+31+30;
          break;
      case 8:
          dayNum = dayNum + 31+28+31+30+31+30+31;
          break;
      case 9:
          dayNum = dayNum + 31+28+31+30+31+30+31+31;
          break;
      case 10:
          dayNum = dayNum + 31+28+31+30+31+30+31+31+30;
          break;
      case 11:
          dayNum = dayNum + 31+28+31+30+31+30+31+31+30+31;
          break;
      case 12:
          dayNum = dayNum + 31+28+31+30+31+30+31+31+30+31+30;
          break;
    }

    // Determining the doomsday number
    if (isLeap == true && month > 2) {
      dayNum +=1;
      doomsDayNum = 95;
    } else {
      doomsDayNum = 94;
    }

    // Getting the day of the week
    if (dayNum < doomsDayNum) {
      dayDiff = (doomsDayNum - dayNum) % 7;
      dayOfWeek = (7 + doomsday - dayDiff) % 7;
    } else {
      dayDiff = (dayNum - doomsDayNum) % 7;
      dayOfWeek = (7 + doomsday + dayDiff) % 7;
    }

    // Returning the day of the week
    switch (dayOfWeek) {
      case 0 :
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      case 6:
        return "Saturday";
        break;
    }
  }

  $("#btn-submit").click(function() {
    var d = $("#day").val();
    var m = $("#month").val();
    var y = $("#year").val();

    var weekDay = getWeekDay(d, m, y);
    $("#weekDayBox").css("display", "inline-block");
    $("#weekDayBox").html(weekDay);
  })
});
