jQuery(document).ready(function($){
    $("#invoice-name").on("input", function(){
        var title = $(this).val();
        
        $(".invoice-width-option h2").text(title);
    });
    
    $("#download_pdf_text").on("input", function(){
        var button = $(this).val();
        
        $("#download-PDF").text(button);
    });
    
    $("#form_width").on("input", function(){
        var width = $(this).val();
        $(".form_width_text").text(width);
        $("#make-invoice").css("max-width", width+ "px");
        $("#make-invoice").css("width", "100%");
        $("#make-invoice").css("margin", "0 auto");
    });
    
    setTimeout(function(){
        $("#invoice-name").trigger("input");
        $("#download_pdf_text").trigger("input");
        $("#form_width").trigger("input");
    },1000);
    
});