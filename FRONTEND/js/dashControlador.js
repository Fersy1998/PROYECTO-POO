function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
var codigoEmpresa=getCookie("codigoEmpresa");
axios({
    method:'GET',
    url:'../BACKEND/api/empresa.php?id='+codigoEmpresa,
    respType:'json'
})
.then(res=>{
    empresa=res.data;
document.getElementById('nombreEmpresa').innerHTML=`${empresa.nombreEmpresa}`;
})
.catch(error=>{
    console.log(error);
}) 
