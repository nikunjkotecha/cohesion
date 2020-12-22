// (function ($, Drupal, drupalSettings) {
//     Drupal.behaviors.cohesionQuickEdit = {
//         attach: function attach(context, settings) {
//
//             // SVG icon variables
//             var cohIconMove = '<svg class="coh-icon coh-icon--move"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-move"></use></svg>';
//             var cohIconEdit = '<svg class="coh-icon coh-icon--edit"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-edit"></use></svg>';
//             var cohIconEllipsis = '<svg class="coh-icon coh-icon--ellipsis"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-ellipsis"></use></svg>';
//             var cohIconCog = '<svg class="coh-icon coh-icon--cog"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-cog"></use></svg>';
//             var cohIconTrash = '<svg class="coh-icon coh-icon--trash"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-trash"></use></svg>';
//             var cohIconCheck = '<svg class="coh-icon coh-icon--check"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-check"></use></svg>';
//             var cohIconCancel = '<svg class="coh-icon coh-icon--cancel"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-cancel"></use></svg>';
//             var cohIconPlus = '<svg class="coh-icon coh-icon--plus"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-plus"></use></svg>';
//             var cohIconCaretDown = '<svg class="coh-icon coh-icon--caret-down"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-caret-down"></use></svg>';
//             var cohIconParagraph = '<svg class="coh-icon coh-icon--paragraph"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-paragraph"></use></svg>';
//             var cohIconTelevision = '<svg class="coh-icon coh-icon--television"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-television"></use></svg>';
//             var cohIconDesktop = '<svg class="coh-icon coh-icon--desktop"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-desktop"></use></svg>';
//             var cohIconLaptop = '<svg class="coh-icon coh-icon--laptop"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-laptop"></use></svg>';
//             var cohIconTablet = '<svg class="coh-icon coh-icon--tablet"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-tablet"></use></svg>';
//             var cohIconMobileLandscape = '<svg class="coh-icon coh-icon--mobile-landscape"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-mobile-landscape"></use></svg>';
//             var cohIconMobile = '<svg class="coh-icon coh-icon--mobile"><use xlink:href="/modules/contrib/dx8/modules/cohesion_quickedit/images/symbol-defs.svg#coh-icon-mobile"></use></svg>';
//
//             var $toolbar = $('#toolbar-bar'); // Create variable for Admin toolbar
//             var $drupalToolbarEditButton = $('#toolbar-bar .toolbar-icon-edit'); // Create variable for Admin toolbar edit button
//             var $cohComponentsWrapper =  $('#block-cohesion-theme-content div:not([class]):eq(1)'); // Create variable for element to wrap with injected layout canvas markup
//             var $cohComponentMask = $('.dx-contextual-region-mask');
//
//             var cohLayoutCanvasSection = '<section class="coh-layout-canvas-section" />'; // Create variable for injected layout canvas section (outer element)
//             var cohLayoutCanvasMain = '<main class="coh-layout-canvas-main" />'; // Create variable for injected layout canvas main area
//             var cohComponentOptions = '<ul class="coh-component-options" />'; // Create variable for injected <ul> to be wrapped around contextual edit button
//
//             // Create variable for injected component options move <li>
//             var cohComponentOptionsMove =
//                 '<li class="coh-component-options__li coh-component-options__li--move">' +
//                     '<button class="coh-button-new coh-button-new--secondary coh-button-new--move" type="button">' + cohIconMove + '</button>' +
//                 '</li>';
//
//             // Create variable for injected component options edit <li>
//             var cohComponentOptionsEdit =
//                 '<li class="coh-component-options__li coh-component-options__li--edit">' +
//                     '<button class="coh-button-new coh-button-new--secondary coh-button-new--edit" type="button">' + cohIconEdit + '</button>' +
//                 '</li>';
//
//             // Create variable for injected component options ellipsis <li>
//             var cohComponentOptionsEllipsis =
//                 '<li class="coh-component-options__li coh-component-options__li--ellipsis">' +
//                     '<button class="coh-button-new coh-button-new--secondary coh-button-new--ellipsis" type="button">' + cohIconEllipsis + '</button>' +
//                 '</li>';
//
//             // Create variable for injected Cohesion edit mode toolbar options
//             var cohEditModeContainer = $('<div class="coh-edit-mode visually-hidden">' +
//                 '<ul class="coh-edit-mode__ul">' +
//                     '<li class="coh-edit-mode__li coh-edit-mode__li--configure">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--configure" type="button">' + cohIconCog + '</button>' +
//                     '</li>' +
//                     '<li class="coh-edit-mode__li coh-edit-mode__li--breakpoint">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--breakpoint-selector" type="button">' + cohIconTelevision + '</button>' +
//                         '<ul class="coh-breakpoint-selector">' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--television coh-is-pressed">' +
//                                 '<button class="coh-button-new coh-button-new--television" data-coh-max-width="100%" type="button">' + cohIconTelevision + '</button>' +
//                             '</li>' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--desktop">' +
//                                 '<button class="coh-button-new coh-button-new--desktop" data-coh-max-width="1170px" type="button">' + cohIconDesktop + '</button>' +
//                             '</li>' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--laptop">' +
//                                 '<button class="coh-button-new coh-button-new--laptop" data-coh-max-width="1024px" type="button">' + cohIconLaptop + '</button>' +
//                             '</li>' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--tablet">' +
//                                 '<button class="coh-button-new coh-button-new--tablet" data-coh-max-width="768px" type="button">' + cohIconTablet + '</button>' +
//                             '</li>' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--mobile-landscape">' +
//                                 '<button class="coh-button-new coh-button-new--mobile-landscape" data-coh-max-width="565px" type="button">' + cohIconMobileLandscape + '</button>' +
//                             '</li>' +
//                             '<li class="coh-breakpoint-selector__li coh-breakpoint-selector__li--mobile">' +
//                                 '<button class="coh-button-new coh-button-new--mobile" data-coh-max-width="320px" type="button">' + cohIconMobile + '</button>' +
//                             '</li>' +
//                         '</ul>' +
//                     '</li>' +
//                     '<li class="coh-edit-mode__li coh-edit-mode__li--delete">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--delete" type="button">' + cohIconTrash + '</button>' +
//                     '</li>' +
//                     '<li class="coh-edit-mode__li coh-edit-mode__li--state">' +
//                         '<button class="coh-toggle coh-toggle--state coh-is-pressed" type="button">' +
//                             '<span class="coh-toggle__span coh-toggle__span--label">Published</span>' +
//                             '<span class="coh-toggle__span coh-toggle__span--state">' +
//                                 '<span class="coh-toggle__span coh-toggle__span--on">' + cohIconCheck + '</span>' +
//                                 '<span class="coh-toggle__span coh-toggle__span--off">' + cohIconCancel + '</span>' +
//                             '</span>' +
//                         '</button>' +
//                     '</li>' +
//                     '<li class="coh-edit-mode__li coh-edit-mode__li--save">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--save" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Save</span>' + cohIconCheck + '</button>' +
//                     '</li>' +
//                 '</ul>' +
//             '</div>');
//
//             // Create variable for injected layout canvas header
//             var cohLayoutCanvasHeader = $('<header class="coh-layout-canvas-header">' +
//                 '<ul class="coh-layout-canvas-header__ul">' +
//                     '<li class="coh-layout-canvas-header__li coh-layout-canvas-header__li--add">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--add" type="button">' + cohIconPlus +'</button>' +
//                     '</li>' +
//                     '<li class="coh-layout-canvas-header__li coh-layout-canvas-header__li--options">' +
//                         '<button class="coh-button-new coh-button-new--default coh-button-new--options" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Options</span>' + cohIconCaretDown + '</button>' +
//                     '</li>' +
//                     '<li class="coh-layout-canvas-header__li coh-layout-canvas-header__li--delete">' +
//                         '<button class="coh-button-new coh-button-new--default coh-button-new--delete" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Layout</span>' + cohIconParagraph + '</button>' +
//                     '</li>' +
//                 '</ul>' +
//             '</header>');
//
//             // Create variable for injected layout canvas footer
//             var cohLayoutCanvasFooter = $('<footer class="coh-layout-canvas-footer">' +
//                 '<ul class="coh-layout-canvas-footer__ul">' +
//                     '<li class="coh-layout-canvas-footer__li coh-layout-canvas-footer__li--add">' +
//                         '<button class="coh-button-new coh-button-new--primary coh-button-new--add" type="button">' + cohIconPlus + '</button>' +
//                     '</li>' +
//                     '<li class="coh-layout-canvas-footer__li coh-layout-canvas-footer__li--options">' +
//                         '<button class="coh-button-new coh-button-new--default coh-button-new--options" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Options</span>' + cohIconCaretDown + '</button>' +
//                     '</li>' +
//                     '<li class="coh-layout-canvas-footer__li coh-layout-canvas-footer__li--delete">' +
//                         '<button class="coh-button-new coh-button-new--default coh-button-new--delete" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Layout</span>' + cohIconParagraph + '</button>' +
//                     '</li>' +
//                 '</ul>' +
//             '</footer>');
//
//             // Delete localStorage item for edit mode state on reload
//             localStorage.removeItem('Drupal.contextualToolbar.isViewing');
//
//             // Append coh edit mode options to toolbar
//             $toolbar.append(cohEditModeContainer);
//
//             // For each component mask, insert component options markup
//             $.each($cohComponentMask, function() {
//                 $(this).append(cohComponentOptionsMove, cohComponentOptionsEdit, cohComponentOptionsEllipsis);
//                 $(this).children().wrapAll(cohComponentOptions);
//             });
//
//             $('.coh-component-options').hover(function() {
//                 $( this ).parent().addClass('dx-show');
//             }, function() {
//                 $( this ).parent().removeClass('dx-show');
//             });
//
//             // For each dropzone, add class if empty
//             $('.coh-component-dropzone:not(:has(*))').addClass('coh-component-dropzone--empty');
//
//             $drupalToolbarEditButton.on('click', function () {
//                 if ($(this).hasClass('is-active')) {
//                     // Reset page content width
//                     $('.dialog-off-canvas-main-canvas').css('max-width', '100%');
//
//                     // Remove Cohesion edit mode class from body
//                     $('body').removeClass('coh-edit-mode');
//
//                     // Remove selected class from dropzones
//                     $('.coh-component-dropzone').removeClass('coh-is-selected');
//
//                     // Hide coh edit mode options
//                     cohEditModeContainer.addClass('visually-hidden');
//
//                     // Remove coh-layout-canvas elements
//                     $('.coh-layout-canvas-main').unwrap();
//                     $('.coh-layout-canvas-main').children().unwrap();
//                     $(cohLayoutCanvasHeader).remove();
//                     $(cohLayoutCanvasFooter).remove();
//
//                     // Remove Dropzone markup
//                     $('.coh-component-dropzone .coh-button-new--add').remove();
//
//                 } else {
//                     var $drupalFieldEditButtonParent = $('.contextual .trigger').parent().not('[data-contextual-id*="cohesion"]'); // Create variable for Drupal edit mode pencil parent
//                     var $cohComponentEditButtonParent = $('button.trigger').parent('[data-contextual-id*="cohesion"]'); // Create variable for Cohesion edit mode pencil parent
//
//                     // Create variable for empty dropzone HTML
//                     var cohAddToDropzoneButton =
//                         '<button class="coh-button-new coh-button-new--add" type="button">' +
//                             '<span class="coh-button-new__span coh-button-new__span--label">Add cards here</span>' + cohIconPlus + '</button>';
//
//                     // Add Cohesion edit mode class from body
//                     $('body').addClass('coh-edit-mode');
//
//                     // Set content width based on selected breakpoint
//                     $('.dialog-off-canvas-main-canvas').css('max-width', $('#toolbar-bar .coh-breakpoint-selector__li.coh-is-pressed .coh-button-new').attr('data-coh-max-width'));
//
//                     // Add class and HTML to hardcoded empty dropzone
//                     $('.coh-component-dropzone').prepend(cohAddToDropzoneButton);
//
//                     // Create variable for the Add to dropzone button
//                     var $cohAddToDropzoneButton = $('.coh-component-dropzone .coh-button-new--add');
//
//                     // Component dropzone add button behaviour
//                     $cohAddToDropzoneButton.on('click', function () {
//                         if ($(this).parents('.coh-component-dropzone').hasClass('coh-is-selected')) {
//                             $(this).parents('.coh-component-dropzone').removeClass('coh-is-selected');
//                         } else {
//                             $(this).parents('.coh-component-dropzone').addClass('coh-is-selected');
//                         }
//                     });
//
//                     // Show coh edit mode options and hide the pencils
//                     cohEditModeContainer.removeClass('visually-hidden');
//                     $drupalFieldEditButtonParent.remove();
//                     $cohComponentEditButtonParent.remove();
//
//                     // Insert coh-layout-canvas elements
//                     $cohComponentsWrapper.children().wrapAll(cohLayoutCanvasMain);
//                     $('.coh-layout-canvas-main').wrap(cohLayoutCanvasSection);
//                     $('.coh-layout-canvas-section').prepend(cohLayoutCanvasHeader).append(cohLayoutCanvasFooter);
//                 }
//             });
//
//             var $cohBreakpointSelectorToggle = $('#toolbar-bar .coh-button-new--breakpoint-selector'); // Create variable for the breakpoint selector toggle
//             var $cohBreakpointButton = $('#toolbar-bar .coh-breakpoint-selector__li .coh-button-new'); // Create variable for breakpoint buttons
//             var $cohStateToggle = $('#toolbar-bar .coh-toggle--state'); // Create variable for the publishing state toggle
//
//             // Breakpoint selector toggle behaviour
//             $cohBreakpointSelectorToggle.on('click', function () {
//                 if ($(this).parent().hasClass('coh-is-pressed')) {
//                     $(this).parent().removeClass('coh-is-pressed');
//                     $(this).siblings('.coh-breakpoint-selector').removeClass('coh-is-active');
//                 } else {
//                     $(this).parent().addClass('coh-is-pressed');
//                     $(this).siblings('.coh-breakpoint-selector').addClass('coh-is-active');
//                 }
//             });
//
//             // Breakpoint button behaviour
//             $cohBreakpointButton.on('click', function () {
//                 $cohBreakpointSelectorToggle.parent().removeClass('coh-is-pressed');
//                 $(this).parent().removeClass('coh-is-pressed');
//
//                 if ($(this).parent().hasClass('coh-is-pressed')) {
//                 } else {
//                     var cohSelectedBreakpoint = $(this).children().clone();
//                     var cohSelectedBreakpointWidth = $(this).attr('data-coh-max-width');
//
//                     $(this).parent().addClass('coh-is-pressed');
//                     $cohBreakpointSelectorToggle.empty().append(cohSelectedBreakpoint);
//                     $('.dialog-off-canvas-main-canvas').css('max-width', cohSelectedBreakpointWidth);
//                     $(this).parent().siblings().removeClass('coh-is-pressed');
//                     $(this).parents('.coh-breakpoint-selector').removeClass('coh-is-active');
//                 }
//             });
//
//             // Publishing state toggle behaviour
//             $cohStateToggle.on('click', function () {
//                 if ($(this).hasClass('coh-is-pressed')) {
//                     $(this).removeClass('coh-is-pressed');
//                 } else {
//                     $(this).addClass('coh-is-pressed');
//                 }
//             });
//         }
//     };
// })(jQuery, Drupal, drupalSettings);
