function rand(min, max) {	// Generate a random integer
   // +   original by: Leslie Hoare
   if (max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
   } else {
      return Math.floor(Math.random() * (min + 1));
   }
}

function str_replace(search, replace, subject) {
   return subject.split(search).join(replace);
}

function shuffle( array ) {	// Shuffle an array
   //
   // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)

   for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
   return true;
}

function in_array(needle, haystack, strict) {	// Checks if a value exists in an array
   //
   // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

   var found = false, key, strict = !!strict;

   for (key in haystack) {
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
         found = true;
         break;
      }
   }

   return found;
}

