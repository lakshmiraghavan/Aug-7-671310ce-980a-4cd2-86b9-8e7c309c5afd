/**
 * Created by lakshmi on 8/10/15.
 */
console.log("hi from upload");

document.addEventListener("DOMContentLoaded", function(){
    var btn = document.querySelector('button');
    var inp = document.querySelector('input[type="file"]');

    btn.addEventListener('click', function(){

        var formdata = new FormData();

        var files = Array.prototype.slice.call(inp.files);
        console.log(files);
        formdata = files.reduce(function (formdata, file) {
            formdata.append("info", file);
            return formdata;
        }, formdata);
        console.log(formdata);

        if (files.length) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/files/upload');
            xhr.addEventListener('readystatechange', function () {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    console.log(xhr.responseText);
                }
            });
            xhr.send(formdata);
        }
//checking if progress exists
        if ("onprogress" in xhr) {
         console.log("progress event exists")
        }
        //progress properties

        xhr.addEventListener('progress', function(e){
            console.log(e.loaded);
            console.log(e.total);
            console.log(e.lengthComputable);
        })

    });
});
