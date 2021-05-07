// ==UserScript==
// @name         partsbox
// @namespace    http://tampermonkey.net/
// @version      0.11
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
/*---------------------Version History--------------------
0.11 (2021-05-07)
 * Place button inside button row;
 * Changing button state;
 * Wait until "Part database loaded" message to appear at startup;
 
0.10 (2021-05-07)
 * Initial commit, no idea how multithreading worksin JS, no error checking at all;
---------------------------------------------------------/*


(function() {
    'use strict';

    // Adjust this value according to webpage responsiveness. Default 150 ms
    var TIME_SLOT = 150; // ms for row to expand / colapse / pause


    $( document ).ready(function() {
        waitForKeyElements("#message", addBtn); // Wait until "Part database loaded" message appears
    });

    /*********** End of script script is started by btnUser click event ***************/

    var btnUser = document.createElement("Button");
    var gi_rowCount = 0; // Overall line count, used to calculate job duration
    var gi_closedTimesCnt = 0;

    function addBtn(){
        /*
        var css = "h1 { background: red; }"
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        */

        set_BtnStatus();
        // btnUser.style = "background-color: #6FA521; border-radius: 4px; color: white;  padding: 15px 32px;  text-align: center;  text-decoration: none;  display: inline-block;  font-size: 16px; top:0%;right:50%;position:fixed"

        // var buttonHolder = document.body; // Main page
        var buttonHolder = document.querySelector("#app-grid > div:nth-child(3) > div > div > div > div:nth-child(2) > div > div"); //"#app-grid > div:nth-child(3) > div.thirteen.wide.column > div > div > div:nth-child(2) > div > div");
        buttonHolder.appendChild(btnUser)

        btnUser.addEventListener ("click", function() {
            script_checkBuildListForMultipart();
        });
    }


    function script_checkBuildListForMultipart() {
        var arrows = document.querySelectorAll("td.unroll > a"), i;
        gi_rowCount = arrows.length;

        if(arrows.length > 0)
        {
            set_BtnStatus("Wait untill finished...");

            for(i = 0; i < arrows.length; i++) {
                var arrow = arrows[i];
                //console.log(arrow);

                var wait = (i+1) * TIME_SLOT;
                setTimeout(openRow, wait, arrow);
                setTimeout(checRowAndClose, (wait + TIME_SLOT), arrow);
                sleep(TIME_SLOT);
            }
        }
    }


    function openRow(jNode)
    {
        triggerMouseEvent (jNode, "click");
    }


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

        gi_closedTimesCnt++;

        if(gi_closedTimesCnt < gi_rowCount )
        {
        }
        else
        {
            gi_closedTimesCnt = 0;
            set_BtnStatus();
        }

        triggerMouseEvent (jNode, "click");
    }

    // Pass some text to set as caption, or null to set initial button name
    function set_BtnStatus(s_isRunning)
    {
        if(s_isRunning)
        {
            btnUser.disabled = true;
            btnUser.innerHTML = s_isRunning;
        }
        else
        {
            btnUser.innerHTML = "Check for mutipart items";
            btnUser.disabled = false;
        }
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
