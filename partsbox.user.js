// ==UserScript==
// @name         partsbox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Go to "https://partsbox.com/*/builds/start", refresh page, script button will appear. Rows, having multipart items will be highlighted after script is executed.
// @author       WhiteChairFromIkea
// @downloadURL  https://github.com/WhiteChairFromIkea/PartsBox_JS_CheckMultipartsInBuild/raw/main/partsbox.user.js
// @updateURL    https://github.com/WhiteChairFromIkea/PartsBox_JS_CheckMultipartsInBuild/raw/main/partsbox.user.js

// @include      https://partsbox.com/*/builds/start
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    var TIME_SLOT = 150; // ms for row to expand / colapse / pause

    addBtn();

    /*********** End of script ***************/

    function addBtn(){
        /*
        var css = "h1 { background: red; }"
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        */

        var btnUser = document.createElement("Button");
        btnUser.innerHTML = "Check for mutipart items";
        btnUser.style = "background-color: #6FA521; border-radius: 4px; color: white;  padding: 15px 32px;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 16px; top:0%;right:50%;position:fixed"
        document.body.appendChild(btnUser);

        btnUser.addEventListener ("click", function() {
            script_checkBuildListForMultipart();
        });
    }


    function script_checkBuildListForMultipart() {
        var arrows = document.querySelectorAll("td.unroll > a"), i;

        for(i = 0; i < arrows.length; ++i) {
            var arrow = arrows[i];
            //console.log(arrow);

            var wait = (i+1) * TIME_SLOT;
            setTimeout(openRow, wait, arrow);
            setTimeout(checRowAndClose, wait + TIME_SLOT, arrow);
            sleep(TIME_SLOT);
        }
    }


    //var global2 = 0;
    function openRow(jNode)
    {
        //    global2++;
        //    console.log("Opened " + global2 + " time");
        triggerMouseEvent (jNode, "click");
    }


    // var global = 0;
    function checRowAndClose(jNode){
        var active = document.querySelector("tr.active");
        var subActive = active.nextElementSibling;
        var table = subActive.querySelector("tbody");
        var rowCount = table.childElementCount;

        //console.log(active);
        //console.log(subActive);
        //console.log(table);
        //console.log("rowCount = " + rowCount);

        if(rowCount>1)
        {
            active.bgColor = "YELLOW";
        }

        triggerMouseEvent (jNode, "click");

        //global++;
        //console.log ("Closed after timeout for " + global + " time");*/
    }


    /*****************************************************************************************/

    function triggerMouseEvent (node, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent (eventType, true, true);
        node.dispatchEvent (clickEvent);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*       var rootRows = document.querySelectorAll('tbody tr'), i;

        //console.log(tds);
        //console.log(tds[1]);

        for(i = 0; i < rootRows.length; ++i) {
            var row = rootRows[i];
            //console.log(row);

            var arrow = row.firstChild;

            var targetNode = arrow.querySelector("a[href*='#']")
            if (targetNode) {


                //--- Simulate a natural mouse-click sequence.
                //triggerMouseEvent (targetNode, "mouseover");
                //triggerMouseEvent (targetNode, "mousedown");
                //triggerMouseEvent (targetNode, "mouseup");
                //  triggerMouseEvent (targetNode, "click");
                //console.log ("Clicked");
                //var rootRows = document.querySelectorAll('tbody td.select'), n;

                // arrow.bgColor = 'YELLOW';



                //waitForKeyElements
                // sleep2(1000);

                //   var rootRows2 = document.querySelectorAll('tbody tr'), k;
                //   var active = rootRows2.querySelector("tr.active"), o;
                //   console.log(rootRows2);
                //   console.log(active);

                // sleep2(1000);
                // var subRows = document.querySelectorAll('tbody tr.active'), j;
                // console.log(subRows);
                /*    sleep2(2000);
                var numOfSubRows = subRows.length;
                console.log(numOfSubRows);*/
    /*           }
            else
            {
                console.log ("Target node not found!");
            }


        }*/

    /*
     window.addEventListener("load", () => {
        console.log("Page loaded")
    });


      $(document).ready(function() { //When document has loaded

        setTimeout(function() {

            console.log("Pradedamas scriptas po timeout'o");
            addBtn();

        }, 100); //Two seconds will elapse and Code will execute.

    });

   function sleep2(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    async function demo() {
         console.log('Taking a break...');
        await sleep(2000);
        test();

         Sleep in loop
        for (let i = 0; i < 10; i++) {
            if (i === 3)
                await sleep(10);
            alert(i);
        }

    } */

})();
