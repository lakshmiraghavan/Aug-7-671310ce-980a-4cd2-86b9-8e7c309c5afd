/**
 * Created by lakshmi on 8/9/15.
 */
console.log('Hello World!');
function getText(url, callback) {
    var request = new XMLHttpRequest();

    request.open("GET", url, false);

    request.addEventListener('readystatechange',function(){
          console.log(request.status);
        if (request.readyState === 4 && request.status === 200) {

            var type = request.getResponseHeader("Content-Type");
            console.log(type);
            if (type.match(/^text/))

                callback(request.responseText);
        }
    });
    request.send();

}

function getTextSync(url) {
    var request = new XMLHttpRequest(); // Create new request
    request.open("GET", url, false);

    request.send("test");

    if (request.status !== 200) throw new Error(request.statusText);

    var type = request.getResponseHeader("Content-Type");
    console.log(type);
   // console.log(JSON.stringify(request.responseText));

    /*if (!type.match(/^text/))
        throw new Error("Expected textual response; got: " + type);*/
    return request.responseText;
}
/*
 Synchronous requests are tempting, but they should be avoided. Client-side JavaScript
 is single-threaded and when the send() method blocks, it typically freezes the entire
 browser UI.
 */

//Parsing examples

function getParse(url, callback) {
    var request = new XMLHttpRequest();

    request.open("GET", url);

    request.addEventListener('readystatechange', function(){
        if (request.readyState === 4 && request.status === 200) {

            var type = request.getResponseHeader("Content-Type");
            console.log(type);
            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML);

            else if (type === "application/json")
                callback(JSON.parse(request.responseText));
            else
                callback(request.responseText);

        }
    })

    request.send(null);

}
//encode examples

function encodeFormData(data) {
    if (!data) return "";
    var pairs = [];

    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === "function") continue;
        var value = data[name].toString();
        name = encodeURIComponent(name.replace(" ", "+"));
        value = encodeURIComponent(value.replace(" ", "+"));
        pairs.push(name + "=" + value);
    }
    return pairs.join('&');
}

function postData(url, data, callback) {

    var request = new XMLHttpRequest();
    request.open("POST", url);

    request.onreadystatechange = function() {

        if (request.readyState === 4 && callback)

            callback(request);

    };
    request.setRequestHeader("Content-Type",

        "application/x-www-form-urlencoded");

    request.send(encodeFormData(data));

}
//sending a get request

function getParseData(url, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url+'?'+encodeFormData(data));
    xhr.addEventListener('readystatechange', function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            callback(xhr.responseText);
        }
        ;
    });
        xhr.send(null);
}

function postJSON(url, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.addEventListener('readystatechange', function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            callback(xhr.responseText);
        }

        })
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

function postXML(url,what, where,  radius, callback)   {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    var doc = document.implementation.createDocument('', 'query',null);
    var query = doc.documentElement;
    var find = doc.createElement('find');
    query.appendChild(find);
    find.setAttribute("zipcode",where);
    find.setAttribute('radius', radius);
    find.appendChild(doc.createTextNode(what));
    xhr.send(doc);
}