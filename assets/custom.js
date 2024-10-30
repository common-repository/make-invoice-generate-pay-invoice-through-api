jQuery(document).ready(function($){
	var protocol = location.protocol;
	var host = protocol + "//" + window.location.host;
	var lastSegment = window.location.href.split("/").pop();
	var url = window.location.href;
	var uri = host;		
    $("#download-PDF").click(function(){
        //$('#SavePDFDone').modal('toggle');
		
		// Process PDF through API
		
		$('#make-invoice').waitMe({
					text: "Generating your Invoice PDF...",
					effect : 'bounce',
					bg : 'rgba(255,255,255,0.9)',
					fontSize: "18px"
				});
		
		var totalitems = $("#tab_logic tbody tr").length;
			var items = [];

			for (var i = 1; i <= totalitems; i++) {
				items.push({
					date: $("#tab_logic tbody tr:nth-child("+i+") td input[name='date[]']").val(),
					task: $("#tab_logic tbody tr:nth-child("+i+") td [name='product[]']").val(),
					hours: $("#tab_logic tbody tr:nth-child("+i+") td input[name='qty[]']").val(),
					rate: $("#tab_logic tbody tr:nth-child("+i+") td input[name='price[]']").val(),
					total: $("#tab_logic tbody tr:nth-child("+i+") td span.total").text(),
				});
			}

			var required = [];
			if(getCookie('invoiceNo') == null || getCookie('BilledTo') == null || getCookie('PaymentMethod') == null || getCookie('ShipTo') == null || getCookie('BillDate') == null || (items.length == 2 && (items[1].date == "" || items[1].task == "" || items[1].rate == ""))) {
				if(getCookie('invoiceNo') == null) {
					required.push("Invoice Number");
				}

				if(getCookie('BilledTo') == null) {
					required.push("Bill To");
				}

				if(getCookie('PaymentMethod') == null) {
					required.push("Payment Method");
				}

				if(getCookie('EmailAdd') == null) {
					required.push("Email Address");
				}

				if(getCookie('ShipTo') == null) {
					required.push("Billing Address");
				}

				if(getCookie('BillDate') == null) {
					required.push("Bill Date");
				}

				if (items.length == 2 && (items[1].date == "" || items[1].task == "" || items[1].rate == "")) {
					required.push("at least 1 item")
				}

				var fields = required.join(", ");

				$('body').waitMe('hide');
				$.toast({
					heading: 'Missing required fields',
					text: 'You have missing '+fields,
					position: 'top-right',
					loaderBg:'#dc3545',
					icon: 'error',
					hideAfter: 3000, 
					stack: 6
				});

			}else {
				var missingFields = [];
				$.each(items,function(i,v){
					if(getCookie('template') == 'productseller') {
						if(v.task == "") {
							missingFields.push('Item');	
						}
						if(v.hours == 0 || v.hours == "") {
							missingFields.push('Quantity');	
						}
						if(v.rate == 0 || v.rate == "") {
							missingFields.push('Price');	
						}
					}else if(getCookie('template') == 'serviceprovider') {
						if(v.task == "") {
							missingFields.push('Service');	
						}
						if(v.rate == 0 || v.rate == "") {
							missingFields.push('Service Fee');	
						}
					}else {
						if(v.date == "") {
							missingFields.push('Date');	
						}
						if(v.task == "") {
							missingFields.push('Task');	
						}
						if(v.hours == 0 || v.hours == "") {
							missingFields.push('Hours');	
						}
						if(v.rate == 0 || v.rate == "") {
							missingFields.push('Rate/hr');	
						}
					}
				});

				if(missingFields.length > 0) {

					function onlyUnique(value, index, self) { 
						return self.indexOf(value) === index;
					}
					unique = missingFields.filter( onlyUnique ).join(", ");
					$('body').waitMe('hide');
					$.toast({
						heading: 'Please complete item list',
						text: 'You are still missing '+unique,
						position: 'top-right',
						loaderBg:'#dc3545',
						icon: 'error',
						hideAfter: 3000, 
						stack: 6
					});
				}else {
					var data = {
						invoiceNo: getCookie('invoiceNo'),
						BilledTo: getCookie('BilledTo').replace(/\r?\n/g, '<br />'),
						PaymentMethod: getCookie('PaymentMethod'),
						ShipTo: (getCookie('ShipTo') == null) ? "Not Available" : getCookie('ShipTo').replace(/\r?\n/g, '<br />'),
						BillDate: getCookie('BillDate'),
						BillDueDate: getCookie('BillDueDate'),
						Notes: (getCookie('Notes') == null) ? "Not Available" : getCookie('Notes').replace(/\r?\n/g, '<br />'),
						tax: getCookie('Tax'),
						Terms: (getCookie('Terms') == null) ? "Not Available" : getCookie('Terms').replace(/\r?\n/g, '<br />'),
						items: items,
						currency: getCookie('currency'),
						companylogo: getCookie('companylogo'),
						template: getCookie('template'),
						EmailAdd: getCookie('Email'),
						headercolor: getCookie('headercolor'),
						TypeGen: getCookie('TypeGen'),
					};

					console.log(data);
	
					$.post( MIGPA_Endpoint,data)
						.done(function( data ) {
							window.open(data, '_blank');
							$('#make-invoice').waitMe('hide');
							$.toast({
								heading: 'Invoice PDF Ready',
								text: "Your PDF is successfully generated and should start downloading.",
								position: 'top-right',
								loaderBg:'#ff6849',
								icon: 'success',
								hideAfter: 3000, 
								stack: 6
							});
							//$('#SavePDFDone').modal('show');
							//$('.updated-file').attr('href',data);

						});
				}
			}
			
});

	$(document).on('change', 'input[name="logo"]', function(){ 
		
		$('#make-invoice').waitMe({
			text: "Uploading your logo please wait...",
			effect : 'bounce',
			bg : 'rgba(255,255,255,0.9)',
			fontSize: "18px"
		});
		
		uploadFile(); 
	
	});

// Load all cookies

$(document).on('change', "#tab_logic input, #tab_logic textarea", function(){
		var totalitems = $("#tab_logic tbody tr").length;
		var items = [];

		for (var i = 0; i <= totalitems; i++) {
			items.push({
				date: $("#tab_logic tbody tr:nth-child("+i+") td input[name='date[]']").val(),
				task: $("#tab_logic tbody tr:nth-child("+i+") td [name='product[]']").val(),
				hours: $("#tab_logic tbody tr:nth-child("+i+") td input[name='qty[]']").val(),
				rate: $("#tab_logic tbody tr:nth-child("+i+") td input[name='price[]']").val(),
				total: $("#tab_logic tbody tr:nth-child("+i+") td span.total").text(),
			});
		}

		json_str = JSON.stringify(items);
		setCookie('items', json_str);
		
	});

function htmlDecode(input){
			var e = document.createElement('textarea');
			e.innerHTML = input;
			// handle case of empty input
			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
			}

		if($(".currency-selector").length) {
			$(".currency-selector").empty();
			$.getJSON(countryJSON, function(data) {
				$.each(data, function(i,v){

					var o1 = new Option(v.currency,'value');
					o1.setAttribute("data-symbol",htmlDecode(v.symbol));
					o1.setAttribute("data-val",v.currency);
					$(".currency-selector").append(o1)
				});


				if(getCookie('currencyWord') == null) {
					$('select.currency-selector option[data-val="United States Dollar"]').attr('selected','selected');
					setTimeout(function(){
						$('select.currency-selector').trigger('change');
					},200);

				}else {

					$('select.currency-selector option[data-val="'+getCookie('currencyWord')+'"]').attr('selected','selected');
					setTimeout(function(){
						$('select.currency-selector').trigger('change');
					},200);
					
				}
				});

		}

		if(getCookie('invoiceNo') == null) {}else {
			document.getElementById('invoiceNo').value = getCookie('invoiceNo');
		}

		if(getCookie('BilledTo') == null) {}else {
			document.getElementById('BilledTo').value = getCookie('BilledTo');
		}

		if(getCookie('PaymentMethod') == null) {}else {
			document.getElementById('PaymentMethod').value = getCookie('PaymentMethod');
		}

		if(getCookie('ShipTo') == null) {}else {
			document.getElementById('ShipTo').value = getCookie('ShipTo');
		}

		if(getCookie('EmailAdd') == null) {}else {
			document.getElementById('EmailAdd').value = getCookie('EmailAdd');
		}

		if(getCookie('BillDate') == null) {}else {
			document.getElementById('BillDate').value = getCookie('BillDate');
		}

		if(getCookie('BillDueDate') == null) {}else {
			document.getElementById('BillDueDate').value = getCookie('BillDueDate');
		}

		if(getCookie('Notes') == null) {}else {
			document.getElementById('Notes').value = getCookie('Notes');
		}

		if(getCookie('Tax') == null) {}else {
			document.getElementById('tax').value = getCookie('Tax');
		}

		if(getCookie('Terms') == null) {}else {
			document.getElementById('Terms').value = getCookie('Terms');
		}

if(getCookie('items') == null) {
			i = 1;
		}else {
			$("#tab_logic tbody").empty();
			$.each(JSON.parse(getCookie('items')), function(i,v){
				if(v.date == null || v.task == null || v.hours == null || v.rate == null || v.total == null){
					
				}else {

					$("#tab_logic tbody").append('<tr id="addr'+i+'"><td class="">'+i+'</td><td class="change-template-date-td"><label class="d-block d-sm-none">Date</label><input type="date" name="date[]" class="form-control invoice-list-date" value="'+v.date+'"></td><td><label class="change-template-description d-block d-sm-none">Description</label><textarea class="form-control" id="" name="product[]" maxlength="220" rows="1" oninput="auto_grow(this)" style="height: 36px;">'+v.task+'</textarea></td><td class="change-template-hour-td"><label class="change-template-hour d-block d-sm-none">Hours</label><input type="number" name="qty[]" class="form-control qty" step="0" min="0" value="'+v.hours+'" ></td><td><label class="change-template-price d-block d-sm-none">Rate/hr</label><div class="input-group mb-2 mb-sm-0"><div class="input-group-prepend"><span class="input-group-text currency-symbol">$</span></div><input type="number" name="price[]" class="form-control price" step="0.00" min="0" value="'+v.rate+'"></div></td><td><label class="d-block d-sm-none text-right">Total</label><span class="currency-symbol font-weight-bold">$</span>&nbsp;<span class="total font-weight-bold">'+v.total+'</span></td></tr>');
				}
				calc();
			});
			i=$("#tab_logic tbody tr").length+1;
		}

$("textarea").trigger($.Event('input', { keycode: 13 }));

		if(getCookie('template') == null) {}else {
			if(getCookie('template') == "productseller") {
				$(".change-template-date").hide();
				$(".change-template-date-td").hide();
				$(".change-template-description").text("Item");
				$(".change-template-hour").text("Quantity");
				$(".change-template-price").text("Price");
				$(".as-invoice").val("productseller");
			}else if(getCookie('template') == "serviceprovider") {
				$(".change-template-date").hide();
				$(".change-template-date-td").hide();
				$(".change-template-description").text("Service");
				$(".change-template-hour").hide();
				$(".change-template-hour-td").hide();
				$(".change-template-price").text("Service Fee");
				$(".as-invoice").val("serviceprovider");
			}else { // Freelancer default
				$(".change-template-date").show().text("Date");
				$(".change-template-description").text("Description");
				$(".change-template-hour").show().text("Hours");
				$(".change-template-price").text("Rate/hr");
			}	
			
			setTimeout(() => {
				$("select.as-invoice").trigger('change');	
			}, 1000);
			
		}
	
		if(getCookie('cookieaccept') == null) {
			$('#cookieModal').show();
		}
		$(".accept-cookies").click(function(){
			$('#cookieModal').fadeOut(500);
			setCookie('cookieaccept', "Yes");
		});

// Load all cookies END

// Add and delete row

var i = "";
	
	if(getCookie('items') == null) {
		i = 1;
	}else {
		$("#tab_logic tbody").empty();
		$.each(JSON.parse(getCookie('items')), function(i,v){
			if(v.date == null || v.task == null || v.hours == null || v.rate == null || v.total == null){}else {
				$("#tab_logic tbody").append('<tr id="addr'+i+'"><td class="">'+i+'</td><td class="change-template-date-td"><label class="d-block d-sm-none">Date</label><input type="date" name="date[]" class="form-control invoice-list-date" value="'+v.date+'"></td><td><label class="change-template-description d-block d-sm-none">Description</label><textarea class="form-control" id="" name="product[]" maxlength="220" rows="1" oninput="auto_grow(this)" style="height: 36px;">'+v.task+'</textarea></td><td class="change-template-hour-td"><label class="change-template-hour d-block d-sm-none">Hours</label><input type="number" name="qty[]" class="form-control qty" step="0" min="0" value="'+v.hours+'" ></td><td><label class="change-template-price d-block d-sm-none">Rate/hr</label><div class="input-group mb-2 mb-sm-0"><div class="input-group-prepend"><span class="input-group-text currency-symbol">$</span></div><input type="number" name="price[]" class="form-control price" step="0.00" min="0" value="'+v.rate+'"></div></td><td><label class="d-block d-sm-none text-right">Total</label><span class="currency-symbol font-weight-bold">$</span>&nbsp;<span class="total font-weight-bold">'+v.total+'</span></td></tr>');
			}
			calc();
		});
		i=$("#tab_logic tbody tr").length+1;
	}

var itemsCount = $("#tab_logic tbody tr").length;

if(itemsCount == 1) {
	$("#delete_row").hide();
}

$("#add_row").click(function(){b=i-1;
	$('#tab_logic').append('<tr id="addr'+(i)+'"></tr>');
	$('#addr'+i).html($('#addr'+b).html()).find('td:first-child').html(i);
	$('#addr'+i+' input:not([type=number])').val('');
	$('#addr'+i+' input[type=number]').val('');
	$('#addr'+i+' input[type=number].qty').val('1');
	$('#addr'+i+' .total').text('0');
	$(' #addr'+i+' textarea').val('');
	i++; 
	itemsCount++;
	if(itemsCount > 1) {
		$("#delete_row").show();
	}
});

$("#delete_row").click(function(){
	if(i>1){
	$("#addr"+(i-1)).remove();
	i--;
	}
	calc();
	itemsCount--;

	if(itemsCount == 1) {
		$(this).hide();
	}

	$("#tab_logic input, #tab_logic textarea").trigger('change');
});

$('#tab_logic tbody').on('keyup change',function(){
	calc();
});

$('#tax').on('keyup change',function(){
	calc_total();
});

$(document).on("change", ".currency-selector", updateSymbol);
$(document).on("change", ".currency-selector-footer", footerupdateSymbol);	

// Change Template Type

$("select#TypeGen").change(function(){
	var value = $(this).val();
	setCookie('TypeGen', value);
	

	var billdate = $(".bill-date-container");
	var grandtotal = $("table#tab_logic_total tr:last-child th:nth-child(1)");

	if(value == "invoice") {
		$('#make-invoice').waitMe({
			text: "Changing to Invoice...",
			effect : 'bounce',
			bg : 'rgba(255,255,255,0.9)',
			fontSize: "18px"
		});
		$(".invoice-title").text('Invoice');
		billdate.find(".col-md-6:nth-child(1) label").html("Bill Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Bill Due Date:&nbsp;");
		grandtotal.text("Grand Total");
	}else if(value == "estimate") {
		$('#make-invoice').waitMe({
			text: "Changing to Estimate...",
			effect : 'bounce',
			bg : 'rgba(255,255,255,0.9)',
			fontSize: "18px"
		});
		$(".invoice-title").text('Estimate');
		billdate.find(".col-md-6:nth-child(1) label").html("Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
		grandtotal.text("Quote Total");
	}else {
		$('#make-invoice').waitMe({
			text: "Changing to Quote...",
			effect : 'bounce',
			bg : 'rgba(255,255,255,0.9)',
			fontSize: "18px"
		});
		$(".invoice-title").text('Quote');
		billdate.find(".col-md-6:nth-child(1) label").html("Quote Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
		grandtotal.text("Balance Due");
	}
	
	billdate.find(".col-md-6 label").addClass("highlighted-temp");
	grandtotal.addClass("highlighted-temp");
	
	setTimeout(function(){
		$('#make-invoice').waitMe('hide');
		setTimeout(function(){
			$('.highlighted-temp').removeClass('highlighted-temp');
		},2000);
	},1000);
	

});

// Change you as what

$(document).on("change", ".as-invoice", function(){
	$('#make-invoice').waitMe({
		text: "Updating Template...",
		effect : 'bounce',
		bg : 'rgba(255,255,255,0.9)',
		fontSize: "18px"
	});

	var typeForm = "invoice";

	if(getCookie('TypeGen') == null) {
		setCookie('TypeGen','invoice');
	}else {
		typeForm = $("select#TypeGen").val(getCookie('TypeGen'));
	}

	var grandtotal = $("table#tab_logic_total tr:last-child th:nth-child(1)");
	var billto = $(".bill-to-container");
	var billaddress = $(".bill-address-container");
	var billdate = $(".bill-date-container");
	var notes = $(".notes-container");
	var terms = $(".terms-condition-container");
	var paymentmethod = $(".payment-method-container");
	var customeremail = $(".client-email-container");

	// Default
	$(".change-template-date").show().text("Date");
	$(".change-template-date-td").show();
	$(".change-template-description").text("Description");
	$(".change-template-hour").show().text("Hours");
	$(".change-template-hour-td").show();
	$(".change-template-price").text("Rate/hr");

	terms.find('label').text("Terms:");
	billdate.find(".col-md-6:last-child").show();
	billaddress.find("textarea").attr("placeholder","Billing Address:");
	billto.find("textarea").attr("placeholder","Bill To:");
	paymentmethod.find("input").attr("placeholder","Payment Method:");
	customeremail.find("input").attr("placeholder","Client Email");

	if(getCookie('TypeGen') == "quote") {
		$(".invoice-title").text('Quote');
		billdate.find(".col-md-6:nth-child(1) label").html("Quote Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
		grandtotal.text("Balance Due");
	}else if(getCookie('TypeGen') == "estimate") {
		$(".invoice-title").text('Estimate');
		billdate.find(".col-md-6:nth-child(1) label").html("Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
		grandtotal.text("Quote Total");
	}else {
		$(".invoice-title").text('Invoice');
		billdate.find(".col-md-6:nth-child(1) label").html("Bill Date:&nbsp;");
		billdate.find(".col-md-6:last-child label").html("Bill Due Date:&nbsp;");
		grandtotal.text("Grand Total");
	}

	billdate.find(".col-md-6 label").addClass('highlighted-temp');
	grandtotal.addClass("highlighted-temp");
	billto.find("textarea").addClass("highlighted-temp");
	billaddress.find("textarea").addClass("highlighted-temp");
	terms.find('label').addClass("highlighted-temp");
	customeremail.find("input").addClass("highlighted-temp");

	if($(this).val() == "productseller") {
		$(".change-template-date").hide();
		$(".change-template-date-td").hide();
		$(".change-template-description").text("Item");
		$(".change-template-hour").text("Quantity");
		$(".change-template-hour-td").show();
		$(".change-template-price").text("Price");

		// Change layout to product seller
		terms.find('label').text("Payment Terms:");
		billaddress.find("textarea").attr("placeholder","Ship To:");
		billto.find("textarea").attr("placeholder","Bill To:");
		customeremail.find("input").attr("placeholder","Customer Email");

		if(getCookie('TypeGen') == "quote") {
			$(".invoice-title").text('Quote');
			billdate.find(".col-md-6:nth-child(1) label").html("Quote Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
			grandtotal.text("Balance Due");
		}else if(getCookie('TypeGen') == "estimate") {
			$(".invoice-title").text('Estimate');
			billdate.find(".col-md-6:nth-child(1) label").html("Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
			grandtotal.text("Quote Total");
		}else {
			$(".invoice-title").text('Invoice');
			billdate.find(".col-md-6:nth-child(1) label").html("Bill Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Bill Due Date:&nbsp;");
			grandtotal.text("Grand Total");
		}
		
		billdate.find(".col-md-6 label").addClass('highlighted-temp');
		grandtotal.addClass("highlighted-temp");
		
		billto.find("textarea").addClass("highlighted-temp");
		billaddress.find("textarea").addClass("highlighted-temp");
		terms.find('label').addClass("highlighted-temp");
		customeremail.find("input").addClass("highlighted-temp");

	}else if($(this).val() == "serviceprovider") {
		$(".change-template-date").hide();
		$(".change-template-date-td").hide();
		$(".change-template-description").text("Service");
		$(".change-template-hour").hide();
		$(".change-template-hour-td").hide();
		$(".change-template-price").text("Service Fee");

		billaddress.find("label").text("Bill To:");
		paymentmethod.find("input").attr("placeholder", "Customer Reference ID");
		
		billdate.find(".col-md-6:last-child").hide();
		billdate.find(".col-md-6:first-child label").html("Date:&nbsp;");
		billto.find("textarea").attr("placeholder","From:");
		customeremail.find("input").attr("placeholder","Consumer Email");

		if(getCookie('TypeGen') == "quote") {
			$(".invoice-title").text('Quote');
			billdate.find(".col-md-6:nth-child(1) label").html("Quote Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
			grandtotal.text("Balance Due");
		}else if(getCookie('TypeGen') == "estimate") {
			$(".invoice-title").text('Estimate');
			billdate.find(".col-md-6:nth-child(1) label").html("Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Valid Until:&nbsp;");
			grandtotal.text("Quote Total");
		}else {
			$(".invoice-title").text('Invoice');
			billdate.find(".col-md-6:nth-child(1) label").html("Bill Date:&nbsp;");
			billdate.find(".col-md-6:last-child label").html("Bill Due Date:&nbsp;");
			grandtotal.text("Grand Total");
		}
		billdate.find(".col-md-6 label").addClass('highlighted-temp');
		grandtotal.addClass("highlighted-temp");
		
		billto.find("textarea").addClass("highlighted-temp");
		billaddress.find("textarea").addClass("highlighted-temp");
		terms.find('label').addClass("highlighted-temp");
		paymentmethod.find("input").addClass("highlighted-temp");
		customeremail.find("input").addClass("highlighted-temp");
	}

	setCookie("template", $(this).val());
	
	$("#tab_logic").addClass("highlighted-temp");

	setTimeout(function(){
		$('#make-invoice').waitMe('hide');
		setTimeout(function(){
			$('.highlighted-temp').removeClass('highlighted-temp');
		},2000);
	},500);
});
	
// Functionalities

function calc()
{
    $('#tab_logic tbody tr').each(function(i, element) {
        var html = $(this).html();
        if(html!='')
        {
            var qty = parseFloat($(this).find('.qty').val()).toFixed(2);
            var price = parseFloat($(this).find('.price').val()).toFixed(2);
            $(this).find('.total').text(parseFloat(qty*price).toFixed(2));
            
            calc_total();
        }
    });
}

function calc_total()
{
    total=0;
    $('.total').each(function() {
        total += parseFloat($(this).text());
    });
    $('#sub_total').val(total.toFixed(2));
    tax_sum=total/100*$('#tax').val();
    $('#tax_amount').val(tax_sum.toFixed(2));
    $('#total_amount').val((tax_sum+total).toFixed(2));
}
	
function updateSymbol(e){
	e.preventDefault();
	var selected = $(".currency-selector option:selected");
	$(".currency-symbol").text(selected.data("symbol"));
	setCookie('currency',selected.data("symbol"));
	setCookie('currencyWord',selected.data("val"));
}

	function footerupdateSymbol(e){
		e.preventDefault();
		var selected = $(".currency-selector-footer option:selected");
		$(".currency-symbol").text(selected.data("symbol"));
	}	

function uploadFile() {
	var logoData = new FormData();    
	logoData.append( 'logo', jQuery('#logoHeader').prop('files')[0] );
	logoData.append('action', 'logo_save');
	
	jQuery.ajax({
		url:ajaxurl,
		type:"POST",
		contentType: false,
		processData: false,
		data:  logoData,
		success : function( response ){
			setCookie('companylogo', response);
			
			$('#make-invoice').waitMe('hide');
		},
	});
	
}

});	// End of jQuery

function getCookie(cname) {
	var nameEQ = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
	}
	return null;
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function GetFormattedTime(date) {
	var d = new Date(date),
	hours = '' + d.getHours(),
	minute = '' + d.getMinutes();

	return [addZero(hours), minute, "00"].join(':');
}

function GetFormattedDate(date) {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2) 
		month = '0' + month;
	if (day.length < 2) 
		day = '0' + day;

	return [year, month, day].join('-');
}

function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (800*3600*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + encodeURIComponent((cvalue)) + ";" + expires + "; path=/";
}		

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}


