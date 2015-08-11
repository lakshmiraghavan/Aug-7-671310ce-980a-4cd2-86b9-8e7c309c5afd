/**
 * Created by lakshmi on 8/10/15.
 */
function getHello(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.addEventListener('readystatechange', function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            xhr.abort();
            callback(xhr.responseText);
        }
        ;
    });
    xhr.send(null);
}