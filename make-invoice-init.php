<?php
/*
Make Invoice - Generate & Pay Invoice Through API is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Make Invoice - Generate & Pay Invoice Through API is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
 
You should have received a copy of the GNU General Public License
along with Make Invoice - Generate & Pay Invoice Through API. If not, see http://www.gnu.org/licenses/gpl-2.0.txt.

 * Plugin Name: Make Invoice - Generate & Pay Invoice Through API
 * Plugin URI: https://www.make-invoice.com
 * Tags: Tags for the Plugin
 * Description: Simply add invoice generator in your website by using [makeinvoice] shortcode. Generate and download invoice PDF quickly. Expand your site capability to create invoice for your users and send directly to their client/customer email.
 * Version: 1.0.0
 * Author: Make Invoice
 * Author URI: https://www.make-invoice.com
 * Contributors: @marksalvania103192
 * Donate link: https://www.paypal.com/donate?hosted_button_id=XZ6BL374UK4F4
 * Requires at least: 5.4
 * Stable tag: 1.0.0
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

define( 'MAKE_INVOICE_VER', '1.0.3');
define( 'MIGPA_PLUGIN_DIR', plugin_dir_url( __FILE__ ) );
define( 'MIGPA_FILE_DIR', dirname(__FILE__) );

function migpa_add_donate_button( $links, $file ) {    
    if ( plugin_basename( __FILE__ ) == $file ) {
        $row_meta = array(
          'donate'    => '<a href="' . esc_url( 'https://www.paypal.com/donate?hosted_button_id=XZ6BL374UK4F4' ) . '" target="_blank" aria-label="' . esc_attr__( 'We will continue to improve our service', 'domain' ) . '" style="color:green;">' . esc_html__( 'Donate to us', 'domain' ) . '</a>'
        );
 
        return array_merge( $links, $row_meta );
    }
    return (array) $links;
}

function MIGPA_Admin_Menu() 
{
    $page_title = 'Invoice Backend';
    $menu_title = 'Make Invoice';
    $capability = 'manage_options';
    $slug = 'make-invoice';
    $callback = 'migpa_interface';
    $icon = 'dashicons-list-view';
    $position = 60;

    add_menu_page($page_title, $menu_title, $capability, $slug, $callback, $icon, $position);
}

function migpa_register_settings()
{
    register_setting('invoice_options', 'page_title');  
	register_setting('invoice_options', 'form_width');
	register_setting('invoice_options', 'download_pdf_text');
	register_setting('invoice_options', 'magmi_classic');
}

function migpa_interface()
{ 
	// Calls the template for backend interface
    require_once(MIGPA_FILE_DIR . "/templates/backend.php");
}

function migpa_admin_page_style() {

	//Load CSS
    wp_enqueue_style( 'bootstrap-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/bootstrap.min.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'custom-css', MIGPA_PLUGIN_DIR. 'assets/custom.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'waitme-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/toast.min.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'toast-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/waitme.min.css', array(), MAKE_INVOICE_VER);

	// Load JS
	wp_enqueue_script('toast-js', MIGPA_PLUGIN_DIR. "assets/lib/js/toast.min.js", array(), MAKE_INVOICE_VER);
	wp_enqueue_script('wait-js', MIGPA_PLUGIN_DIR. "assets/lib/js/waitme.min.js", array(), MAKE_INVOICE_VER);
	wp_enqueue_script('admin-js', MIGPA_PLUGIN_DIR. "assets/admin-custom.js", array(), MAKE_INVOICE_VER);
}

function MIGPA_Shortcode( $atts ) {

	// Shortcode Attributes
    $a = shortcode_atts( array(
		'title' => get_option('page_title'),
		'width' => get_option('form_width'),
		'button' => get_option('download_pdf_text'),
	), $atts );

	// Load CSS
	wp_enqueue_style( 'bootstrap-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/bootstrap.min.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'waitme-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/toast.min.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'toast-css', MIGPA_PLUGIN_DIR. 'assets/lib/css/waitme.min.css', array(), MAKE_INVOICE_VER);
	wp_enqueue_style( 'custom-css', MIGPA_PLUGIN_DIR. 'assets/custom.css', array(), MAKE_INVOICE_VER);

	// Calls the frontend interface
	require_once(MIGPA_FILE_DIR . "/templates/frontend.php");

	// Load JS
	wp_enqueue_script( 'bootstrap-js', MIGPA_PLUGIN_DIR. "assets/lib/js/bootstrap.min.js", array(), MAKE_INVOICE_VER);
	wp_enqueue_script('toast-js', MIGPA_PLUGIN_DIR. "assets/lib/js/toast.min.js", array(), MAKE_INVOICE_VER);
	wp_enqueue_script('wait-js', MIGPA_PLUGIN_DIR. "assets/lib/js/waitme.min.js", array(), MAKE_INVOICE_VER);
	wp_enqueue_script('custom-js', MIGPA_PLUGIN_DIR. "assets/custom.js", array(), MAKE_INVOICE_VER);
}

// Functions

function migpa_ajaxurl() {

   echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
		   var MIGPA_Endpoint = "https://www.make-invoice.com/invoices/create-pdf";
		   var countryJSON = "'.MIGPA_PLUGIN_DIR.'/assets/countries.json";
         </script>';
}

function migpa_handle_logo_save(){
	// will return the attachment id of the image in the media library
    $attachment_id = media_handle_upload('logo', 0);

    // test if upload succeeded
    if (is_wp_error($attachment_id)) {
        http_response_code(400);
        echo 'Failed to upload file.';
    }
    else {
        http_response_code(200);
        echo wp_get_attachment_url( $attachment_id );
    }

    // done!
    die();
}

function migpa_disable_gutenberg_for_page ( $is_enabled, $post_type ) {
	if ( 'page' == $post_type && get_option('magmi_classic') == "no") { 
		return false;
	}else {
		return true;
	}	
}

// All add_action / add_filter goes here

// Disable gutenberg for error

add_filter( 'use_block_editor_for_post_type',  'migpa_disable_gutenberg_for_page', 10, 2 );

// Add shortcode [makeinvoice]

add_shortcode('makeinvoice', 'MIGPA_Shortcode');

// Upload logo

add_action('wp_head', 'migpa_ajaxurl');
add_action('wp_ajax_nopriv_logo_save', 'migpa_handle_logo_save');
add_action( 'wp_ajax_logo_save', 'migpa_handle_logo_save' );

// Admin init
add_action('admin_head', 'migpa_ajaxurl');
add_action('admin_head', 'migpa_admin_page_style');
add_action('admin_init', 'migpa_register_settings');
add_action('admin_menu', 'MIGPA_Admin_Menu');

// Donate button link

add_filter( 'plugin_row_meta', 'migpa_add_donate_button', 10, 2 );