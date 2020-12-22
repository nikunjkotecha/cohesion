(function($) {
  "use strict";
  const CohesionEditor = function() {
    var self = this;
    this.el = {
      components: null,
      body: document.getElementsByTagName('body')[0],
      html: document.getElementsByTagName('html')[0]
    };

    this.state = {
      dragging: false
    }

    this.init = init;
    this.destroy = destroy;

    function init() {
      console.log('Init')
      let $fixedEls = $('*').filter(function(){
        var position = $(this).css('position');
        return position === 'fixed';
      })
      $('.dx-preview-placeholder').remove();
      self.el.components = document.querySelectorAll("#block-cohesion-theme-content .coh-component");
      iterateCollection(self.el.components)((node) => {
        node.addEventListener("mouseenter", onMouseEnter);
      });
      if(document.querySelectorAll("#block-cohesion-theme-content [data-quickedit-field-id]")[0]) {

        this.sortable = Sortable.create(document.querySelectorAll("#block-cohesion-theme-content [data-quickedit-field-id]")[0], {
          group: "shared",
          multiDrag: true,
          selectedClass: "selected",
          animation: 150,
          forceFallback: false,
          scroll: true, // Enable the plugin. Can be HTMLElement.
          // scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl) {  }, // if you have custom scrollbar scrollFn may be used for autoscrolling
          scrollSensitivity: 150, // px, how near the mouse must be to an edge to start scrolling.
          scrollSpeed: 15, // px, speed of the scrolling
          bubbleScroll: false, // apply autoscroll to all parent elements, allowing for easier movement
          // Don't forget to remove the ghost DOM object when done dragging
          store: {
            set: function (sortable) {
              var order = [...new Set(sortable.toArray())];
              console.log('The order', order)

              pageData.canvas.sort(function(a, b){
                return order.indexOf(a.uuid) - order.indexOf(b.uuid);
              });
              self.destroy();

              let selector = '#dx-frontend-editor > *';
              let response;

              jQuery.ajax( {
                url: `/cohesionapi/layout-canvas/build?coh_clean_page=true&canvas_id=${drupalSettings.cohesion.layout_canvas_id}`,
                type: 'POST',
                // dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(pageData),
              } ).done( function( responseText ) {

                // Save response for use in complete callback
                response = arguments;

                $('#block-cohesion-theme-content [data-quickedit-field-id]').html( selector ?
                  jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
                  // Otherwise use the full result
                  responseText );

                  fakeSetDataid();
                  self.init();
              } )
            }
          },
          setData: function (dataTransfer, dragEl) {
            // Create the clone (with content)
            self.dragGhost = document.createElement('div')
            self.dragGhost.innerText = 'Place holder'
            // Stylize it
            self.dragGhost.classList.add('custom-drag-ghost');
            // Place it into the DOM tree
            document.body.appendChild(self.dragGhost);
            // Set the new stylized "drag image" of the dragged element
            dataTransfer.setDragImage(self.dragGhost, 0, 0);
          },
          onStart: (ev) => {
            this.state.dragging = true;
            // var dragRect = Sortable.getRect(ev.item, false, true, true);
            // var placeHolderRect = Sortable.getRect(self.dragGhost, false, true, true);
            //
            // console.log(dragRect)
            // console.log(placeHolderRect)

            $fixedEls.css('pointerEvents', 'none');

            console.log(ev);
            $(ev.item).css({

            })
          },
          onEnd: (ev) => {
            this.state.dragging = false;
            // console.log(ev)
            $(ev.item).css('opacity', 0.2).prepend('<div style="position: absolute">Loading</div>');
            $fixedEls.css('pointerEvents', '');

            self.dragGhost.parentNode.removeChild(self.dragGhost);

          }
        });
      }

    }


    function onMouseEnter(ev) {
        if(self.state.dragging) {
          return;
        }
        iterateCollection(self.el.components)(function (node, i) {
          Sortable.utils.deselect(node);
        });

        Sortable.utils.select(ev.target);
        ev.currentTarget.classList.forEach((className) => {
          if (className.indexOf("coh-component-instance-") === 0) {
            iterateCollection(document.getElementsByClassName(className))(function (node, i) {
              if (ev.currentTarget !== node) {
                Sortable.utils.select(node);
              }

            });
          }
        });
    }

    function destroy() {
      console.log('DESTROY')
      iterateCollection(self.el.components)((node) => {
        node.removeEventListener("mouseenter", onMouseEnter);

      });

      this.sortable.destroy();
    }

    function iterateCollection(collection) {
      return function (f) {
        for (var i = 0; collection[i]; i++) {
          f(collection[i], i);
        }
      };
    }

    function getUUIDFromClassString(htmlClasses) {
      const regex = /coh-component-instance-(\S+)/gm;
      return regex.exec(htmlClasses)[1]
    }

    function fakeSetDataid() {
      $('[data-quickedit-field-id] .coh-component').each(function () {
        $(this).attr('data-id', getUUIDFromClassString($(this).attr('class')))
      })
    }

    fakeSetDataid();

    this.init();
  };


  let editor = new CohesionEditor();

})(jQuery);

const pageData = window.drupalSettings.cohesion['layout_canvas'];
