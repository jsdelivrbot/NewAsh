module.exports = {
    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    },
    declOfNum: function(number,titles){
        let cases = [2, 0, 1, 1, 1, 2];  
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },
    randomInteger: function(min,max){
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    },
    leven: function(s1,s2,costs) {
        var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
        l1 = s1.length;
        l2 = s2.length;
    
        costs = costs || {};
        var cr = costs.replace || 1;
        var cri = costs.replaceCase || costs.replace || 1;
        var ci = costs.insert || 1;
        var cd = costs.remove || 1;
    
        cutHalf = flip = Math.max(l1, l2);
    
        var minCost = Math.min(cd, ci, cr);
        var minD = Math.max(minCost, (l1 - l2) * cd);
        var minI = Math.max(minCost, (l2 - l1) * ci);
        var buf = new Array((cutHalf * 2) - 1);
    
        for (i = 0; i <= l2; ++i) {
            buf[i] = i * minD;
        }
    
        for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
            ch = s1[i];
            chl = ch.toLowerCase();
    
            buf[flip] = (i + 1) * minI;
    
            ii = flip;
            ii2 = cutHalf - flip;
    
            for (j = 0; j < l2; ++j, ++ii, ++ii2) {
                cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
                buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
            }
        }
        return buf[l2 + cutHalf - flip];
    },
    queues: function (queue) {
        var all = {
            // 'conquest5v5' : 423,
            // 'novicequeue' : 424,
            'conquest' : 426,
            // 'practice' : 427,
            // 'conquestchallenge' : 429,
            'conquestranked' : 430,
            'domination' : 433,
            // 'motd1' : 434,
            'arena' : 435,
            // 'arenachallenge' : 438,
            // 'dominationchallenge' : 439,
            'joustranked' : 440,
            // 'joustchallenge' : 441,
            'assault' : 445,
            // 'assaultchallenge' : 446,
            'joust' : 448,
            'joustranked' : 450,
            'conquestranked' : 451,
            // 'arenaleague' : 452,
            // 'motd2' : 465,
            'siege' : 459,
            'clash' : 466,
            // 'clashchallenge' : 467
            };
        if(queue){
            return all[queue];
        }else{
            return all;
        }
    }
  };
  
