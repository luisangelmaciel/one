/* MINI RSUME CARD (JS) dp 2017
    INSPIRED BY THIS PEN BY ANDY TRAN: https://codepen.io/andytran/pen/BNjymy

    This panel is only "one per page".
    Working on a version that will accept multiple/unlimited panels.

    The only thing that will change for that one is the script.
    HTML/CSS will remain the same.

    No jQuery/libraries used, pure vanilla.
    Only external resource used is font-awesome for icons.
*/

// POLYFILL FOR ES6 forEach
(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();

// MAIN FUNCTION
(function() {
    var infoPanels = {
        imgHeight: null,
        card: document.querySelector('.card'),
        img: document.querySelector('.card img'),
        panels: document.querySelectorAll('.panel'),
        social: document.querySelector('.social'),
        dialog: document.querySelector('.dialog'),
        links: document.querySelectorAll('.nav li a'),
        mask: document.querySelector('.mask'),
        init: function() {
            // GET IMAGE HEIGHT
            var getImageHeight = function() {
                var img = infoPanels.img.getBoundingClientRect();
                return {
                    height: img.bottom - img.top,
                }
            };
            // SET INITIAL HEIGHT
            this.imgHeight = getImageHeight().height;
            // GET NEW IMAGE SIZE ONRESIZE
            window.onresize = function(event) {
                infoPanels.imgHeight = getImageHeight().height;
            };

            // CHAINABLE CLASSLIST
            function chainClasses(el) {
                var obj = el.classList;
                return {
                    toggle: function(c) {obj.toggle(c); return this;},
                       add: function(c) {obj.add   (c); return this;},
                    remove: function(c) {obj.remove(c); return this;}
                };
            }

            // HIDE MASK (not currently used)
            function hideMask(time) {
                setTimeout(function(){
                    chainClasses(infoPanels.mask).remove('show');
                }, time);
            }

            // ADD LISTENER TO CARD
            this.card.addEventListener('mouseenter', function(e) {
                chainClasses(this).remove('inactive').add('active');
                e.stopPropagation();
            });
            // ADD LISTENER TO LIKES
            this.card.querySelector('.likes a').addEventListener('click', function(e) {
                e.preventDefault();
                chainClasses(infoPanels.mask).add('show');
                chainClasses(infoPanels.dialog).remove('hide').add('show');// array?
                setTimeout(function(){
                    chainClasses(infoPanels.dialog).remove('show').add('hide');
                }, 1500);
                //hideMask(1800);
            });
            // ADD LISTENER TO SHARE
            this.card.querySelector('.share a').addEventListener('click', function(e) {
                e.preventDefault();
                chainClasses(infoPanels.mask).add('show');
                chainClasses(infoPanels.social).remove('hide').add('show');
            });
            // ADD LISTENER TO 1ST SOCIAL A
            this.social.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                chainClasses(infoPanels.social).remove('show').add('hide');
                //hideMask(600);
            });

            // COMPARE CURRENT SCALED IMG SIZE TO ORIGINAL UNSCALED SIZE
            var checkImage = function() {
                setTimeout(function(){
                    if (getImageHeight().height === infoPanels.imgHeight) {
                        chainClasses(infoPanels.card).remove('active').add('inactive');
                        resetPanels();
                        infoPanels.panels[0].classList.add('open');
                        infoPanels.links[0].classList.add('active');
                    }
                }, 400);
            };

            // ADD MOUSELEAVE LISTENER TO PANEL
            // This routine is for Chrome ghost cursor bug onclick/onmouseup etc...
            // on links existing within an parent element that has a mouseleave Listener attached,
            // which when clicked prematurely executes the mouseleave Listener.
            // The mouse "ghosts", triggering the mouseleave, though the mouse is still inside.
            var mouseLeave = function() {
                infoPanels.card.addEventListener('mouseleave', function(e) {
                    checkImage();
                }, false);
            }();

            // DELAY VISIBILITY ON INITIAL PANEL
            setTimeout(function(){
                infoPanels.panels.forEach(function(i, index) {
                    i.style.visibility = 'visible';
                });
            }, 1000);

            // ADD LISTENERS TO NAV LINKS
            this.links.forEach(function(link, index) {
                link.addEventListener('mouseup', setActivePanel, false);
            });

            //SET ACTIVE PANEL
            function setActivePanel() {
                resetPanels();
                var panel = document.querySelector('div[data-key="' + this.hash + '"]');
                panel.classList.toggle('open');
                this.classList.toggle('active');
            }

            // RESET PANELS
            function resetPanels() {
                infoPanels.panels.forEach(function(i, index) {
                    i.classList.remove('open');
                });
                infoPanels.links.forEach(function(link) {
                    link.classList.remove('active');
                });
                chainClasses(infoPanels.dialog).remove('show').add('hide');
                chainClasses(infoPanels.social).remove('show').add('hide');
                //hideMask(300);
            }
        }
    };
    infoPanels.init();
})();

// DISABLE PANEL LINKS FOR DEMO
(function() {
    var links = document.querySelectorAll('.panel a');
    links.forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
        });
    });
})();