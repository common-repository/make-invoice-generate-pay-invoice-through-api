<div class="p-5">
        <h2>Make Invoice Settings</h2>
		<p>
			Use the shortcode <code>[makeinvoice]</code> to any pages you want to show the form. Right side is the preview of the form. You can change the options and see how it looks.
		</p>
	
	<p>
		However we <code>disabled gutenberg (classic editor) by default</code> and can be changed by settings below as for some websites that is getting error when updating the page using our shortcode, but it still update anyways. You can also use <code>&lt;?php do_shortcode('[makeinvoice]'); ?&gt</code> for other PHP template.
	</p>
		<br/>
        
            <div class="row mb-3">
				<div class="col-md-2">
					<form method="POST" action="options.php">
					<?php 
						settings_errors();
						settings_fields('invoice_options');
					?>
					<div class="row">
						<div class="col-md-12 mb-3">
							<div class="form-group">
								<label class="form-label">Form title</label>
								<input name="page_title" class="form-control" id="invoice-name" type="text" value="<?php echo get_option('page_title') ?>">
							</div>
						</div>
						<div class="col-md-12 mb-3">
							<div class="form-group">
								<label class="form-label">Form Max width in pixels (responsive)</label>
								<input type="range" name="form_width" class="form-range" min="500" max="1200" id="form_width" value="<?php echo get_option('form_width') ?>">
								<strong>Max width: </strong><span class="form_width_text"><?php echo (get_option('form_width') == null) ? "move range" : get_option('form_width')."px" ; ?></span>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 mb-3">
							<div class="form-group">
								<label class="form-label">Download PDF text</label>
								<input name="download_pdf_text" class="form-control" id="download_pdf_text" type="text" value="<?php echo get_option('download_pdf_text') ?>">
							</div>
						</div>
						<div class="col-md-12 mb-3">
							<div class="form-group">
								<label class="form-label">Use classic editor</label>
								<select name="magmi_classic" id="magmi_classic" class="form-control">
									<option value="yes" <?php echo (get_option('magmi_classic') == "yes") ? "selected" : "" ; ?>>Yes (Default)</option>
									<option value="no" <?php echo (get_option('magmi_classic') == "no") ? "selected" : "" ; ?>>No</option>
								</select>
								<small><strong class="text-danger">Note*</strong>: This will only apply in page not post types</small>
							</div>
						</div>
					</div>
					<?php submit_button(); ?>
        			</form>
					
					<h3>Donate to us</h3>
					<p>
						We keep on improving our services for freelancers to get paid quickly by their clients. Our current project progress is adding dashboard to every user in our main platform <a href="https://www.make-invoice.com/" target="_blank">www.make-invoice.com</a>.
					</p>
					
					<form action="https://www.paypal.com/donate" method="post" target="_top">
					<input type="hidden" name="hosted_button_id" value="XZ6BL374UK4F4" />
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
					<img alt="" border="0" src="https://www.paypal.com/en_PH/i/scr/pixel.gif" width="1" height="1" />
					</form>
					
					<p>
						Just so you know this plugin uses <code>cookies</code> to store data and to modify the content of the invoice templates for more better user experience.
					</p>
				</div>
				
				<div class="col-md-10 p-3 bg-light">
					<div class="row" style="pointer-events:none;opacity:0.8;">
						<div class="offset-md-1 col-md-10">
							<div class="invoice-width-option" style="margin:0 auto;">
							<?php require("frontend.php"); ?>
							</div>
						</div>
					</div>
				</div>
			</div>
            
    </div>