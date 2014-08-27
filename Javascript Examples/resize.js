 window.onload = function() {

        var resizeId = document.getElementById("resizeImage");
        var resizeStartCoordsX,
            resizeStartCoordsY,
            resizeEndCoordsX,
            resizeEndCoordsY;

        var resizeEndCoords;
        var resizing = false;

        document.onmousedown = coordinatesMousedown;
        document.onmouseup = coordinatesMouseup;

        alert("Hello, World!");

        function coordinatesMousedown(e) {
          if (e == null) {
            e = window.event;
          }

          var element = (typeof( window.event ) != 'undefined' ) ? e.srcElement : e.target;

          if (element.id == "resizeImage") {
            resizing = true;
            resizeStartCoordsX = e.clientX;
            resizeStartCoordsY = e.clientY;
          }
          return false;
        }

        function coordinatesMouseup(e) {
          if (e == null) {
            e = window.event;
          }

          if (resizing === true) {
            var currentImageWidth = parseInt(resizeId.width);
            var currentImageHeight = parseInt(resizeId.height);

            resizeEndCoordsX = e.clientX;
            resizeEndCoordsY = e.clientY;

            resizeId.style.height = currentImageHeight - (resizeStartCoordsY - resizeEndCoordsY) + 'px';
            resizeId.style.width = currentImageWidth - (resizeStartCoordsX - resizeEndCoordsX) + 'px';

            resizing = false;
          }
          return false;
        }
      }