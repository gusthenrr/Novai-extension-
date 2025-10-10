// always waits the document to be loaded when shown
document.addEventListener('DOMContentLoaded', function() {
    
    // listens to the click of the button into the popup content
    /* document.getElementById('btnstart').addEventListener('click', function() {
        window.location='https://mercadolivre.com.br';
    }); */
    document.getElementById('btnregister')?.addEventListener('click', function() {
        window.location='https://escaladaecom.com.br/analytics/registro';
    });
    document.getElementById('btnregistered')?.addEventListener('click', function() {
        window.location='https://mercadolivre.com.br';
    });

});