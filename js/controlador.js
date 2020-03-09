var btnabrirpopupproducto=document.getElementById('btn-abrir-producto-detalle'),
    overlayproducto=document.getElementById('overlay-producto-detalle'),
    popupproducto=document.getElementById('popup-producto-detalle'),
    btncerrarproducto=document.getElementById('btn-cerrar-producto-detalle');

btnabrirpopupproducto.addEventListener('click', function(){
    overlayproducto.classList.add('active');
    document.log("se logró");
})

btncerrarproducto.addEventListener('click', function(){
    overlayproducto.classList.remove('active');
})

var btnabrirpopupcomprador=document.getElementById('btn-abrirpopupcomprador'),
    overlaycomprador=document.getElementById('overlay-comprador'),
    popupcomprador=document.getElementById('popup-comprador'),
    btncerrarcomprador=document.getElementById('btn-cerrar-comprador');

btnabrirpopupcomprador.addEventListener('click', function(){
    overlaycomprador.classList.add('active');
})

btncerrarcomprador.addEventListener('click', function(){
    overlaycomprador.classList.remove('active');
})



/**
 * 
 * Otro intento de modaaaaaal
 */

$('#exampleModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })