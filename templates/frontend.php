<?php header("Access-Control-Allow-Origin: *"); ?>
		<div style="max-width:<?php echo $a['width']; ?>px;width:100%;margin:0 auto;">
			<h2><?php echo $a['title']; ?></h2>
			<hr>
			<form id="make-invoice" class="text-start">
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<label class="form-label">Choose Type</label>
						<select class="form-control form-control-sm as-invoice" name="type">
							<option value="freelancer">Freelancer</option>
							<option value="productseller">Product Seller</option>
							<option value="serviceprovider">Service Provider</option>
						</select>
					</div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label class="form-label">Choose Template</label>
						<select class="form-control form-control-sm" name="TypeGen" id="TypeGen">
							<option value="invoice">Invoice</option>
							<option value="quote">Quote</option>
							<option value="estimate">Estimate</option>
						</select>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-2">
					<div class="mb-3">
						<label class="form-label">Header Color</label>
						<select class="form-control form-control-sm" name="header-color" id="header-color" onchange="setCookie('headercolor', this.value)">
							<option value="light">Light</option>
							<option value="dark">Dark</option>
						</select>
					 </div>
				</div>
				<div class="col-sm-5">
					<div class="mb-3">
					  <label class="form-label">Upload Logo</label>
					  <input class="form-control form-control-sm" type="file" name="logo" accept="image/*" id="logoHeader">
					</div>
				</div>
				<div class="col-md-5">
					<div class="mb-3">
						<label class="form-label invoice-title">Invoice</label>
						<input type="number" name="count" id="invoiceNo" class="form-control form-control-sm" placeholder="Invoice No." onchange="setCookie('invoiceNo', this.value)">
					 </div>
				</div>
			</div>

			<div class="row bill-date-container">
				<div class="col-md-6">
					<div class="mb-3">
						<label class="form-label">Bill Date</label>
						<input type="date" name="bill-date" id="BillDate" class="form-control form-control-sm" placeholder="Bill Date"  onchange="setCookie('BillDate', this.value)">
					 </div>
				</div>
				<div class="col-md-6">
					<div class="mb-3">
						<label class="form-label">Bill Due Date</label>
						<input type="date" name="due-date" id="BillDueDate" class="form-control form-control-sm" placeholder="Bill Due Date"  onchange="setCookie('BillDueDate', this.value)">
					 </div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6">
					<div class="mb-3">
						<input type="email" name="your-email" id="EmailAdd" class="form-control form-control-sm" placeholder="Your Email" oninput="setCookie('EmailAdd', this.value)">
					</div>
				</div>
				<div class="col-md-6 client-email-container">
					<div class="mb-3">
						<input type="text" name="company-email" class="form-control form-control-sm" placeholder="Client Email">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-6 bill-address-container">
					<div class="mb-3">
						<textarea class="form-control form-control-sm" id="ShipTo" name="your-address" rows="3" placeholder="Your Address" oninput="auto_grow(this)" onchange="setCookie('ShipTo', this.value)"></textarea>
					</div>
				</div>
				<div class="col-md-6 bill-to-container">
					<div class="mb-3">
						<textarea class="form-control form-control-sm" id="BilledTo" name="company-address" rows="3" placeholder="Client Address" oninput="auto_grow(this)" onchange="setCookie('BilledTo', this.value)"></textarea>
					</div>
				</div>
			</div>
			<hr>
			<!-- Start of items Template -->
			<div class="row">
				<div class="table-responsive">
					<table class="table table-bordered table-hover bg-light" id="tab_logic">
						<thead>
						<tr>
							<th class="text-center" style="min-width:47px;"> # </th>
							<th class="text-center change-template-date-td" style="max-width:180px;"> <span class="change-template-date">Date</span> </th>
							<th class="text-center" style="min-width:300px;"> <span class="change-template-description">Description</span> </th>
							<th class="text-right change-template-hour-td" style="min-width:75px;"> <span class="change-template-hour">Hours</span> </th>
							<th class="text-right" style="min-width:139px;"> <span class="change-template-price">Rate/hr</span> </th>
							<th class="text-right" style="min-width:150px;"> Total </th>
						</tr>
						</thead>
						<tbody>
						<tr id="addr0">
							<td>1</td>
							<td class="change-template-date-td">
							<label class="d-block d-sm-none">Date</label>
							<input type="date" name="date[]" class="form-control form-control-sm invoice-list-date" /></td>
							<td>
							<label class="change-template-description d-block d-sm-none">Description</label>
							<textarea class="form-control form-control-sm" id="" maxlength="220" name="product[]" rows="3" oninput="auto_grow(this)"></textarea>	
							</td>
							<td class="change-template-hour-td">
							<label class="change-template-hour d-block d-sm-none">Hours</label>
							<input type="number" name="qty[]" class="form-control form-control-sm qty" step="0" min="0" value="1" /></td>
							<td>
								<label class="change-template-price d-block d-sm-none">Rate/hr</label>
								<div class="input-group mb-2 mb-sm-0">
									<div class="input-group-prepend">
										<span class="input-group-text currency-symbol form-control-sm">$</span>
									</div>
									<input type="number" name="price[]" class="form-control form-control-sm price" step="0.00" min="0" />
								</div>
							</td>
							<td>
							<label class="d-block d-sm-none text-right">Total</label>
							<span class="currency-symbol font-weight-bold">$</span>
							&nbsp;<span class="total font-weight-bold">1</span>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
			<hr>
			<div class="row">
				<div class="col-md-6">
					<div class="mb-3 currency-container">
						<select class="form-control form-control-sm currency-selector" name="currency">
							<option>- Select currency -</option>
							<option data-symbol="CHF" data-val="CHF">CHF</option>
							<option data-symbol="kr" data-val="DKK">DKK</option>
							<option data-symbol="€" data-val="EUR">EUR</option>
							<option data-symbol="£" data-val="GBP">GBP</option>
							<option data-symbol="kn" data-val="HRK">HRK</option>
							<option data-symbol="ft" data-val="HUF">HUF</option>
							<option data-symbol="kr" data-val="NOK">NOK</option>
							<option data-symbol="lei" data-val="RON">RON </option>
							<option data-symbol="kr" data-val="SEK">SEK</option>
							<option data-symbol="Ksh" data-val="KES">KES</option>
							<option data-symbol="R" data-val="ZAR">ZAR</option>
							<option data-symbol="R$" data-val="BRL">BRL</option>
							<option data-symbol="$" data-val="CAD">CAD</option>
							<option data-symbol="$" data-val="CLP">CLP</option>
							<option data-symbol="$" data-val="COP">COP</option>
							<option data-symbol="$" data-val="MXN">MXN</option>
							<option data-symbol="S/" data-val="PEN">PEN</option>
							<option data-symbol="$" data-val="USD">USD</option>
							<option data-symbol="$" data-val="AUD">AUD</option>
							<option data-symbol="¥" data-val="CNY">CNY</option>
							<option data-symbol="Rp" data-val="IDR">IDR</option>
							<option data-symbol="¥" data-val="JPY">JPY</option>
							<option data-symbol="RM" data-val="MYR">MYR</option>
							<option data-symbol="$" data-val="NZD">NZD</option>
							<option data-symbol="Rs" data-val="PKR">PKR</option>
							<option data-symbol="$" data-val="SGD">SGD</option>
							<option data-symbol="Rs" data-val="LKR">LKR</option>
						</select>
					</div>
				</div>
				<div class="col-md-6 payment-method-container">
					<div class="mb-3">
						<input type="text" name="payment-method" id="PaymentMethod" class="form-control form-control-sm" placeholder="Payment Method" oninput="setCookie('PaymentMethod', this.value)">

					</div>
				</div>
			</div>	

			<div class="row clearfix">
				<div class="col-md-12 mt-3 text-left">
					<a id="add_row" class="btn btn-sm btn-info bg-dark border-0 text-light">+ Add New</a>
					<a id="delete_row" class="border btn-sm btn">Delete last item</a>
				</div>
			</div>
			<!-- Start of items Template -->
			<hr>
			<div class="row">
				<div class="col-md-6 notes-container">
					<div class="mb-3">
					  <label class="form-label">Notes</label>
					  <textarea class="form-control form-control-sm" id="Notes" name="notes" rows="3" placeholder="(Optional)" oninput="auto_grow(this)" onchange="setCookie('Notes', this.value)"></textarea>
					</div>
				</div>
				<div class="col-md-6 terms-condition-container">
					<div class="mb-3">
					  <label class="form-label">Terms</label>
					  <textarea class="form-control form-control-sm" id="Terms" name="terms" rows="3" placeholder="(Optional)" oninput="auto_grow(this)" onchange="setCookie('Terms', this.value)"></textarea>
					</div>	
				</div>
			</div>

			<hr>
			<div class="row mb-3 bg-light p-2">
				<div class="col-md-12">
					<table class="table table-hover " id="tab_logic_total">
						<tbody>
						<tr>
							<th class="text-right">Sub Total</th>
							<td class="text-center">
								<div class="input-group mb-2 mb-sm-0">	
									<div class="input-group-prepend">
										<span class="input-group-text currency-symbol form-control-sm">$</span>
									</div>
									<input type="number" name='sub_total' placeholder='0.00' class="form-control form-control-sm" id="sub_total" readonly/>
								</div>
							</td>
						</tr>
						<tr>
							<th class="text-right">Tax</th>
							<td class="text-center"><div class="input-group mb-2 mb-sm-0">
								<div class="input-group-prepend">
									<span class="input-group-text form-control-sm">%</span>
								</div>
								<input type="number" class="form-control form-control-sm" id="tax" placeholder="0" onchange="setCookie('Tax', this.value)">

							</div></td>
						</tr>
						<tr>
							<th class="text-right">Tax Amount</th>
							<td class="text-center">
								<div class="input-group mb-2 mb-sm-0">	
									<div class="input-group-prepend">
										<span class="input-group-text currency-symbol form-control-sm">$</span>
									</div>
									<input type="number" name='tax_amount' id="tax_amount" placeholder='0.00' class="form-control form-control-sm" readonly/>
								</div>
							</td>
						</tr>
						<tr>
							<th class="text-right">Grand Total</th>
							<td class="text-center">
								<div class="input-group mb-2 mb-sm-0">	
									<div class="input-group-prepend">
										<span class="input-group-text currency-symbol form-control-sm">$</span>
									</div>
									<input type="number" name='total_amount' id="total_amount" placeholder='0.00' class="form-control form-control-sm" readonly/>
								</div>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>

		  <a id="download-PDF" class="btn btn-dark"><?php echo ($a['title'] == null ) ? "Download PDF" : $a['button'] ; ?></a>
		</form>
		<div id="cookieModal">
		  <div class="notice justify-content-between align-items-center">
			<div class="navbar-brand m-auto">
			  <div class="cookie-text text-light">
				<small>This website is currently using cookies to store data and to modify the content of the invoice templates for more better user experience.</small>
			  </div>
			</div>
			  <div class="navbar-brand d-block">
				<div class="buttons d-flex flex-column flex-lg-row">
				  <a href="javascript:void(0);" title="Accept Cookies for Make Invoice" class="btn btn-success accept-cookies mt-3 mx-auto" data-dismiss="modal">Accept</a>
				</div>
			</div>
		  </div>
		</div>	
	</div>