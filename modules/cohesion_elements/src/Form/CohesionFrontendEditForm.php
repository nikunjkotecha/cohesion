<?php

namespace Drupal\cohesion_elements\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class CohesionFrontendEditForm.
 *
 * @package Drupal\cohesion_elements\Form
 */
class CohesionFrontendEditForm extends FormBase {

  public function getFormId() {
    return 'CohesionFrontendEditForm';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['#attributes']['class'] = [
      'cohesion-component-in-context',
    ];


    $form['cohesion'] = [
      // Drupal\cohesion\Element\CohesionField.
      '#type' => 'cohesionfield',
      '#json_values' => '{}',
      '#json_mapper' => '{}',
      '#entity' => NULL,
      '#classes' => ['cohesion-component-in-context'],
      '#cohFormGroup' => 'frontend_edit',
      '#cohFormId' => 'component',
    ];

    $form['cohesion']['#token_browser'] = 'all';
    // Add the shared attachments.
    _cohesion_shared_page_attachments($form);

    return $form;
  }

  /**
   * @inheritDoc
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    return;
  }
}
