(function ($, Drupal, drupalSettings) {

  var destroyEvent, reAttachEvent;
  if ( typeof window.CustomEvent !== "function" ) {
    // Polyfill for IE11 creating events.
    function CustomEvent ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
    //End polyfill.
    destroyEvent = new CustomEvent('siteStudioDestroy');
    reAttachEvent = new CustomEvent('siteStudioReAttach');
  } else {
    destroyEvent = new Event('siteStudioDestroy');
    reAttachEvent = new Event('siteStudioReAttach');
  }
  drupalSettings.cohesion.formGroup = 'frontendEditor';
  drupalSettings.cohesion.formId = 'frontendEditor';

  /**
   * Called when clicking the edit button - sets the page into edit mode or not and renders the react app or destroys it accordingly.
   * @param newState {boolean}
   */
  function setEditState(newState) {
    if (newState) {
      // Enabling edit mode.
      const appEl = document.getElementById('cohApp')

      if (!appEl) {
        const domEl = document.createElement('div');
        domEl.id = 'cohApp';
        domEl.classList.add('coh-app');
        document.body.appendChild(domEl);
        $.getScript('/sites/default/files/cohesion/scripts/dx8/app.js');
      } else {
        appEl.dispatchEvent(reAttachEvent);
      }
    } else {
      const appEl = document.getElementById('cohApp')
      if (appEl) {
        appEl.dispatchEvent(destroyEvent);
        appEl.remove();
      }
    }
    return newState;
  }

  // Attach the cohesion quick edit functionality to the page, binding the onclick function to toggle edit mode.
  Drupal.behaviors.siteStudioEditor = {
    attach: function attach(context) {
      $('body', context)
        .once('initSiteStudio')
        .each(function() {
          const $drupalToolbarEditButton = $('#toolbar-bar .toolbar-icon-edit');
          let editState = localStorage.getItem('Drupal.contextualToolbar.isViewing') === 'false'; // false means we are in edit mode.
          $drupalToolbarEditButton.on('click.siteStudioEditor', function() {
            editState = setEditState(!editState);
          });

          editState = setEditState(editState);
        });
    }
  };
})(jQuery, Drupal, drupalSettings);
