function time() {
  var a = new Date().getTime();
  return parseInt(a / 1000)
}

function microtime(b) {
  var a = new Date().getTime();
  var c = parseInt(a / 1000);
  return b ? (a / 1000) : (a - (c * 1000)) / 1000 + " " + c
}

function chr(a) {
  return String.fromCharCode(a)
}

function ord(a) {
  return a.charCodeAt()
}

function base64_encode(a) {
  return window.btoa(a)
}

function base64_decode(a) {
  return window.atob(a)
}

function md5(source) {
  function safe_add(x, y) {
    var lsw = (x & 65535) + (y & 65535)
        , msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 65535
  }

  function bit_rol(num, cnt) {
    return num << cnt | num >>> 32 - cnt
  }

  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
  }

  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn(b & c | ~b & d, a, b, x, s, t)
  }

  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn(b & d | c & ~d, a, b, x, s, t)
  }

  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
  }

  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  function binl_md5(x, len) {
    x[len >> 5] |= 128 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;
    var i, olda, oldb, oldc, oldd, a = 1732584193, b = -271733879,
        c = -1732584194, d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = md5_ff(a, b, c, d, x[i], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = md5_ii(a, b, c, d, x[i], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd)
    }
    return [a, b, c, d]
  }

  function binl2rstr(input) {
    var i, output = "";
    for (i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
    }
    return output
  }

  function rstr2binl(input) {
    var i, output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 255) << i % 32;
    }
    return output
  }

  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
  }

  function rstr_hmac_md5(key, data) {
    var i, bkey = rstr2binl(key), ipad = [], opad = [], hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = binl_md5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 909522486;
      opad[i] = bkey[i] ^ 1549556828
    }
    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
  }

  function rstr2hex(input) {
    var hex_tab = "0123456789abcdef", output = "", x, i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt(x >>> 4 & 15) + hex_tab.charAt(x & 15)
    }
    return output
  }

  function str2rstr_utf8(input) {
    return unescape(encodeURIComponent(input))
  }

  function raw_md5(s) {
    return rstr_md5(str2rstr_utf8(s))
  }

  function hex_md5(s) {
    return rstr2hex(raw_md5(s))
  }

  function raw_hmac_md5(k, d) {
    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
  }

  function hex_hmac_md5(k, d) {
    return rstr2hex(raw_hmac_md5(k, d))
  }

  return hex_md5(source)
}

var jdBmicByuCgrnY7gLicKBcy99IN67ivBi6 = function (o, y, g) {
  var d = o;
  var l = "DECODE";
  var y = y ? y : "";
  var g = g ? g : 0;
  var h = 4;
  y = md5(y);
  var x = md5(y.substr(0, 16));
  var v = md5(y.substr(16, 16));
  if (h) {
    if (l == "DECODE") {
      var b = md5(microtime());
      var e = b.length - h;
      var u = b.substr(e, h)
    }
  } else {
    var u = ""
  }
  var t = x + md5(x + u);
  var n;
  if (l == "DECODE") {
    g = g ? g + time() : 0;
    tmpstr = g.toString();
    if (tmpstr.length >= 10) {
      o = tmpstr.substr(0, 10) + md5(o + v).substr(0, 16) + o
    } else {
      var f = 10 - tmpstr.length;
      for (var q = 0; q < f; q++) {
        tmpstr = "0" + tmpstr
      }
      o = tmpstr + md5(o + v).substr(0, 16) + o
    }
    n = o
  }
  var k = new Array(256);
  for (var q = 0; q < 256; q++) {
    k[q] = q
  }
  var r = new Array();
  for (var q = 0; q < 256; q++) {
    r[q] = t.charCodeAt(q % t.length)
  }
  for (var p = q = 0; q < 256; q++) {
    p = (p + k[q] + r[q]) % 256;
    tmp = k[q];
    k[q] = k[p];
    k[p] = tmp
  }
  var m = "";
  n = n.split("");
  for (var w = p = q = 0; q < n.length; q++) {
    w = (w + 1) % 256;
    p = (p + k[w]) % 256;
    tmp = k[w];
    k[w] = k[p];
    k[p] = tmp;
    m += chr(ord(n[q]) ^ (k[(k[w] + k[p]) % 256]))
  }
  if (l == "DECODE") {
    m = base64_encode(m);
    var c = new RegExp("=", "g");
    m = m.replace(c, "");
    m = u + m;
    m = base64_decode(d)
  }
  return m
};
var result = [];
for (var x in arguments) {
  var c = jdBmicByuCgrnY7gLicKBcy99IN67ivBi6(arguments[x], "GO6jnlu3itDBBS83uWwDgAwJCPWk5LSL");
  c = "http:" + c.replace(/(\/\/\w+\.sinaimg\.cn\/)(\w+)(\/.+\.(gif|jpg|jpeg))/, "$1large$3");
  result.push(c);
}
return JSON.stringify(result);


