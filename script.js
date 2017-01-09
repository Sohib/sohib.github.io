console.log("wwewe");

function get(url, success, fail) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = null;
            try {
                data = JSON.parse(request.responseText);
            } catch (err) {
                if (err instanceof SyntaxError) {
                    data = request.responseText;
                }
            }
            success(data);



        } else {
            // We reached our target server, but it returned an error
            fail();
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        fail();
    };
    request.send();

}

function loadBlogs() {
    var error = function() {
        console.error("an error happend");
    };


    get('/blogs/blogs.json', function(data) {

        console.log(data);

        var addToPage = function(data) {

            var main = document.querySelector('main');

            var z = document.createElement('article');
            z.innerHTML = data;


            document.getElementsByTagName('main')[0].appendChild(z)
                // console.log(data);
        }


        data.blogs.forEach(function(item, i) {
            console.log(item);
            get(item, addToPage, error);
        });

    }, error);
}